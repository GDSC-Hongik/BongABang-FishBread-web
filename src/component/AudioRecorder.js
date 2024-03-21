import React, { useEffect, useState } from 'react';

const AudioRecorder = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  let timer;
  let lastAudioDetectedTime;

  useEffect(() => {
    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        }); // 사용자의 마이크 액세스 요청
        const audioCtx = new AudioContext(); // 오디오 컨텍스트 생성. 오디오를 처리하고 조작하는 데 사용
        setAudioContext(audioCtx);

        audioCtx.audioWorklet.addModule('audioProcessor.js').then(() => {
          // 파일을 오디오 워크렛으로 추가
          const workletNode = new AudioWorkletNode(audioCtx, 'audio-processor'); // 노드가 오디어 데이터를 실시간으로 처리
          const source = audioCtx.createMediaStreamSource(stream); // 오디오 스트림을 소스로 사용하여 컨텍스트에 연결할 오디오 소스 생성
          source.connect(workletNode); // 오디오 소스를 오디오 프로세서 노드에 연결
          workletNode.connect(audioCtx.destination); // 오디오 프로세서를 오디오 컨텍스트의 대상에 연결. 오디오 처리 결과가 스피커로 출력
        });
      } catch (error) {
        if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
          // 사용자가 액세스를 거부하거나 취소한 경우 처리할 로직
          console.error('User denied microphone access');
          alert('Please allow access to microphone to record audio.');
        } else {
          console.error('Error accessing microphone:', error);
        }
      }
    };

    startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};

export default AudioRecorder;
