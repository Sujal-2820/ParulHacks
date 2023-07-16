from flask import Flask, request,jsonify 
from flask_cors import CORS, cross_origin
import numpy as np
import moviepy.editor as mp
from google.cloud import speech_v1p1beta1 as speech
import nltk
from textblob import TextBlob
import speech_recognition as sr
from langdetect import detect
import cv2
import os
from fer import FER
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import time
from scipy.io import wavfile
from twilio.rest import Client

nltk.download('vader_lexicon')
app = Flask(__name__)
CORS(app, support_credentials=True)

angry=0
disgust=0
fear=0
happy=0
sad=0
surprise=0 
neutral=0

def extract_frames(video_name):	
    # Read the video from specified path
    cam = cv2.VideoCapture(video_name)

    try:
        
        # creating a folder named data
        if not os.path.exists('data'):
            os.makedirs('data')

    # if not created then raise error
    except OSError:
        print ('Error: Creating directory of data')

    # frame rate
    frame_rate = 2

    # calculate interval between frames
    interval = int(cam.get(cv2.CAP_PROP_FPS) / frame_rate)
    # frame
    currentframe = 0

    while(True):
        
        # reading from frame
        ret,frame = cam.read()

        if ret:
            if currentframe % interval == 0:
                # if video is still left continue creating images
                name = './data/frame' + str(int(currentframe/14)) + '.jpg'
                print ('Creating...' + name)

                # writing the extracted images
                cv2.imwrite(name, frame)

            # increasing counter so that it will
            # show how many frames are created
            currentframe += 1
        else:
            break

    # Release all space and windows once done
    cam.release()
    cv2.destroyAllWindows()
    return int(currentframe/14 - 1)

def detect_emotion(frame_path): #frame_path is a string of the path to the image
    global angry, disgust, fear, happy, sad, surprise, neutral
    # Input Image
    try:
        input_image = cv2.imread(frame_path)
        emotion_detector = FER()
        # Output image's information
        angry = angry + emotion_detector.detect_emotions(input_image)[0]["emotions"]["angry"]
        disgust = disgust + emotion_detector.detect_emotions(input_image)[0]["emotions"]["disgust"]
        fear = fear + emotion_detector.detect_emotions(input_image)[0]["emotions"]["fear"]
        happy = happy + emotion_detector.detect_emotions(input_image)[0]["emotions"]["happy"]
        sad = sad + emotion_detector.detect_emotions(input_image)[0]["emotions"]["sad"]
        surprise = surprise + emotion_detector.detect_emotions(input_image)[0]["emotions"]["surprise"]
        neutral = neutral + emotion_detector.detect_emotions(input_image)[0]["emotions"]["neutral"]
        print(emotion_detector.detect_emotions(input_image)[0]["emotions"])    
    except:
        print ('Error..Analysing next frame')

@app.route('/upload', methods=['POST'])
def upload():
    video = request.files['file']
    video.save(video.filename)  
    
    filename = video.filename
    vid = mp.VideoFileClip(filename)
    audio = vid.audio
    audio_file_name_without_ext = filename.split('.mp4')[0]
    audio_file_name = "{}.wav".format(audio_file_name_without_ext)
    audio.write_audiofile(audio_file_name)
    print(audio_file_name)
    
    recognizer = sr.Recognizer()
    audioFile = sr.AudioFile(audio_file_name)
    with audioFile as source:
        data = recognizer.record(source)
    text = recognizer.recognize_google(data, key=None)
    print(text)
    
    from nltk.sentiment import SentimentIntensityAnalyzer
    analyzer = SentimentIntensityAnalyzer()
    sentiment_scores = analyzer.polarity_scores(text)
    print("Sentiment score is : ")
    print(sentiment_scores)
    sentiment = ""
    if sentiment_scores["compound"] >= 0.05:
        sentiment = "Positive"
    elif sentiment_scores["compound"] <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    print("Sentiment: ", sentiment)

    # Perform language detection and English fluency analysis
    language = detect(text)
    if language == "en":
        blob = TextBlob(text)
        fluency = blob.correct().string
        print("Fluency: ", fluency)
    else:
        print("Language is not English.")
    
    number_of_frames = extract_frames(filename)

    video_data = []
    for i in range(number_of_frames):
        frame_path = "./data/frame" + str(i) + ".jpg"
        detect_emotion(frame_path)


    print("Emotions print karo")
    emotions = [angry, disgust, fear, happy, sad, surprise, neutral]
    emo = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]
    max_emotion = emotions.index(max(emotions))
    print(max_emotion)

    final_data = { "audio" : sentiment_scores, "video" : emotions, "text" : text,"description":description }

    # account_sid = 'ACa1813c9d3eb6caa63492cebdb88100fa'
    # auth_token = '4dbc15e40cacf4518cc576a6340971ac'
    # client = Client(account_sid, auth_token)
    # message_body = "Hello from Analyzer! We have analyzed your video and found that you are " + emo[max_emotion] + "." 
    # message = client.messages \
    #             .create(
    #                  body=message_body,
    #                  from_='+15077283153',  # replace with your Twilio phone number
    #                  to='+919301658552'  # replace with your recipient's phone number
                #  )
    
    # # Process the video as needed
    return jsonify(final_data)

if __name__ == '__main__':
    app.run(debug=True)