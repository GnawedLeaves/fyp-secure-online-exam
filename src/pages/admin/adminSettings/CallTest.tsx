import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  StreamTheme,
  User,
} from "@stream-io/video-react-sdk";
import React from "react";
import {
  ParticipantView,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj"; // the API key can be found in the "Credentials" section
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGFkbV9fQW1pZGFsYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvUGFkbV9fQW1pZGFsYSIsImlhdCI6MTcwOTg4MTM2NiwiZXhwIjoxNzEwNDg2MTcxfQ.nsrX2Cynh1yc5ooJu0xIkohUMaqPBEYJnU0gX1VIaAk"; // the token can be found in the "Credentials" section
const userId = "Padm__Amidala"; // the user id can be found in the "Credentials" section
const callId = "d0uLFdkdCDoJ"; // the call id can be found in the "Credentials" section

// set up the user object
const user: User = {
  id: userId,
  name: "Marcel",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const MyUILayout = () => {
  const call = useCall();
  const {
    useCallCallingState,
    useParticipantCount,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StreamTheme>
        <MyParticipantList participants={remoteParticipants} />
        <MyFloatingLocalParticipant participant={localParticipant} />
      </StreamTheme>
    </div>
  );
};
export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};
const TestCallPage = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export default TestCallPage;
