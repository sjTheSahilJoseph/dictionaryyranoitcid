import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDictionary = async (word) => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const result = await res.json();
      setWordData(result[0]);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // You can add some initial word to fetch on component mount if needed.
    // For example, fetchDictionary("initialWord");
  }, []);

  return (
    <div className="flex min-h-full justify-center px-6 py-12 lg:px-8 flex-wrap">
      <div className="w-full sm:w-1/2 sm:pr-4 sm:max-w-sm">
        <h2 className="my-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Write your Word
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (word) {
              fetchDictionary(word);
            }
          }}
        >
          <div>
            <label
              htmlFor="word"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Word
            </label>
            <div className="mt-2">
              <input
                id="word"
                name="word"
                type="text"
                onChange={(e) => {
                  setWord(e.target.value);
                }}
                value={word}
                autoComplete="text"
                placeholder="Enter your Word..."
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading || !word}
            >
              {isLoading ? "Loading..." : "Let's Find Out"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full sm:w-1/2 sm:pl-4 sm:max-w-sm">
        {wordData && (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <h2 className="my-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {wordData.word}
                </h2>
                <div className="mt-5">
                  {wordData.phonetics.map((phonetic, index) => (
                    <div key={index}>
                      <p className="text-gray-700">{phonetic.text}</p>
                      {phonetic.audio && (
                        <audio controls>
                          <source src={phonetic.audio} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  ))}
                </div>

                {wordData.meanings.map((meaning, index) => (
                  <div key={index} className="mt-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {meaning.definitions.map((definition, defIndex) => (
                        <li key={defIndex}>{definition.definition}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {wordData.origin && (
                  <div className="mt-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Origin
                    </h3>
                    <p className="text-gray-700">{wordData.origin}</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
