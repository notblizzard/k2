"use client";
import { useState } from "react";
import copy from "copy-to-clipboard";
import validator from "validator";
import { toast } from "react-toastify";
import { BsFillClipboardFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Home() {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const url = process.env.NEXT_PUBLIC_API_URL;

  const submit = () => {
    fetch(`${url}/api/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: text }),
    })
      .then((res) => res.json())
      .then((data) => setLink(data.link));
  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-24  w-full">
      <p className="font-bold text-9xl from-violet-400  to-sky-400 text-transparent bg-gradient-to-r bg-clip-text">
        k2
      </p>
      <p className="font-bold text-2xl m-4  from-violet-400  to-sky-400 text-transparent bg-gradient-to-r bg-clip-text">
        A simple url shortener
      </p>
      <input
        value={text}
        name="url"
        id="url"
        onChange={(e) => setText(e.target.value)}
        className="from-violet-400 to-sky-400 bg-gradient-to-r border-2 border-violet-200 rounded-xl outline-none focus:outline-none  ring-0 focus:ring-0 text-4xl w-full p-4 text-black"
      />
      {validator.isURL(text) ? (
        <button
          type="submit"
          className="from-violet-400 to-sky-400 bg-gradient-to-r text-black p-4 rounded-xl border-2 border-violet-200 m-4"
          onClick={() => submit()}
        >
          Submit
        </button>
      ) : (
        <button
          disabled
          className="from-violet-400/50 to-sky-400/50 bg-gradient-to-r text-black/50 p-4 rounded-xl border-2 border-violet-200 m-4"
          onClick={() => submit()}
        >
          Submit
        </button>
      )}
      {link && (
        <div className="flex flex-row  items-center from-violet-400 to-sky-400 bg-gradient-to-r px-24 py-4 rounded-xl">
          <span className="text-black">{`${url}/${link}`}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BsFillClipboardFill
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => {
                    copy(`${url}/${link}`);
                    toast("Link copied to clipboard!", {
                      position: "bottom-left",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Click to copy to clipboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </main>
  );
}
