// import Form2 from "./Form.jsx"
import { useState } from "react";
import Form from "./Form.jsx";

function App() {
  const [sentStatus, setSentStatus] = useState(false);

  return (
    <>
      <div className="px-5 box-border flex-1 flex flex-col items-center w-full">
        <h1 className="text-center font-bold text-4xl text-gradient-1 mt-5 box-border">
          Contact us{" "}
          <img
            src="../img/write.gif"
            alt=""
            className="inline w-[100px] h-[100px] z-[-1]"
          />
        </h1>
        {sentStatus ? (
          <div className="box-border">
            <img
              src="../img/Succes Sent.png"
              alt=""
              width={400}
            />
            <span>We have received your mail. we will reach out to you soon.</span>
          </div>
        ) : (
          <Form setSentStatus={setSentStatus} />
        )}
      </div>
    </>
  );
}

export default App;
