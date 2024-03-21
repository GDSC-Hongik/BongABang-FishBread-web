import React, { useState, useEffect, useRef } from "react";

function QueryComponent() {
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef(null); // Ref 생성

  useEffect(() => {
    startListening();
  }, []);
  let recording = false; // recording 변수 정의
  let lastAudioDetectedTime; // lastAudioDetectedTime 변수 정의

  async function startRecording(stream) {
    try {
      // 미디어 레코더 생성
      const recorder = new MediaRecorder(stream);
      const chunks = []; // 녹음된 오디오 데이터를 저장할 배열

      // 녹음 데이터가 준비되면 발생하는 이벤트 핸들러
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      // 녹음이 멈추면 발생하는 이벤트 핸들러
      recorder.onstop = async () => {
        try {
          // 녹음된 오디오 데이터를 하나의 Blob으로 합치기
          const blob = new Blob(chunks, { type: "audio/wav" });

          // FormData에 오디오 데이터 추가
          const formData = new FormData();
          formData.append("audio", blob);

          // 서버로 오디오 데이터 전송
          const response = await fetch("{URL}", {
            method: "POST",
            body: formData,
          });

          // 서버 응답 처리
          const data = await response.json();
          console.log("Transcripts:", data.transcripts);
          // 서버 응답에 따라 작업 수행
        } catch (error) {
          console.error("Error in mediaRecorder.onstop:", error);
        }
      };

      // 녹음 시작
      recorder.start();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }

  async function startListening() {
    try {
      // 마이크 접근 권한 요청 및 스트림 받기
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 스트림으로부터 음성 감지 및 녹음 시작
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);

      processor.onaudioprocess = function (event) {
        const inputData = event.inputBuffer.getChannelData(0);
        const bufferLength = inputData.length;
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(inputData[i]);
        }
        const average = sum / bufferLength;
        if (average > 0.01 && !recording) {
          // 음성이 감지되고 녹음 중이 아닌 경우에만 녹음 시작
          startRecording(stream);
        } else if (average <= 0.01 && recording) {
          // 음성이 감지되지 않고 녹음 중인 경우에 녹음 종료
          lastAudioDetectedTime = Date.now(); // 마지막으로 음성이 감지된 시간 기록
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  startListening(); // 페이지 로드 시 음성 감지 시작

  async function handleSubmit(event) {
    event.preventDefault();

    const dateTime = new Date();
    const time = dateTime.toLocaleTimeString();

    // 사용자의 입력을 즉시 표시
    setHistory((prevHistory) => [...prevHistory, { user: prompt, time }]);

    // 입력 필드 초기화
    setPrompt("");
    // Ref를 사용하여 입력 필드 초기화
    promptRef.current.value = "";

    // 서버로부터 응답 받기
    try {
      // Fetch 로직...
      console.log();
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  }

  return (
    <div className="container p-3">
      <h3>ChatGPT Clone</h3>
      <p>
        Press and hold the spacebar to record audio. Release the spacebar to
        stop recording.
      </p>

      <div className="chat-container" id="response">
        {history.map((entry, index) => (
          <div
            key={index}
            className={`chat-message ${
              entry.user ? "user-message" : "bot-message"
            }`}
          >
            {entry.user ? entry.user : entry.bot}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
          <div className="flex-grow-1 me-2">
            <label htmlFor="prompt" className="form-label">
              Prompt:
            </label>
            {/* Ref를 사용하여 입력 필드에 접근 */}
            <textarea
              className="form-control"
              id="prompt"
              name="prompt"
              rows="3"
              ref={promptRef} // Ref 할당
              onChange={(event) => setPrompt(event.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default QueryComponent;
