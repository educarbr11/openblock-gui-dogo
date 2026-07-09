import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import machineLearningIconURL from './machineLearning/machine-learning.svg';
import machineLearningInsetIconURL from './machineLearning/machine-learning-small.svg';
import handPoseDetectionIconURL from './handPoseDetection/hand-pose-detection.svg';
import handPoseDetectionInsetIconURL from './handPoseDetection/hand-pose-detection-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Machine Learning"
                description="Name for the Machine Learning extension"
                id="gui.extension.machineLearning.name"
            />
        ),
        extensionId: 'machineLearning',
        iconURL: machineLearningIconURL,
        insetIconURL: machineLearningInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Train image classes with your camera."
                description="Description for the Machine Learning extension"
                id="gui.extension.machineLearning.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Hand Pose Detection"
                description="Name for the Hand Pose Detection extension"
                id="gui.extension.handPoseDetection.name"
            />
        ),
        extensionId: 'handPoseDetection',
        iconURL: handPoseDetectionIconURL,
        insetIconURL: handPoseDetectionInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Detect hand poses and gestures with your camera."
                description="Description for the Hand Pose Detection extension"
                id="gui.extension.handPoseDetection.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    }
];
