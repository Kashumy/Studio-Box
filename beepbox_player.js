let selectedFile = null;
let audioContext = new(window.AudioContext || window.webkitAudioContext)();
var beepbox
function RUNBEEPBOX(){
try {
function writeBase64Int( number, number) {
    let result = "";
    for (let i = digits - 1; i >= 0; i--) {
        const digit = (value >> (6 * i)) & 63;
        result += base64IntToCharCode[digit];
    }
    return result;
}
function readBase64Int(str, index, digits) {
    var value = 0;
    for (var i = 0; i < digits; i++) {
        value = (value << 6) | base64CharCodeToInt[str.charCodeAt(index++)];
    }
    return {
        value: value,
        nextIndex: index
    };
}


    
    
    function readNBitsPerChar(source, charIndex, bitsPerChar, bitCount) {
  let value = 0;
  let bitsRead = 0;
  const baseCharCodeToInt = bitsPerChar === 6 ? base64CharCodeToInt : base128CharCodeToInt;
  while (bitsRead < bitCount) {
    const val = baseCharCodeToInt[source.charCodeAt(charIndex++)];
    value = (value << bitsPerChar) | val;
    bitsRead += bitsPerChar;
  }
 const extraBits = bitsRead - bitCount;
  if (extraBits > 0) {
    value = value >>> extraBits;
  }
  return { value, charIndex };
}
    

 beepbox = (function(exports) {
   'use strict';

    /*!
    Copyright (c) 2012-2022 John Nesky and contributing authors

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    var __awaiter = (exports && exports.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var _a$1;
    const TypePresets = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "pulse width", "picked string", "supersaw", "chip (custom)", "mod", "FM (6-op)"];
    
    const sampleLoadingState = new SampleLoadingState();
    
    
    const sampleLoadEvents = new SampleLoadEvents();
    function startLoadingSample(url, chipWaveIndex, presetSettings, rawLoopOptions, customSampleRate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sampleLoaderAudioContext = new AudioContext({ sampleRate: customSampleRate });
            let closedSampleLoaderAudioContext = false;
            const chipWave = Config.chipWaves[chipWaveIndex];
            const rawChipWave = Config.rawChipWaves[chipWaveIndex];
            const rawRawChipWave = Config.rawRawChipWaves[chipWaveIndex];
            if (OFFLINE) {
                if (url.slice(0, 5) === "file:") {
                    const dirname = yield getDirname();
                    const joined = yield pathJoin(dirname, url.slice(5));
                    url = joined;
                }
            }
            fetch(url).then((response) => {
                if (!response.ok) {
                    sampleLoadingState.statusTable[chipWaveIndex] = 2;
                    return Promise.reject(new Error("Couldn't load sample"));
                }
                return response.arrayBuffer();
            }).then((arrayBuffer) => {
                return sampleLoaderAudioContext.decodeAudioData(arrayBuffer);
            }).then((audioBuffer) => {
                const samples = centerWave(Array.from(audioBuffer.getChannelData(0)));
                const integratedSamples = performIntegral(samples);
                chipWave.samples = integratedSamples;
                rawChipWave.samples = samples;
                rawRawChipWave.samples = samples;
                if (rawLoopOptions["isUsingAdvancedLoopControls"]) {
                    presetSettings["chipWaveLoopStart"] = rawLoopOptions["chipWaveLoopStart"] != null ? rawLoopOptions["chipWaveLoopStart"] : 0;
                    presetSettings["chipWaveLoopEnd"] = rawLoopOptions["chipWaveLoopEnd"] != null ? rawLoopOptions["chipWaveLoopEnd"] : samples.length - 1;
                    presetSettings["chipWaveLoopMode"] = rawLoopOptions["chipWaveLoopMode"] != null ? rawLoopOptions["chipWaveLoopMode"] : 0;
                    presetSettings["chipWavePlayBackwards"] = rawLoopOptions["chipWavePlayBackwards"];
                    presetSettings["chipWaveStartOffset"] = rawLoopOptions["chipWaveStartOffset"] != null ? rawLoopOptions["chipWaveStartOffset"] : 0;
                }
                sampleLoadingState.samplesLoaded++;
                sampleLoadingState.statusTable[chipWaveIndex] = 1;
                sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(sampleLoadingState.totalSamples, sampleLoadingState.samplesLoaded));
                if (!closedSampleLoaderAudioContext) {
                    closedSampleLoaderAudioContext = true;
                    sampleLoaderAudioContext.close();
                }
            }).catch((error) => {
                sampleLoadingState.statusTable[chipWaveIndex] = 2;
                alert("Failed to load " + url + ":\n" + error);
                if (!closedSampleLoaderAudioContext) {
                    closedSampleLoaderAudioContext = true;
                    sampleLoaderAudioContext.close();
                }
            });
        });
    }
 function loadScript(url) {
 	if (location.href.startsWith("file:///")) {
 		url = "file:///android_asset/WebView/" + url
 	}
 	const result = new Promise((resolve, reject) => {
 		if (!Config.willReloadForCustomSamples) {
 			const script = document.createElement("script");
 			script.src = url;
 			document.head.appendChild(script);
 			script.addEventListener("load", (event) => {
 				resolve();
 			});
 		}
 	});
 	return result;
 }
     function loadBuiltInSamples(set) {
   const defaultIndex = 0;
   const defaultIntegratedSamples = Config.chipWaves[defaultIndex].samples;
   const defaultSamples = Config.rawRawChipWaves[defaultIndex].samples;
   if (set == 0) {
    const chipWaves = [
     { name: "paandorasbox kick", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "paandorasbox snare", expression: 3.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "paandorasbox piano1", expression: 3.0, isSampled: true, isPercussion: false, extraSampleDetune: 2 },
     { name: "paandorasbox WOW", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
     { name: "paandorasbox overdrive", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -2 },
     { name: "paandorasbox trumpet", expression: 3.0, isSampled: true, isPercussion: false, extraSampleDetune: 1.2 },
     { name: "paandorasbox saxophone", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -5 },
     { name: "paandorasbox orchestrahit", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 4.2 },
     { name: "paandorasbox detatched violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 4.2 },
     { name: "paandorasbox synth", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -0.8 },
     { name: "paandorasbox sonic3snare", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "paandorasbox come on", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
     { name: "paandorasbox choir", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -3 },
     { name: "paandorasbox overdriveguitar", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -6.2 },
     { name: "paandorasbox flute", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -6 },
     { name: "paandorasbox legato violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -28 },
     { name: "paandorasbox tremolo violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -33 },
     { name: "paandorasbox amen break", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -55 },
     { name: "paandorasbox pizzicato violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -11 },
     { name: "paandorasbox tim allen grunt", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -20 },
     { name: "paandorasbox tuba", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 44 },
     { name: "paandorasbox loopingcymbal", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -17 },
     { name: "paandorasbox standardkick", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -7 },
     { name: "paandorasbox standardsnare", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "paandorasbox closedhihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 5 },
     { name: "paandorasbox foothihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 4 },
     { name: "paandorasbox openhihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -31 },
     { name: "paandorasbox crashcymbal", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -43 },
     { name: "paandorasbox pianoC4", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -42.5 },
     { name: "paandorasbox liver pad", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -22.5 },
     { name: "paandorasbox marimba", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -15.5 },
     { name: "paandorasbox susdotwav", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -24.5 },
     { name: "paandorasbox wackyboxtts", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -17.5 },
     { name: "paandorasbox peppersteak_1", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -42.2 },
     { name: "paandorasbox peppersteak_2", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -47 },
     { name: "paandorasbox vinyl_noise", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -50 },
     { name: "paandorasbeta slap bass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -56 },
     { name: "paandorasbeta HD EB overdrive guitar", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -60 },
     { name: "paandorasbeta sunsoft bass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -18.5 },
     { name: "paandorasbeta masculine choir", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -50 },
     { name: "paandorasbeta feminine choir", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -60.5 },
     { name: "paandorasbeta tololoche", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -29.5 },
     { name: "paandorasbeta harp", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -54 },
     { name: "paandorasbeta pan flute", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -58 },
     { name: "paandorasbeta krumhorn", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -46 },
     { name: "paandorasbeta timpani", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -50 },
     { name: "paandorasbeta crowd hey", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -29 },
     { name: "paandorasbeta wario land 4 brass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -68 },
     { name: "paandorasbeta wario land 4 rock organ", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -63 },
     { name: "paandorasbeta wario land 4 DAOW", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -35 },
     { name: "paandorasbeta wario land 4 hour chime", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -47.5 },
     { name: "paandorasbeta wario land 4 tick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -12.5 },
     { name: "paandorasbeta kirby kick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
     { name: "paandorasbeta kirby snare", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
     { name: "paandorasbeta kirby bongo", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
     { name: "paandorasbeta kirby click", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
     { name: "paandorasbeta sonor kick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28.5 },
     { name: "paandorasbeta sonor snare", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28.5 },
     { name: "paandorasbeta sonor snare (left hand)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -22.5 },
     { name: "paandorasbeta sonor snare (right hand)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -22.5 },
     { name: "paandorasbeta sonor high tom", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -41.5 },
     { name: "paandorasbeta sonor low tom", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -41.5 },
     { name: "paandorasbeta sonor hihat (closed)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -17 },
     { name: "paandorasbeta sonor hihat (half opened)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -21 },
     { name: "paandorasbeta sonor hihat (open)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -54.5 },
     { name: "paandorasbeta sonor hihat (open tip)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -43.5 },
     { name: "paandorasbeta sonor hihat (pedal)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28 },
     { name: "paandorasbeta sonor crash", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -51 },
     { name: "paandorasbeta sonor crash (tip)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -50.5 },
     { name: "paandorasbeta sonor ride", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46 }
    ];
    sampleLoadingState.totalSamples += chipWaves.length;
    const startIndex = Config.rawRawChipWaves.length;
    for (const chipWave of chipWaves) {
     const chipWaveIndex = Config.rawRawChipWaves.length;
     const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
     Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
     Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
     Config.rawChipWaves[chipWaveIndex] = rawChipWave;
     Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
     Config.chipWaves[chipWaveIndex] = integratedChipWave;
     Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
     sampleLoadingState.statusTable[chipWaveIndex] = 0;
     sampleLoadingState.urlTable[chipWaveIndex] = "legacySamples";
    }

      const chipWaveSamples = [
       centerWave(kicksample),
       centerWave(snaresample),
       centerWave(pianosample),
       centerWave(WOWsample),
       centerWave(overdrivesample),
       centerWave(trumpetsample),
       centerWave(saxophonesample),
       centerWave(orchhitsample),
       centerWave(detatchedviolinsample),
       centerWave(synthsample),
       centerWave(sonic3snaresample),
       centerWave(comeonsample),
       centerWave(choirsample),
       centerWave(overdrivensample),
       centerWave(flutesample),
       centerWave(legatoviolinsample),
       centerWave(tremoloviolinsample),
       centerWave(amenbreaksample),
       centerWave(pizzicatoviolinsample),
       centerWave(timallengruntsample),
       centerWave(tubasample),
       centerWave(loopingcymbalsample),
       centerWave(kickdrumsample),
       centerWave(snaredrumsample),
       centerWave(closedhihatsample),
       centerWave(foothihatsample),
       centerWave(openhihatsample),
       centerWave(crashsample),
       centerWave(pianoC4sample),
       centerWave(liverpadsample),
       centerWave(marimbasample),
       centerWave(susdotwavsample),
       centerWave(wackyboxttssample),
       centerWave(peppersteak1),
       centerWave(peppersteak2),
       centerWave(vinyl),
       centerWave(slapbass),
       centerWave(hdeboverdrive),
       centerWave(sunsoftbass),
       centerWave(masculinechoir),
       centerWave(femininechoir),
       centerWave(southtololoche),
       centerWave(harp),
       centerWave(panflute),
       centerWave(krumhorn),
       centerWave(timpani),
       centerWave(crowdhey),
       centerWave(warioland4brass),
       centerWave(warioland4organ),
       centerWave(warioland4daow),
       centerWave(warioland4hourchime),
       centerWave(warioland4tick),
       centerWave(kirbykick),
       centerWave(kirbysnare),
       centerWave(kirbybongo),
       centerWave(kirbyclick),
       centerWave(funkkick),
       centerWave(funksnare),
       centerWave(funksnareleft),
       centerWave(funksnareright),
       centerWave(funktomhigh),
       centerWave(funktomlow),
       centerWave(funkhihatclosed),
       centerWave(funkhihathalfopen),
       centerWave(funkhihatopen),
       centerWave(funkhihatopentip),
       centerWave(funkhihatfoot),
       centerWave(funkcrash),
       centerWave(funkcrashtip),
       centerWave(funkride)
      ];
      let chipWaveIndexOffset = 0;
      for (const chipWaveSample of chipWaveSamples) {
       const chipWaveIndex = startIndex + chipWaveIndexOffset;
       Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
       sampleLoadingState.statusTable[chipWaveIndex] = 1;
       sampleLoadingState.samplesLoaded++;
       sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(sampleLoadingState.totalSamples, sampleLoadingState.samplesLoaded));
       chipWaveIndexOffset++;
      }
   }
   else if (set == 1) {
    const chipWaves = [
     { name: "chronoperc1final", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "synthkickfm", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "mcwoodclick1", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
     { name: "acoustic snare", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 }
    ];
    sampleLoadingState.totalSamples += chipWaves.length;
    const startIndex = Config.rawRawChipWaves.length;
    for (const chipWave of chipWaves) {
     const chipWaveIndex = Config.rawRawChipWaves.length;
     const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
     Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
     Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
     Config.rawChipWaves[chipWaveIndex] = rawChipWave;
     Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
     Config.chipWaves[chipWaveIndex] = integratedChipWave;
     Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
     sampleLoadingState.statusTable[chipWaveIndex] = 0;
     sampleLoadingState.urlTable[chipWaveIndex] = "nintariboxSamples";
    }
 
      const chipWaveSamples = [
       centerWave(chronoperc1finalsample),
       centerWave(synthkickfmsample),
       centerWave(woodclicksample),
       centerWave(acousticsnaresample)
      ];
      let chipWaveIndexOffset = 0;
      for (const chipWaveSample of chipWaveSamples) {
       const chipWaveIndex = startIndex + chipWaveIndexOffset;
       Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
       sampleLoadingState.statusTable[chipWaveIndex] = 1;
       sampleLoadingState.samplesLoaded++;
       sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(sampleLoadingState.totalSamples, sampleLoadingState.samplesLoaded));
       chipWaveIndexOffset++;
      }
   }
   else if (set == 2) {
    const chipWaves = [
     { name: "cat", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -3 },
     { name: "gameboy", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 7 },
     { name: "mario", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
     { name: "drum", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 4 },
     { name: "yoshi", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -16 },
     { name: "star", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -16 },
     { name: "fire flower", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -1 },
     { name: "dog", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -1 },
     { name: "oink", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 3 },
     { name: "swan", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 1 },
     { name: "face", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -12 }
    ];
    sampleLoadingState.totalSamples += chipWaves.length;
    const startIndex = Config.rawRawChipWaves.length;
    for (const chipWave of chipWaves) {
     const chipWaveIndex = Config.rawRawChipWaves.length;
     const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
     const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
     Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
     Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
     Config.rawChipWaves[chipWaveIndex] = rawChipWave;
     Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
     Config.chipWaves[chipWaveIndex] = integratedChipWave;
     Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
     sampleLoadingState.statusTable[chipWaveIndex] = 0;
     sampleLoadingState.urlTable[chipWaveIndex] = "marioPaintboxSamples";
    }
    
      const chipWaveSamples = [
       centerWave(catpaintboxsample),
       centerWave(gameboypaintboxsample),
       centerWave(mariopaintboxsample),
       centerWave(drumpaintboxsample),
       centerWave(yoshipaintboxsample),
       centerWave(starpaintboxsample),
       centerWave(fireflowerpaintboxsample),
       centerWave(dogpaintbox),
       centerWave(oinkpaintbox),
       centerWave(swanpaintboxsample),
       centerWave(facepaintboxsample)
      ];
      let chipWaveIndexOffset = 0;
      for (const chipWaveSample of chipWaveSamples) {
       const chipWaveIndex = startIndex + chipWaveIndexOffset;
       Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
       Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
       sampleLoadingState.statusTable[chipWaveIndex] = 1;
       sampleLoadingState.samplesLoaded++;
       sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(sampleLoadingState.totalSamples, sampleLoadingState.samplesLoaded));
       chipWaveIndexOffset++;
      }
     
   }
  else if (set == 3) {
 
 
 const chipWaves = [
  { name: "studio Realistic Piano", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Acoustic Hi-Hat", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Acoustic Snare", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Acoustic Kick Shot", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Octave Brass", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio House Drum Loop", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Drum Kit", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Break Core Sample", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Aguda Keys", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Jump Style Kick Drop", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio Chimer Keys", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio 808 Shot", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio SQ2D", expression: 2, isPercussion: false, rootKey: 60 },
  { name: "studio GrittyKick", expression: 2, isPercussion: true, rootKey: 60 },
 ];
 sampleLoadingState.totalSamples += chipWaves.length;
 const startIndex = Config.rawRawChipWaves.length;
 
 for (const chipWave of chipWaves) {
  const chipWaveIndex = Config.rawRawChipWaves.length;
  const rootKey = chipWave.rootKey !== undefined ? chipWave.rootKey : 60;
  const rawChipWave = {
   index: chipWaveIndex,
   name: chipWave.name,
   expression: chipWave.expression,
   isPercussion: chipWave.isPercussion,
   isCustomSampled: true,
   isCustomLoaded: true,
   sampleRate: 44100,
   rootKey: rootKey,
   samples: defaultSamples
  };
  
  const rawRawChipWave = {
   index: chipWaveIndex,
   name: chipWave.name,
   expression: chipWave.expression,
   isPercussion: chipWave.isPercussion,
   isCustomLoaded: true,
   sampleRate: 44100,
   isCustomSampled: true,
   rootKey: rootKey,
   samples: defaultSamples
  };
  
  const integratedChipWave = {
   index: chipWaveIndex,
   name: chipWave.name,
   expression: chipWave.expression,
   isPercussion: chipWave.isPercussion,
   isCustomLoaded: true,
   sampleRate: 44100,
   rootKey: rootKey,
   isCustomSampled: true,
   samples: defaultIntegratedSamples
  };
  
  Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
  Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
  Config.rawChipWaves[chipWaveIndex] = rawChipWave;
  Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
  Config.chipWaves[chipWaveIndex] = integratedChipWave;
  Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
  
  sampleLoadingState.statusTable[chipWaveIndex] = 0;
  sampleLoadingState.urlTable[chipWaveIndex] = "studioSamples";
 }
 
 
 const chipWaveSamples = [
  centerWave(RealisticPiano_mp3),
  centerWave(AcousticHihat_wav),
  centerWave(AcousticSnare1_wav),
  centerWave(AcousticKickShot_wav),
  centerWave(OctaveBrass_wav),
  centerWave(HouseDrumLoop_wav),
  centerWave(DrumKit_mp3),
  centerWave(BreakCore_mp3),
  centerWave(AgudaKey_wav),
  centerWave(JumpStyleKicks_wav),
  centerWave(ChimerKey_wav),
  centerWave(S808Shot_wav),
  centerWave(SQ2D_wav),
  centerWave(GrittyKick_wav),
 ];
 let chipWaveIndexOffset = 0;
 for (const chipWaveSample of chipWaveSamples) {
  const chipWaveIndex = startIndex + chipWaveIndexOffset;
  Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
  Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
  Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
  sampleLoadingState.statusTable[chipWaveIndex] = 1;
  sampleLoadingState.samplesLoaded++;
  sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(sampleLoadingState.totalSamples, sampleLoadingState.samplesLoaded));
  chipWaveIndexOffset++;
 }
}
   else {
    console.log("invalid set of built-in samples");
   }
   updateAllSamples()
  }

    function drawNoiseSpectrum(wave, waveLength, lowOctave, highOctave, lowPower, highPower, overallSlope) {
        const referenceOctave = 11;
        const referenceIndex = 1 << referenceOctave;
        const lowIndex = Math.pow(2, lowOctave) | 0;
        const highIndex = Math.min(waveLength >> 1, Math.pow(2, highOctave) | 0);
        const retroWave = getDrumWave(0, null, null);
        let combinedAmplitude = 0.0;
        for (let i = lowIndex; i < highIndex; i++) {
            let lerped = lowPower + (highPower - lowPower) * (Math.log2(i) - lowOctave) / (highOctave - lowOctave);
            let amplitude = Math.pow(2, (lerped - 1) * 7 + 1) * lerped;
            amplitude *= Math.pow(i / referenceIndex, overallSlope);
            combinedAmplitude += amplitude;
            amplitude *= retroWave[i];
            const radians = 0.61803398875 * i * i * Math.PI * 2.0;
            wave[i] = Math.cos(radians) * amplitude;
            wave[waveLength - i] = Math.sin(radians) * amplitude;
        }
        return combinedAmplitude;
    }
    function getArpeggioPitchIndex(pitchCount, useFastTwoNoteArp, arpeggio) {
        let arpeggioPattern = Config.arpeggioPatterns[pitchCount - 1];
        if (arpeggioPattern != null) {
            if (pitchCount == 2 && useFastTwoNoteArp == false) {
                arpeggioPattern = [0, 0, 1, 1];
            }
            return arpeggioPattern[arpeggio % arpeggioPattern.length];
        }
        else {
            return arpeggio % pitchCount;
        }
    }
    updateSampledWaves();
    function toNameMap(array) {
        const dictionary = {};
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            value.index = i;
            dictionary[value.name] = value;
        }
        const result = array;
        result.dictionary = dictionary;
        return result;
    }
    
    function effectsIncludeTransition(effects) {
        return (effects & (1 << 10)) != 0;
    }
    function effectsIncludeChord(effects) {
        return (effects & (1 << 11)) != 0;
    }
    function effectsIncludePitchShift(effects) {
        return (effects & (1 << 7)) != 0;
    }
    function effectsIncludeDetune(effects) {
        return (effects & (1 << 8)) != 0;
    }
    function effectsIncludeVibrato(effects) {
        return (effects & (1 << 9)) != 0;
    }
    function effectsIncludeNoteFilter(effects) {
        return (effects & (1 << 5)) != 0;
    }
    function effectsIncludeDistortion(effects) {
        return (effects & (1 << 3)) != 0;
    }
    function effectsIncludeBitcrusher(effects) {
        return (effects & (1 << 4)) != 0;
    }
    function effectsIncludePanning(effects) {
        return (effects & (1 << 2)) != 0;
    }
    function effectsIncludeChorus(effects) {
        return (effects & (1 << 1)) != 0;
    }
    function effectsIncludeEcho(effects) {
        return (effects & (1 << 6)) != 0;
    }
    function effectsIncludeReverb(effects) {
        return (effects & (1 << 0)) != 0;
    }
    function effectsIncludeRingModulation(effects) {
        return (effects & (1 << 13)) != 0;
    }
    function effectsIncludeGranular(effects) {
        return (effects & (1 << 14)) != 0;
    }
    function effectsIncludeOctaveShift(effects) { 
       	return (effects & (1 << 15)) != 0;
    }
    function effectsIncludePhaser(effects) { 
      	return (effects & (1 << 16)) != 0;
    }
    function effectsIncludeFunction(effects) {
        return (effects & (1 << 17)) != 0;
    } 
    function calculateRingModHertz(sliderHz, sliderHzOffset = 0) {
        if (sliderHz == 0)
            return 0;
        if (sliderHz > 0)
            sliderHz -= 1 / Config.ringModHzRange;
        if (sliderHz > 1 / Config.ringModHzRange)
            sliderHz += 1 / Config.ringModHzRange;
        return Math.floor(Config.ringModMinHz * Math.pow(Config.ringModMaxHz / Config.ringModMinHz, sliderHz));
    }
    function rawChipToIntegrated(raw) {
        const newArray = new Array(raw.length);
        const dictionary = {};
        for (let i = 0; i < newArray.length; i++) {
            newArray[i] = Object.assign([], raw[i]);
            const value = newArray[i];
            value.index = i;
            dictionary[value.name] = value;
        }
        for (let key in dictionary) {
            dictionary[key].samples = performIntegral(dictionary[key].samples);
        }
        const result = newArray;
        result.dictionary = dictionary;
        return result;
    }

    var __values$1 = (exports && exports.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = (exports && exports.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (exports && exports.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    function applyElementArgs(element, args) {
        var e_1, _a, e_2, _b, e_3, _c;
        try {
            for (var args_1 = __values$1(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                if (arg instanceof Node) {
                    element.appendChild(arg);
                }
                else if (typeof arg === "string") {
                    element.appendChild(document.createTextNode(arg));
                }
                else if (typeof arg === "function") {
                    applyElementArgs(element, [arg()]);
                }
                else if (Array.isArray(arg)) {
                    applyElementArgs(element, arg);
                }
                else if (arg && typeof Symbol !== "undefined" && typeof arg[Symbol.iterator] === "function") {
                    applyElementArgs(element, __spread(arg));
                }
                else if (arg && arg.constructor === Object && element instanceof Element) {
                    try {
                        for (var _d = (e_2 = void 0, __values$1(Object.keys(arg))), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var key = _e.value;
                            var value = arg[key];
                            if (key === "class") {
                                if (typeof value === "string") {
                                    element.setAttribute("class", value);
                                }
                                else if (Array.isArray(arg) || (value && typeof Symbol !== "undefined" && typeof value[Symbol.iterator] === "function")) {
                                    element.setAttribute("class", __spread(value).join(" "));
                                }
                                else {
                                    console.warn("Invalid " + key + " value \"" + value + "\" on " + element.tagName + " element.");
                                }
                            }
                            else if (key === "style") {
                                if (value && value.constructor === Object) {
                                    try {
                                        for (var _f = (e_3 = void 0, __values$1(Object.keys(value))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                            var styleKey = _g.value;
                                            if (styleKey in element.style) {
                                                element.style[styleKey] = value[styleKey];
                                            }
                                            else {
                                                element.style.setProperty(styleKey, value[styleKey]);
                                            }
                                        }
                                    }
                                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                    finally {
                                        try {
                                            if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                        }
                                        finally { if (e_3) throw e_3.error; }
                                    }
                                }
                                else {
                                    element.setAttribute(key, value);
                                }
                            }
                            else if (typeof (value) === "function") {
                                element[key] = value;
                            }
                            else if (typeof (value) === "boolean") {
                                if (value)
                                    element.setAttribute(key, "");
                                else
                                    element.removeAttribute(key);
                            }
                            else {
                                element.setAttribute(key, value);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else {
                    element.appendChild(document.createTextNode(arg));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return element;
    }
    var svgNS = "http://www.w3.org/2000/svg";
    function parseHTML() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return document.createRange().createContextualFragment(args.join());
    }
    function parseSVG() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var fragment = document.createDocumentFragment();
        var svgParser = new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\">" + args.join() + "</svg>", "image/svg+xml").documentElement;
        while (svgParser.firstChild !== null) {
            document.importNode(svgParser.firstChild, true);
            fragment.appendChild(svgParser.firstChild);
        }
        return fragment;
    }

    var __values = (exports && exports.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var e_1, _a, e_2, _b;
    var HTML = parseHTML;
    var SVG = parseSVG;
    var _loop_1 = function (name_1) {
        HTML[name_1] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return applyElementArgs(document.createElement(name_1), args);
        };
    };
    try {
        for (var _c = __values("a abbr address area article aside audio b base bdi bdo blockquote br button canvas caption cite code col colgroup datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" ")), _d = _c.next(); !_d.done; _d = _c.next()) {
            var name_1 = _d.value;
            _loop_1(name_1);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _loop_2 = function (name_2) {
        SVG[name_2] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return applyElementArgs(document.createElementNS(svgNS, name_2), args);
        };
        if (/-/.test(name_2)) {
            var snakeCaseName = name_2.replace(/-/g, "_");
            SVG[snakeCaseName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return applyElementArgs(document.createElementNS(svgNS, name_2), args);
            };
        }
    };
    try {
        for (var _e = __values("a altGlyph altGlyphDef altGlyphItem animate animateMotion animateTransform circle clipPath color-profile cursor defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg switch symbol text textPath title tref tspan use view vkern".split(" ")), _f = _e.next(); !_f.done; _f = _e.next()) {
            var name_2 = _f.value;
            _loop_2(name_2);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }

    
    ColorConfig.colorLookup = new Map();
    ColorConfig.usesColorFormula = false;
    ColorConfig.defaultTheme = "FruityBox Contrast";
     ColorConfig.themes = {
        "dark classic": ``,
        "dark competition": `
				:root {
					--hover-preview: #ddd;
					--playhead: #ddd;
					--primary-text: #ddd;
					--secondary-text: #8e695b;
					--text-selection: rgba(169,0,255,0.99);
					--box-selection-fill: rgba(221,221,221,0.2);
					--loop-accent: #bf15ba;
					--link-accent: #f888ff;
					--ui-widget-background: #443a3a;
					--pitch-background: #353333;
					--tonic: #884a44;
					--fifth-note: #415498;
					--noise4-secondary-channel: #6B3E8E;
			}
		`,
        "light classic": `
			:root {
				-webkit-text-stroke-width: 0.5px;
				--page-margin: #685d88;
				--editor-background: white;
				--hover-preview: black;
				--playhead: rgba(0,0,0,0.5);
				--primary-text: black;
				--secondary-text: #777;
				--inverted-text: white;
				--text-selection: rgba(200,170,255,0.99);
				--box-selection-fill: rgba(0,0,0,0.1);
				--loop-accent: #98f;
				--link-accent: #74f;
				--ui-widget-background: #ececec;
				--ui-widget-focus: #eee;
				--pitch-background: #ececec;
				--tonic: #f0d6b6;
				--fifth-note: #bbddf0;
				--white-piano-key: #eee;
				--black-piano-key: #666;
					--track-editor-bg-pitch: #ececec;
					--track-editor-bg-pitch-dim: #fdfdfd;
					--track-editor-bg-noise: #ececec;
					--track-editor-bg-noise-dim: #fdfdfd;
					--track-editor-bg-mod: #dbecfd;
					--track-editor-bg-mod-dim: #ecfdff;
					--multiplicative-mod-slider: #789;
					--overwriting-mod-slider: #987;
					--indicator-primary: #98f;
					--indicator-secondary: #cde;
					--select2-opt-group: #cecece;
					--input-box-outline: #ddd;
					--mute-button-normal: #c0b47f;
					--mute-button-mod: #bd7fc0;
				--pitch1-secondary-channel: #6CD9ED;
				--pitch1-primary-channel:   #00A0BD;
				--pitch1-secondary-note:    #34C2DC;
				--pitch1-primary-note:      #00758A;
				--pitch2-secondary-channel: #E3C941;
				--pitch2-primary-channel:   #B49700;
				--pitch2-secondary-note:    #D1B628;
				--pitch2-primary-note:      #836E00;
				--pitch3-secondary-channel: #FF9D61;
				--pitch3-primary-channel:   #E14E00;
				--pitch3-secondary-note:    #F67D3C;
				--pitch3-primary-note:      #B64000;
				--pitch4-secondary-channel: #4BE24B;
				--pitch4-primary-channel:   #00A800;
				--pitch4-secondary-note:    #2DC82D;
				--pitch4-primary-note:      #008000;
				--pitch5-secondary-channel: #FF90FF;
				--pitch5-primary-channel:   #E12EDF;
				--pitch5-secondary-note:    #EC6EEC;
				--pitch5-primary-note:      #A600A5;
				--pitch6-secondary-channel: #B5B5FE;
				--pitch6-primary-channel:   #6969FD;
				--pitch6-secondary-note:    #9393FE;
				--pitch6-primary-note:      #4A4AD7;
				--pitch7-secondary-channel: #C2D848;
				--pitch7-primary-channel:   #8EA800;
				--pitch7-secondary-note:    #B0C82D;
				--pitch7-primary-note:      #6C8000;
				--pitch8-secondary-channel: #FF90A4;
				--pitch8-primary-channel:   #E12E4D;
				--pitch8-secondary-note:    #EC6E85;
				--pitch8-primary-note:      #A6001D;
				--pitch9-secondary-channel: #41E3B5;
				--pitch9-primary-channel:   #00B481;
				--pitch9-secondary-note:    #28D1A1;
				--pitch9-primary-note:      #00835E;
				--pitch10-secondary-channel:#CA77FF;
				--pitch10-primary-channel:  #9609FF;
				--pitch10-secondary-note:   #B54FFF;
				--pitch10-primary-note:     #8400E3;
				--noise1-secondary-channel: #C1C1C1;
				--noise1-primary-channel:   #898989;
				--noise1-secondary-note:    #ADADAD;
				--noise1-primary-note:      #6C6C6C;
				--noise2-secondary-channel: #E8BB8C;
				--noise2-primary-channel:   #BD7D3A;
				--noise2-secondary-note:    #D1A374;
				--noise2-primary-note:      #836342;
				--noise3-secondary-channel: #9BC4EB;
				--noise3-primary-channel:   #4481BE;
				--noise3-secondary-note:    #7CA7D3;
				--noise3-primary-note:      #476685;
				--noise4-secondary-channel: #C5A5E0;
				--noise4-primary-channel:   #8553AE;
				--noise4-secondary-note:    #B290CC;
				--noise4-primary-note:      #684F7D;
				--noise5-secondary-channel: #B8CE93;
				--noise5-primary-channel:   #87A74F;
				--noise5-secondary-note:    #ABC183;
				--noise5-primary-note:      #68784C;
					--mod1-secondary-channel:   #339955;
					--mod1-primary-channel:     #77dd55;
					--mod1-primary-note:        #2ad84a;
					--mod2-primary-note:        #ba124a;
					--mod3-primary-note:        #7a1caa;
					--mod4-primary-note:        #a86810;
					--mod-label-primary:        #dddddd;
					--mod-label-secondary-text: #777;
					--disabled-note-primary:    #666;
					--disabled-note-secondary:  #aaa;
			}
			
			.beepboxEditor button, .beepboxEditor select {
				box-shadow: inset 0 0 0 1px var(--secondary-text);
			}

				.select2-selection__rendered {
					box-shadow: inset 0 0 0 1px var(--secondary-text);
				}

				.promptContainerBG::before {
					box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
				}	
		`,
        "jummbox classic": `
				:root {
					--page-margin: #040410;
					--editor-background: #040410;
					--playhead: rgba(255, 255, 255, 0.9);
					--secondary-text: #84859a;
					--box-selection-fill: #044b94;
					--ui-widget-background: #393e4f;
					--ui-widget-focus: #6d6886;
					--pitch-background: #393e4f;
					--tonic: #725491;
					--fifth-note: #54547a;
					--white-piano-key: #eee;
					--black-piano-key: #666;
					--use-color-formula: true;
					--track-editor-bg-pitch: #393e4f;
					--track-editor-bg-pitch-dim: #1c1d28;
					--track-editor-bg-noise: #3d3535;
					--track-editor-bg-noise-dim: #161313;
					--track-editor-bg-mod: #283560;
					--track-editor-bg-mod-dim: #0a101f;
					--multiplicative-mod-slider: #606c9f;
					--overwriting-mod-slider: #6850b5;
					--indicator-primary: #9c64f7;
					--indicator-secondary: #393e4f;
					--select2-opt-group: #5d576f;
					--input-box-outline: #222;
					--mute-button-normal: #dda85d;
					--mute-button-mod: #886eae;
					--mod-label-primary: #282840;
					--mod-label-secondary-text: rgb(87, 86, 120);
					--mod-label-primary-text: white;
					--pitch-secondary-channel-hue: 0;
					--pitch-secondary-channel-hue-scale: 6.5;
					--pitch-secondary-channel-sat: 83.3;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 40;
					--pitch-secondary-channel-lum-scale: 0.05;
					--pitch-primary-channel-hue: 0;
					--pitch-primary-channel-hue-scale: 6.5;
					--pitch-primary-channel-sat: 100;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 67.5;
					--pitch-primary-channel-lum-scale: 0.05;
					--pitch-secondary-note-hue: 0;
					--pitch-secondary-note-hue-scale: 6.5;
					--pitch-secondary-note-sat: 93.9;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 25;
					--pitch-secondary-note-lum-scale: 0.05;
					--pitch-primary-note-hue: 0;
					--pitch-primary-note-hue-scale: 6.5;
					--pitch-primary-note-sat: 100;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 85.6;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 0;
					--noise-secondary-channel-hue-scale: 2;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 42;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 0;
					--noise-primary-channel-hue-scale: 2;
					--noise-primary-channel-sat: 33;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 63.5;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 0;
					--noise-secondary-note-hue-scale: 2;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 55;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 0;
					--noise-primary-note-hue-scale: 2;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 74;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 192;
					--mod-secondary-channel-hue-scale: 1.5;
					--mod-secondary-channel-sat: 88;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 192;
					--mod-primary-channel-hue-scale: 1.5;
					--mod-primary-channel-sat: 96;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 192;
					--mod-secondary-note-hue-scale: 1.5;
					--mod-secondary-note-sat: 92;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 45;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 192;
					--mod-primary-note-hue-scale: 1.5;
					--mod-primary-note-sat: 96;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 85;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary:    #91879f;
					--disabled-note-secondary:  #6a677a;
				}
			`,
        "forest": `
				:root {
					--page-margin: #010c03;
					--editor-background: #010c03;
					--hover-preview: #efe;
					--playhead: rgba(232, 255, 232, 0.9);
					--primary-text: #efe;
					--secondary-text: #70A070;
					--inverted-text: #280228;
					--text-selection: rgba(255,68,199,0.99);
					--box-selection-fill: #267aa3;
					--loop-accent: #ffe845;
					--link-accent: #9f8;
					--ui-widget-background: #203829;
					--ui-widget-focus: #487860;
					--pitch-background: #203829;
					--tonic: #2b8d20;
					--fifth-note: #385840;
					--white-piano-key: #bda;
					--black-piano-key: #573;
                    --black-piano-key-text: #ffffff;
					--use-color-formula: true;
					--track-editor-bg-pitch: #254820;
					--track-editor-bg-pitch-dim: #102819;
					--track-editor-bg-noise: #304050;
					--track-editor-bg-noise-dim: #102030;
					--track-editor-bg-mod: #506030;
					--track-editor-bg-mod-dim: #2a300a;
					--multiplicative-mod-slider: #205c8f;
					--overwriting-mod-slider: #20ac6f;
					--indicator-primary: #dcd866;
					--indicator-secondary: #203829;
					--select2-opt-group: #1a6f5a;
					--input-box-outline: #242;
					--mute-button-normal: #49e980;
					--mute-button-mod: #c2e502;
					--mod-label-primary: #133613;
					--mod-label-secondary-text: rgb(27, 126, 40);
					--mod-label-primary-text: #efe;
					--pitch-secondary-channel-hue: 120;
					--pitch-secondary-channel-hue-scale: 8.1;
					--pitch-secondary-channel-sat: 59;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 50;
					--pitch-secondary-channel-lum-scale: 0.04;
					--pitch-primary-channel-hue: 120;
					--pitch-primary-channel-hue-scale: 8.1;
					--pitch-primary-channel-sat: 86;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 70;
					--pitch-primary-channel-lum-scale: 0.04;
					--pitch-secondary-note-hue: 120;
					--pitch-secondary-note-hue-scale: 8.1;
					--pitch-secondary-note-sat: 85;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 30;
					--pitch-secondary-note-lum-scale: 0.04;
					--pitch-primary-note-hue: 120;
					--pitch-primary-note-hue-scale: 8.1;
					--pitch-primary-note-sat: 90;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 80;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 200;
					--noise-secondary-channel-hue-scale: 1.1;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 22;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 200;
					--noise-primary-channel-hue-scale: 1.1;
					--noise-primary-channel-sat: 48;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 65;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 200;
					--noise-secondary-note-hue-scale: 1.1;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 33;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 200;
					--noise-primary-note-hue-scale: 1.1;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 64;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 40;
					--mod-secondary-channel-hue-scale: 1.8;
					--mod-secondary-channel-sat: 44;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 40;
					--mod-primary-channel-hue-scale: 1.8;
					--mod-primary-channel-sat: 60;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 40;
					--mod-secondary-note-hue-scale: 1.8;
					--mod-secondary-note-sat: 62;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 55;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 40;
					--mod-primary-note-hue-scale: 1.8;
					--mod-primary-note-sat: 66;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 85;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary:    #536e5c;
					--disabled-note-secondary:  #395440;
				}
			`,
        "canyon": `
				:root {
					--page-margin: #0a0000;
					--editor-background: #0a0000;
					--playhead: rgba(247, 172, 196, 0.9);
					--primary-text: #f5d6bf;
					--secondary-text: #934050;
					--inverted-text: #290505;
					--text-selection: rgba(255, 208, 68, 0.99);
					--box-selection-fill: #94044870;
					--loop-accent: #ff1e1e;
					--link-accent: #da7b76;
					--ui-widget-background: #533137;
					--ui-widget-focus: #743e4b;
					--pitch-background: #4f3939;
					--tonic: #9e4145;
					--fifth-note: #5b3e6b;
					--white-piano-key: #d89898;
					--black-piano-key: #572b29;
                    --black-piano-key-text: #ffffff;
					--use-color-formula: true;
					--track-editor-bg-pitch: #5e3a41;
					--track-editor-bg-pitch-dim: #281d1c;
					--track-editor-bg-noise: #3a3551;
					--track-editor-bg-noise-dim: #272732;
					--track-editor-bg-mod: #552045;
					--track-editor-bg-mod-dim: #3e1442;
					--multiplicative-mod-slider: #9f6095;
					--overwriting-mod-slider: #b55050;
					--indicator-primary: #f2f764;
					--indicator-secondary: #4f3939;
					--select2-opt-group: #673030;
					--input-box-outline: #443131;
					--mute-button-normal: #d81833;
					--mute-button-mod: #9e2691;
					--mod-label-primary: #5f2b39;
					--mod-label-secondary-text: rgb(158, 66, 122);
					--mod-label-primary-text: #e6caed;
					--pitch-secondary-channel-hue: 0;
					--pitch-secondary-channel-hue-scale: 11.8;
					--pitch-secondary-channel-sat: 73.3;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 40;
					--pitch-secondary-channel-lum-scale: 0.05;
					--pitch-primary-channel-hue: 0;
					--pitch-primary-channel-hue-scale: 11.8;
					--pitch-primary-channel-sat: 90;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 67.5;
					--pitch-primary-channel-lum-scale: 0.05;
					--pitch-secondary-note-hue: 0;
					--pitch-secondary-note-hue-scale: 11.8;
					--pitch-secondary-note-sat: 83.9;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 35;
					--pitch-secondary-note-lum-scale: 0.05;
					--pitch-primary-note-hue: 0;
					--pitch-primary-note-hue-scale: 11.8;
					--pitch-primary-note-sat: 100;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 85.6;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 60;
					--noise-secondary-channel-hue-scale: 2;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 42;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 60;
					--noise-primary-channel-hue-scale: 2;
					--noise-primary-channel-sat: 33;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 63.5;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 60;
					--noise-secondary-note-hue-scale: 2;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 55;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 60;
					--noise-primary-note-hue-scale: 2;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 74;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 222;
					--mod-secondary-channel-hue-scale: 1.5;
					--mod-secondary-channel-sat: 88;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 222;
					--mod-primary-channel-hue-scale: 1.5;
					--mod-primary-channel-sat: 96;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 222;
					--mod-secondary-note-hue-scale: 1.5;
					--mod-secondary-note-sat: 92;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 54;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 222;
					--mod-primary-note-hue-scale: 1.5;
					--mod-primary-note-sat: 96;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 75;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary:    #515164;
					--disabled-note-secondary:  #2a2a3a;
				}
			`,
        "midnight": `
		:root {
			--page-margin: #000;
			--editor-background: #000;
			--hover-preview: #757575;
			--playhead: #fff;
			--primary-text: #fff;
			--secondary-text: #acacac;
			--inverted-text: #290505;
			--text-selection: rgba(155, 155, 155, 0.99);
			--box-selection-fill: #79797970;
			--loop-accent: #646464;
			--link-accent: #707070;
			--ui-widget-background: #353535;
			--ui-widget-focus: #464646;
			--pitch-background: #222121;
			--tonic: #555955;
			--fifth-note: #1a1818;
			--white-piano-key: #a89e9e;
			--black-piano-key: #2d2424;
            --black-piano-key-text: #ffffff;
			--use-color-formula: true;
			--track-editor-bg-pitch: #373737;
			--track-editor-bg-pitch-dim: #131313;
			--track-editor-bg-noise: #484848;
			--track-editor-bg-noise-dim: #131313;
			--track-editor-bg-mod: #373737;
			--track-editor-bg-mod-dim: #131313;
			--multiplicative-mod-slider: #555;
			--overwriting-mod-slider: #464545;
			--indicator-primary: #e0e0e0;
			--indicator-secondary: #404040;
			--select2-opt-group: #3c3b3b;
			--input-box-outline: #757575;
			--mute-button-normal: #8e8d8d;
			--mute-button-mod: #ddd;
			--mod-label-primary: #262526;
			--mod-label-secondary-text: rgb(227, 222, 225);
			--mod-label-primary-text: #b9b9b9;
			--pitch-secondary-channel-hue: 240;
			--pitch-secondary-channel-hue-scale: 228;
			--pitch-secondary-channel-sat: 73.3;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 25;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: 240;
			--pitch-primary-channel-hue-scale: 228;
			--pitch-primary-channel-sat: 80;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 60.5;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: 240;
			--pitch-secondary-note-hue-scale: 228;
			--pitch-secondary-note-sat: 73.9;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 32;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: 240;
			--pitch-primary-note-hue-scale: 228;
			--pitch-primary-note-sat: 90;
			--pitch-primary-note-sat-scale: 0.05;
			--pitch-primary-note-lum: 80.6;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 160;
			--noise-secondary-channel-hue-scale: 2;
			--noise-secondary-channel-sat: 25;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 42;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 160;
			--noise-primary-channel-hue-scale: 2;
			--noise-primary-channel-sat: 33;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 63.5;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 160;
			--noise-secondary-note-hue-scale: 2;
			--noise-secondary-note-sat: 33.5;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 55;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 160;
			--noise-primary-note-hue-scale: 2;
			--noise-primary-note-sat: 46.5;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 74;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 62;
			--mod-secondary-channel-hue-scale: 1.5;
			--mod-secondary-channel-sat: 88;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 30;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 62;
			--mod-primary-channel-hue-scale: 1.5;
			--mod-primary-channel-sat: 96;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 80;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 62;
			--mod-secondary-note-hue-scale: 1.5;
			--mod-secondary-note-sat: 92;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 34;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 62;
			--mod-primary-note-hue-scale: 1.5;
			--mod-primary-note-sat: 96;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 75;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary:    #66a;
			--disabled-note-secondary:  #447;
		}
	`,
	        "Skeuomorphic": `
		:root {
			--page-margin: #020202;
			--editor-background: #1e1e1e;
			--hover-preview: white;
			--playhead: rgba(255, 255, 255, 0.9);
			--primary-text: white;
			--secondary-text: #848484;
			--inverted-text: black;
			--text-selection: rgba(119,68,255,0.99);
			--box-selection-fill: #044b94;
			--loop-accent: #74f;
			--link-accent: #98f;
			--ui-widget-background: #444;
			--ui-widget-focus: #555;
			--pitch-background: #393e4f;
			--tonic: #725491;
			--fifth-note: #54547a;
			--third-note: #3b4b71;
			--white-piano-key: #eee;
			--black-piano-key: #666;
			--white-piano-key-text: #131200;
			--black-piano-key-text: #fff;
			--use-color-formula: false;
			--pitch-channel-limit: 10;
			--track-editor-bg-pitch: linear-gradient(#4b5164, #3e3f48);
			--track-editor-bg-pitch-dim: linear-gradient(#3e3f48, #212530);
			--track-editor-bg-noise: linear-gradient(#3d3535,#161313);
			--track-editor-bg-noise-dim: linear-gradient(#161313,#0e0c0c);
			--track-editor-bg-mod: linear-gradient(#283560,#0a101f);
			--track-editor-bg-mod-dim: linear-gradient(#05080f,#0a101f);
			--multiplicative-mod-slider: #606c9f;
			--overwriting-mod-slider: #6850b5;
			--indicator-primary: #9c64f7;
			--indicator-secondary: #393e4f;
			--select2-opt-group: #333;
			--input-box-outline: #222;
			--mute-button-normal: #dda85d;
			--mute-button-mod: #886eae;
			--mod-label-primary: #282840;
			--mod-label-secondary-text: rgb(87, 86, 120);
			--mod-label-primary-text: white;

			--pitch1-secondary-channel: #bb1111;
			--pitch1-primary-channel:   #ff5959;
			--pitch1-secondary-note:    #7c0404;
			--pitch1-primary-note:      #ffb6b6;
		
			--pitch2-secondary-channel: #bb5b11;
			--pitch2-primary-channel:   #ffa159;
			--pitch2-secondary-note:    #7c3804;
			--pitch2-primary-note:      #ffd5b6;
		
			--pitch3-secondary-channel: #bba411;
			--pitch3-primary-channel:   #ffe959;
			--pitch3-secondary-note:    #7c6c04;
			--pitch3-primary-note:      #fff5b6;
		
			--pitch4-secondary-channel: #88bb11;
			--pitch4-primary-channel:   #cdff59;
			--pitch4-secondary-note:    #587c04;
			--pitch4-primary-note:      #e9ffb6;
		
			--pitch5-secondary-channel: #3ebb11;
			--pitch5-primary-channel:   #85ff59;
			--pitch5-secondary-note:    #247c04;
			--pitch5-primary-note:      #c9ffb6;
		
			--pitch6-secondary-channel: #11bb2e;
			--pitch6-primary-channel:   #59ff75;
			--pitch6-secondary-note:    #047c18;
			--pitch6-primary-note:      #b6ffc2;
		
			--pitch7-secondary-channel: #11bb77;
			--pitch7-primary-channel:   #59ffbd;
			--pitch7-secondary-note:    #047c4c;
			--pitch7-primary-note:      #b6ffe2;
		
			--pitch8-secondary-channel: #11b5bb;
			--pitch8-primary-channel:   #59f9ff;
			--pitch8-secondary-note:    #04777c;
			--pitch8-primary-note:      #b6fcff;
		
			--pitch9-secondary-channel: #116bbb;
			--pitch9-primary-channel:   #59b1ff;
			--pitch9-secondary-note:    #04437c;
			--pitch9-primary-note:      #b6dcff;
		
			--pitch10-secondary-channel:#1826aa;
			--pitch10-primary-channel:  #5161f6;
			--pitch10-secondary-note:   #091370;
			--pitch10-primary-note:     #adb4fd;
		
			--pitch11-secondary-channel:#4918aa;
			--pitch11-primary-channel:  #8951f6;
			--pitch11-secondary-note:   #2c0970;
			--pitch11-primary-note:     #c8adfd;
		
			--pitch12-secondary-channel:#8818aa;
			--pitch12-primary-channel:  #d051f6;
			--pitch12-secondary-note:   #580970;
			--pitch12-primary-note:     #ebadfd;
		
			--pitch13-secondary-channel:#aa188c;
			--pitch13-primary-channel:  #f651d4;
			--pitch13-secondary-note:   #70095b;
			--pitch13-primary-note:     #fdadec;
		
			--pitch14-secondary-channel:#aa184d;
			--pitch14-primary-channel:  #f6518d;
			--pitch14-secondary-note:   #70092e;
			--pitch14-primary-note:     #fdadca; 
		
			--noise1-secondary-channel: #6F6F6F;
			--noise1-primary-channel:   #AAAAAA;
			--noise1-secondary-note:    #A7A7A7;
			--noise1-primary-note:      #E0E0E0;
			--noise2-secondary-channel: #996633;
			--noise2-primary-channel:   #DDAA77;
			--noise2-secondary-note:    #CC9966;
			--noise2-primary-note:      #F0D0BB;
			--noise3-secondary-channel: #4A6D8F;
			--noise3-primary-channel:   #77AADD;
			--noise3-secondary-note:    #6F9FCF;
			--noise3-primary-note:      #BBD7FF;
			--noise4-secondary-channel: #7A4F9A;
			--noise4-primary-channel:   #AF82D2;
			--noise4-secondary-note:    #9E71C1;
			--noise4-primary-note:      #D4C1EA;
			--noise5-secondary-channel: #607837;
			--noise5-primary-channel:   #A2BB77;
			--noise5-secondary-note:    #91AA66;
			--noise5-primary-note:      #C5E2B2;
		--mod1-secondary-channel:   #339955;
				--mod1-primary-channel:     #77fc55;
				--mod1-secondary-note:      #77ff8a;
				--mod1-primary-note:        #cdffee;
				--mod2-secondary-channel:   #993355;
				--mod2-primary-channel:     #f04960;
				--mod2-secondary-note:      #f057a0;
				--mod2-primary-note:        #ffb8de;
				--mod3-secondary-channel:   #553399;
				--mod3-primary-channel:     #8855fc;
				--mod3-secondary-note:      #aa64ff;
				--mod3-primary-note:	    #f8ddff;
				--mod4-secondary-channel:   #a86436;
				--mod4-primary-channel:     #c8a825;
				--mod4-secondary-note:      #e8ba46;
				--mod4-primary-note:        #fff6d3;
			--disabled-note-primary:    #91879f;
			--disabled-note-secondary:  #6a677a;
		}
		 
		.channelBox {
			--pitch1-primary-channel:  linear-gradient(#ff7777, #ff5959);
			--pitch2-primary-channel:  linear-gradient(#ffaf71, #ffa159);
			--pitch3-primary-channel:  linear-gradient(#ffee7c, #ffe959);
			--pitch4-primary-channel:  linear-gradient(#d3fa7a, #cdff59);
			--pitch5-primary-channel:  linear-gradient(#a4ff83, #85ff59);
			--pitch6-primary-channel:  linear-gradient(#8aff9e, #59ff75);
			--pitch7-primary-channel:  linear-gradient(#81ffcc, #59ffbd);
			--pitch8-primary-channel:  linear-gradient(#59f9ff, #59f9ff);
			--pitch9-primary-channel:  linear-gradient(#87c7ff, #59b1ff);
			--pitch10-primary-channel: linear-gradient(#7a87ff, #5161f6);
			--pitch11-primary-channel: linear-gradient(#a476ff, #8951f6);
			--pitch12-primary-channel: linear-gradient(#df75ff, #d051f6);
			--pitch13-primary-channel: linear-gradient(#ff75e3, #f651d4);
			--pitch14-primary-channel: linear-gradient(#ff71a5, #f6518d);
		
			border-radius: 5px;
			box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px 1px rgba(0, 0, 0, 0.7), inset 0px -10px 20px 1px rgba(0, 0, 0, 0.1), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1);
		}
		.channelBox {
			border-radius: 5px;
			box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px 1px rgba(0, 0, 0, 0.7), inset 0px -10px 20px 1px rgba(0, 0, 0, 0.1), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1);
		}
		
		.channelBoxLabel {
			--pitch1-primary-channel:   #ff5959;
			--pitch2-primary-channel:   #ffa159;
			--pitch3-primary-channel:   #ffe959;
			--pitch4-primary-channel:   #cdff59;
			--pitch5-primary-channel:   #85ff59;
			--pitch6-primary-channel:   #59ff75;
			--pitch7-primary-channel:   #59ffbd;
			--pitch8-primary-channel:   #59f9ff;
			--pitch9-primary-channel:   #59b1ff;
			--pitch10-primary-channel:  #5161f6;
			--pitch11-primary-channel:  #8951f6;
			--pitch12-primary-channel:  #d051f6;
			--pitch13-primary-channel:  #f651d4;
			--pitch14-primary-channel:  #f6518d;
		}
		
		body {
			background-image: url('./skeuobg.png') !important;
			background-repeat: no-repeat !important;
			background-size: contain;
			font-family: Arial, Helvetica, sans-serif;
		}
		
		#beepboxEditorContainer, .track-area, .beepboxEditor, #text-content, div.noSelection {
			background-color: #fff0 !important;
		} 
		
		#pitchEditorBackground {
			opacity: 0.5 !important;
			filter: brightness(150%);
		}
		
		svg#firstImage {
			background-image: url('./skeuobg2.png') !important;
		}
		
		#oscilascopeAll {
			margin-left: auto;
			margin-right: auto;
			position: static;
		}
		 
		.beepboxEditor,
		.beepboxEditor select
		{
			text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.5);
		}
		 
		.beepboxEditor .piano-button {
			text-shadow: none;
		}
		 
		.beepboxEditor .prompt
		{
			background: radial-gradient(farthest-corner at 50% 0px, #2a2a2a, #1a1a1a) !important;
		}
		 
		#beepboxEditorContainer {
			background-color: rgba(0, 0, 0, 0) !important;
		}
		 
		.beepboxEditor .trackAndMuteContainer {
			text-shadow: none;
		}
		 
		.beepboxEditor .loopEditor
		{
			--editor-background: rgba(0, 0, 0, 0.0) !important;
		}
		 
		.beepboxEditor .muteEditor
		{
			--editor-background: #1e1e1e !important;
		}
		 
		.beepboxEditor .pattern-area
		{
			--editor-background: rgba(0, 0, 0, 1) !important;
		}
		 
		.beepboxEditor .trackContainer svg
		{
			--editor-background: #111 !important;
		}
		 
		.beepboxEditor .muteEditor > :last-child {
			--editor-background: rgba(0, 0, 0, 0) !important;
		}
		 
		.beepboxEditor #octaveScrollBarContainer {
			background-color: rgba(0, 0, 0, 0.3);
		}
		 
		.beepboxEditor {
			--track-editor-bg-pitch-dim: #1e1f28;
		}
		 
		.beepboxEditor .muteButtonText {
			transform: translate(0px, 1px) !important;
			color: #777 !important;
		}
		 
		.beepboxEditor .instrument-bar {
			--text-color-lit: #eee;
			--text-color-dim: #777;
		}
		 
		.beepboxEditor .instrument-bar .selected-instrument {
			color: rgba(255, 255, 255, 1) !important;
			text-shadow: 0px 0px 4px var(--text-color-lit);
		}
		 
		.beepboxEditor .instrument-bar .deactivated {
			color: rgba(0, 0, 0, 1) !important;
			text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
		}
		 
		.beepboxEditor .instrument-bar > :not(.last-button) {
			border-color: var(--background-color-lit) !important;
		}
		 
		.beepboxEditor .instrument-bar .selected-instrument {
			border-color: rgba(255, 255, 255, 1) !important;
		}
		 
		.beepboxEditor select
		{
			background: #444 !important;
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px -10px 20px 1px rgba(0, 0, 0, 0.4),
				inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor select:focus
		{
			background: #333 !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px 10px 20px 1px rgba(0, 0, 0, 0.4),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor .select2-selection__rendered,
		.beepboxEditor button,
		.beepboxEditor .instrument-bar button,
		.beepboxEditor .eq-filter-type-bar button .deactivated,
		.beepboxEditor .note-filter-type-bar button .deactivated
		{
			background: linear-gradient(#444, #333) !important;
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor .select2-container--open .select2-selection__rendered,
		.beepboxEditor button:focus,
		.beepboxEditor .instrument-bar .selected-instrument,
		.beepboxEditor .eq-filter-type-bar button:not(.deactivated),
		.beepboxEditor .note-filter-type-bar button:not(.deactivated)
		{
			background: linear-gradient(#333, #444) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor .filterEditor svg,
		.beepboxEditor .fadeInOut svg,
		.beepboxEditor .harmonics svg,
		.beepboxEditor .spectrum svg
		{
			background: rgba(0, 0, 0, 0.3) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-webkit-slider-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-ms-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-ms-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-ms-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-moz-range-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-moz-range-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-moz-range-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="text"],
		.beepboxEditor input[type="number"]
		{
			border: none !important;
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="checkbox"]
		{
			appearance: none;
			background: rgba(0, 0, 0, 0.3);
			color: currentColor;
			border-radius: 1px;
			width: 1em !important;
			height: 1em !important;
			box-shadow:
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
			;
		}
		 
		.beepboxEditor input[type="checkbox"]:checked
		{
			display: flex;
			justify-content: center;
		}
		 
		.beepboxEditor input[type="checkbox"]:checked:after
		{
			width: 1em;
			height: 1em;
			text-align: center;
			font-size: 0.8em;
			content: "✓";
			color: currentColor;
			text-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5);
		}
		`,
        "woodland": `
		:root {
			--page-margin: #1d1b16;
			--editor-background: #1d1b16;
			--hover-preview: white;
			--playhead: rgba(255, 255, 255, 0.9);
			--primary-text: #ffe6d1;
			--secondary-text: #f0c4a1;
			--inverted-text: black;
			--text-selection: #c58f1cfc;
			--box-selection-fill: #942d04;
			--loop-accent: #a69186;
			--link-accent: #c4b044;
			--ui-widget-background: #3c3931;
			--ui-widget-focus: #514240;
			--pitch-background: #342e29;
			--tonic: #514129;
			--fifth-note: #735346;
			--third-note: #593439;
			--white-piano-key: #a69186;
			--black-piano-key: #423a34;
			--white-piano-key-text: #1f0d03;
			--black-piano-key-text: #ffe6d1;
			--use-color-formula: false;
			--pitch-channel-limit: 10;
			--track-editor-bg-pitch: linear-gradient(#644b4b, #483e3e);
			--track-editor-bg-pitch-dim: linear-gradient(#483e3e, #302121);
			--track-editor-bg-noise: linear-gradient(#3d3535,#161313);
			--track-editor-bg-noise-dim: linear-gradient(#161313,#0e0c0c);
			--track-editor-bg-mod: linear-gradient(#603e28,#1f100a);
			--track-editor-bg-mod-dim: linear-gradient(#0f0705,#1f0d0a);
			--multiplicative-mod-slider: #966d3f;
			--overwriting-mod-slider: #b58650;
			--indicator-primary: #b58650;
			--indicator-secondary: #4f4139;
			--select2-opt-group: #3b0000;
			--input-box-outline: #200000;
			--mute-button-normal: #dda85d;
			--mute-button-mod: #adae6e;
			--mod-label-primary: #422a0f;
			--mod-label-secondary-text: rgb(87, 86, 120);
			--mod-label-primary-text: white;
			--octave-scrollbar: #281f1a;

			--pitch1-secondary-channel: #bb1111;
			--pitch1-primary-channel:   #ff5959;
			--pitch1-secondary-note:    #7c0404;
			--pitch1-primary-note:      #ffb6b6;
		
			--pitch2-secondary-channel: #bb5b11;
			--pitch2-primary-channel:   #ffa159;
			--pitch2-secondary-note:    #7c3804;
			--pitch2-primary-note:      #ffd5b6;
		
			--pitch3-secondary-channel: #bba411;
			--pitch3-primary-channel:   #ffe959;
			--pitch3-secondary-note:    #7c6c04;
			--pitch3-primary-note:      #fff5b6;
		
			--pitch4-secondary-channel: #88bb11;
			--pitch4-primary-channel:   #cdff59;
			--pitch4-secondary-note:    #587c04;
			--pitch4-primary-note:      #e9ffb6;
		
			--pitch5-secondary-channel: #3ebb11;
			--pitch5-primary-channel:   #85ff59;
			--pitch5-secondary-note:    #247c04;
			--pitch5-primary-note:      #c9ffb6;
		
			--pitch6-secondary-channel: #11bb2e;
			--pitch6-primary-channel:   #59ff75;
			--pitch6-secondary-note:    #047c18;
			--pitch6-primary-note:      #b6ffc2;
		
			--pitch7-secondary-channel: #11bb77;
			--pitch7-primary-channel:   #59ffbd;
			--pitch7-secondary-note:    #047c4c;
			--pitch7-primary-note:      #b6ffe2;
		
			--pitch8-secondary-channel: #11b5bb;
			--pitch8-primary-channel:   #59f9ff;
			--pitch8-secondary-note:    #04777c;
			--pitch8-primary-note:      #b6fcff;
		
			--pitch9-secondary-channel: #116bbb;
			--pitch9-primary-channel:   #59b1ff;
			--pitch9-secondary-note:    #04437c;
			--pitch9-primary-note:      #b6dcff;
		
			--pitch10-secondary-channel:#1826aa;
			--pitch10-primary-channel:  #5161f6;
			--pitch10-secondary-note:   #091370;
			--pitch10-primary-note:     #adb4fd;
		
			--pitch11-secondary-channel:#4918aa;
			--pitch11-primary-channel:  #8951f6;
			--pitch11-secondary-note:   #2c0970;
			--pitch11-primary-note:     #c8adfd;
		
			--pitch12-secondary-channel:#8818aa;
			--pitch12-primary-channel:  #d051f6;
			--pitch12-secondary-note:   #580970;
			--pitch12-primary-note:     #ebadfd;
		
			--pitch13-secondary-channel:#aa188c;
			--pitch13-primary-channel:  #f651d4;
			--pitch13-secondary-note:   #70095b;
			--pitch13-primary-note:     #fdadec;
		
			--pitch14-secondary-channel:#aa184d;
			--pitch14-primary-channel:  #f6518d;
			--pitch14-secondary-note:   #70092e;
			--pitch14-primary-note:     #fdadca; 
		
			--noise1-secondary-channel: #6F6F6F;
			--noise1-primary-channel:   #AAAAAA;
			--noise1-secondary-note:    #A7A7A7;
			--noise1-primary-note:      #E0E0E0;
			--noise2-secondary-channel: #996633;
			--noise2-primary-channel:   #DDAA77;
			--noise2-secondary-note:    #CC9966;
			--noise2-primary-note:      #F0D0BB;
			--noise3-secondary-channel: #4A6D8F;
			--noise3-primary-channel:   #77AADD;
			--noise3-secondary-note:    #6F9FCF;
			--noise3-primary-note:      #BBD7FF;
			--noise4-secondary-channel: #7A4F9A;
			--noise4-primary-channel:   #AF82D2;
			--noise4-secondary-note:    #9E71C1;
			--noise4-primary-note:      #D4C1EA;
			--noise5-secondary-channel: #607837;
			--noise5-primary-channel:   #A2BB77;
			--noise5-secondary-note:    #91AA66;
			--noise5-primary-note:      #C5E2B2;
		--mod1-secondary-channel:   #339955;
				--mod1-primary-channel:     #77fc55;
				--mod1-secondary-note:      #77ff8a;
				--mod1-primary-note:        #cdffee;
				--mod2-secondary-channel:   #993355;
				--mod2-primary-channel:     #f04960;
				--mod2-secondary-note:      #f057a0;
				--mod2-primary-note:        #ffb8de;
				--mod3-secondary-channel:   #553399;
				--mod3-primary-channel:     #8855fc;
				--mod3-secondary-note:      #aa64ff;
				--mod3-primary-note:	    #f8ddff;
				--mod4-secondary-channel:   #a86436;
				--mod4-primary-channel:     #c8a825;
				--mod4-secondary-note:      #e8ba46;
				--mod4-primary-note:        #fff6d3;
			--disabled-note-primary:    #91879f;
			--disabled-note-secondary:  #6a677a;
		}
		 
		.channelBox {
			--pitch1-primary-channel:  linear-gradient(#ff7777, #ff5959);
			--pitch2-primary-channel:  linear-gradient(#ffaf71, #ffa159);
			--pitch3-primary-channel:  linear-gradient(#ffee7c, #ffe959);
			--pitch4-primary-channel:  linear-gradient(#d3fa7a, #cdff59);
			--pitch5-primary-channel:  linear-gradient(#a4ff83, #85ff59);
			--pitch6-primary-channel:  linear-gradient(#8aff9e, #59ff75);
			--pitch7-primary-channel:  linear-gradient(#81ffcc, #59ffbd);
			--pitch8-primary-channel:  linear-gradient(#59f9ff, #59f9ff);
			--pitch9-primary-channel:  linear-gradient(#87c7ff, #59b1ff);
			--pitch10-primary-channel: linear-gradient(#7a87ff, #5161f6);
			--pitch11-primary-channel: linear-gradient(#a476ff, #8951f6);
			--pitch12-primary-channel: linear-gradient(#df75ff, #d051f6);
			--pitch13-primary-channel: linear-gradient(#ff75e3, #f651d4);
			--pitch14-primary-channel: linear-gradient(#ff71a5, #f6518d);
		
			border-radius: 5px;
			box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px 1px rgba(0, 0, 0, 0.7), inset 0px -10px 20px 1px rgba(0, 0, 0, 0.1), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1);
		}
		.channelBox {
			border-radius: 5px;
			box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px 1px rgba(0, 0, 0, 0.7), inset 0px -10px 20px 1px rgba(0, 0, 0, 0.1), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1);
		}
		
		.channelBoxLabel {
			--pitch1-primary-channel:   #ff5959;
			--pitch2-primary-channel:   #ffa159;
			--pitch3-primary-channel:   #ffe959;
			--pitch4-primary-channel:   #cdff59;
			--pitch5-primary-channel:   #85ff59;
			--pitch6-primary-channel:   #59ff75;
			--pitch7-primary-channel:   #59ffbd;
			--pitch8-primary-channel:   #59f9ff;
			--pitch9-primary-channel:   #59b1ff;
			--pitch10-primary-channel:  #5161f6;
			--pitch11-primary-channel:  #8951f6;
			--pitch12-primary-channel:  #d051f6;
			--pitch13-primary-channel:  #f651d4;
			--pitch14-primary-channel:  #f6518d;
		}
		
		body {
			font-family: Arial, Helvetica, sans-serif;
		}
		
		#beepboxEditorContainer, .track-area, .beepboxEditor, #text-content, div.noSelection {
			background-color: #fff0 !important;
		} 
		
		#pitchEditorBackground {
			opacity: 0.5 !important;
			filter: brightness(150%);
		}
		
		#oscilascopeAll {
			margin-left: auto;
			margin-right: auto;
			position: static;
		}
		 
		.beepboxEditor,
		.beepboxEditor select
		{
			text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.5);
		}
		 
		.beepboxEditor .piano-button {
			text-shadow: none;
		}
		 
		.beepboxEditor .prompt
		{
			background: radial-gradient(farthest-corner at 50% 0px, #1d0700, #110400) !important;
		}
		 
		#beepboxEditorContainer {
			background-color: rgba(0, 0, 0, 0) !important;
		}
		 
		.beepboxEditor .trackAndMuteContainer {
			text-shadow: none;
		}
		 
		.beepboxEditor .loopEditor
		{
			--editor-background: rgba(0, 0, 0, 0.0) !important;
		}
		 
		.beepboxEditor .pattern-area
		{
			--editor-background: rgba(0, 0, 0, 1) !important;
		}
		 
		.beepboxEditor .trackContainer svg
		{
			--editor-background: #33190a !important;
		}
		 
		.beepboxEditor .muteEditor > :last-child {
			--editor-background: rgba(0, 0, 0, 0) !important;
		}
		 
		.beepboxEditor #octaveScrollBarContainer {
			background-color: rgba(0, 0, 0, 0.3);
		}
		 
		.beepboxEditor {
			--track-editor-bg-pitch-dim: #1e1f28;
		}
		 
		.beepboxEditor .muteButtonText {
			transform: translate(0px, 1px) !important;
			color: #777 !important;
		}
		 
		.beepboxEditor .instrument-bar {
			--text-color-lit: #eee;
			--text-color-dim: #777;
		}
		 
		.beepboxEditor .instrument-bar .selected-instrument {
			color: rgba(255, 255, 255, 1) !important;
			text-shadow: 0px 0px 4px var(--text-color-lit);
		}
		 
		.beepboxEditor .instrument-bar .deactivated {
			color: rgba(0, 0, 0, 1) !important;
			text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
		}
		 
		.beepboxEditor .instrument-bar > :not(.last-button) {
			border-color: var(--background-color-lit) !important;
		}
		 
		.beepboxEditor .instrument-bar .selected-instrument {
			border-color: rgba(255, 255, 255, 1) !important;
		}
		 
		.beepboxEditor select
		{
			background: #3c3931 !important;
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px -10px 20px 1px rgba(31, 11, 2, 0.4),
				inset 0px 1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor select:focus
		{
			background: #201e1b !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px 10px 20px 1px rgba(0, 0, 0, 0.4),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor .select2-selection__rendered,
		.beepboxEditor button,
		.beepboxEditor .instrument-bar button,
		.beepboxEditor .eq-filter-type-bar button .deactivated,
		.beepboxEditor .note-filter-type-bar button .deactivated
		{
			background: linear-gradient(#3c3931, #201e1b) !important;
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor .select2-container--open .select2-selection__rendered,
		.beepboxEditor button:focus,
		.beepboxEditor .instrument-bar .selected-instrument,
		.beepboxEditor .eq-filter-type-bar button:not(.deactivated),
		.beepboxEditor .note-filter-type-bar button:not(.deactivated)
		{
			background: linear-gradient(#201e1b, #3c3931) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor .filterEditor svg,
		.beepboxEditor .fadeInOut svg,
		.beepboxEditor .harmonics svg,
		.beepboxEditor .spectrum svg
		{
			background: rgba(0, 0, 0, 0.3) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-webkit-slider-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 183, 162, 0.3),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-ms-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 183, 162, 1),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-ms-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-ms-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="range"]::-moz-range-thumb
		{
			box-shadow:
				0px 2px 2px 1px rgba(0, 0, 0, 0.4),
				0px 0px 1px 1px rgba(0, 0, 0, 0.7),
				inset 0px 1px 0px 0px rgba(255, 183, 162, 1),
				inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px -8px 3px rgba(0, 0, 0, 0.2)
			;
		}
		 
		.beepboxEditor input[type="range"]::-moz-range-track
		{
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
			border-radius: 4px;
		}
		 
		.beepboxEditor input[type="range"]:focus::-moz-range-track
		{
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
				0px 0px 1px 1px rgba(0, 0, 0, 0.2),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="text"],
		.beepboxEditor input[type="number"]
		{
			border: none !important;
			background: rgba(0, 0, 0, 0.2) !important;
			box-shadow:
				0px -1px 1px 0px rgba(0, 0, 0, 0.5),
				inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="checkbox"]
		{
			appearance: none;
			background: rgba(0, 0, 0, 0.3);
			color: currentColor;
			border-radius: 1px;
			width: 1em !important;
			height: 1em !important;
			box-shadow:
				inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
				inset 0px -1px 0px 0px rgba(255, 183, 162, 0.3)
			;
		}
		 
		.beepboxEditor input[type="checkbox"]:checked
		{
			display: flex;
			justify-content: center;
		}
		 
		.beepboxEditor input[type="checkbox"]:checked:after
		{
			width: 1em;
			height: 1em;
			text-align: center;
			font-size: 0.8em;
			content: "✓";
			color: currentColor;
			text-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5);
		}
		`,
				"2012 Video Tutorial": `
			:root {
				--page-margin: black;
				--editor-background: black;
				--hover-preview: white;
				--playhead: white;
				--primary-text: white;
				--secondary-text: #999;
				--inverted-text: black;
				--text-selection: rgba(119,68,255,0.99);
				--box-selection-fill: rgba(255,255,255,0.2);
				--loop-accent: #74f;
				--link-accent: #98f;
				--ui-widget-background: #444;
				--ui-widget-focus: #777;
				--pitch-background: #444;
				--tonic: #864;
				--fifth-note: #468;
				--third-note: #486;
				--white-piano-key: #bbb;
				--black-piano-key: #444;
				--white-piano-key-text: #131200;
				--black-piano-key-text: #fff;
					--use-color-formula: false;
			--pitch-channel-limit: 10;
					--track-editor-bg-pitch: #444;
					--track-editor-bg-pitch-dim: #333;
					--track-editor-bg-noise: #444;
					--track-editor-bg-noise-dim: #333;
					--track-editor-bg-mod: #234;
					--track-editor-bg-mod-dim: #123;
					--multiplicative-mod-slider: #456;
					--overwriting-mod-slider: #654;
					--indicator-primary: #74f;
					--indicator-secondary: #444;
					--select2-opt-group: #585858;
					--input-box-outline: #333;
					--mute-button-normal: #ffa033;
					--mute-button-mod: #9a6bff;
				--pitch1-secondary-channel: #0099A1;
				--pitch1-primary-channel:   #25F3FF;
				--pitch1-secondary-note:    #00BDC7;
				--pitch1-primary-note:      #92F9FF;
				--pitch2-secondary-channel: #A1A100;
				--pitch2-primary-channel:   #FFFF25;
				--pitch2-secondary-note:    #C7C700;
				--pitch2-primary-note:      #FFFF92;
				--pitch3-secondary-channel: #C75000;
				--pitch3-primary-channel:   #FF9752;
				--pitch3-secondary-note:    #FF771C;
				--pitch3-primary-note:      #FFCDAB;
				--pitch4-secondary-channel: #00A100;
				--pitch4-primary-channel:   #50FF50;
				--pitch4-secondary-note:    #00C700;
				--pitch4-primary-note:      #A0FFA0;
				--pitch5-secondary-channel: #D020D0;
				--pitch5-primary-channel:   #FF90FF;
				--pitch5-secondary-note:    #E040E0;
				--pitch5-primary-note:      #FFC0FF;
				--pitch6-secondary-channel: #7777B0;
				--pitch6-primary-channel:   #A0A0FF;
				--pitch6-secondary-note:    #8888D0;
				--pitch6-primary-note:      #D0D0FF;
				--pitch7-secondary-channel: #8AA100;
				--pitch7-primary-channel:   #DEFF25;
				--pitch7-secondary-note:    #AAC700;
				--pitch7-primary-note:      #E6FF92;
				--pitch8-secondary-channel: #DF0019;
				--pitch8-primary-channel:   #FF98A4;
				--pitch8-secondary-note:    #FF4E63;
				--pitch8-primary-note:      #FFB2BB;
				--pitch9-secondary-channel: #00A170;
				--pitch9-primary-channel:   #50FFC9;
				--pitch9-secondary-note:    #00C78A;
				--pitch9-primary-note:      #83FFD9;
				--pitch10-secondary-channel:#A11FFF;
				--pitch10-primary-channel:  #CE8BFF;
				--pitch10-secondary-note:   #B757FF;
				--pitch10-primary-note:     #DFACFF;
				--noise1-secondary-channel: #6F6F6F;
				--noise1-primary-channel:   #AAAAAA;
				--noise1-secondary-note:    #A7A7A7;
				--noise1-primary-note:      #E0E0E0;
				--noise2-secondary-channel: #996633;
				--noise2-primary-channel:   #DDAA77;
				--noise2-secondary-note:    #CC9966;
				--noise2-primary-note:      #F0D0BB;
				--noise3-secondary-channel: #4A6D8F;
				--noise3-primary-channel:   #77AADD;
				--noise3-secondary-note:    #6F9FCF;
				--noise3-primary-note:      #BBD7FF;
				--noise4-secondary-channel: #7A4F9A;
				--noise4-primary-channel:   #AF82D2;
				--noise4-secondary-note:    #9E71C1;
				--noise4-primary-note:      #D4C1EA;
				--noise5-secondary-channel: #607837;
				--noise5-primary-channel:   #A2BB77;
				--noise5-secondary-note:    #91AA66;
				--noise5-primary-note:      #C5E2B2;
          --mod1-secondary-channel:   #339955;
					--mod1-primary-channel:     #77fc55;
					--mod1-secondary-note:      #77ff8a;
					--mod1-primary-note:        #cdffee;
					--mod2-secondary-channel:   #993355;
					--mod2-primary-channel:     #f04960;
					--mod2-secondary-note:      #f057a0;
					--mod2-primary-note:        #ffb8de;
					--mod3-secondary-channel:   #553399;
					--mod3-primary-channel:     #8855fc;
					--mod3-secondary-note:      #aa64ff;
					--mod3-primary-note:	    #f8ddff;
					--mod4-secondary-channel:   #a86436;
					--mod4-primary-channel:     #c8a825;
					--mod4-secondary-note:      #e8ba46;
					--mod4-primary-note:        #fff6d3;
					--mod-label-primary:        #999;
					--mod-label-secondary-text: #333;
					--mod-label-primary-text:   black;
					--disabled-note-primary:    #999;
					--disabled-note-secondary:  #666;
				}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 0;
  background-image: url("./bandicam_watermark.png");
					background-repeat: no-repeat;
  					background-size: contain;
  					background-position-x: center;
				  	backdrop-filter: blur(1px);
					position: fixed !important;
}
				 html:not(.overlay) {
					width: 75vw;
					padding-left: 12.5%;
					position: relative;
					background: black;
				} 

			`,
			"Scratch": `
		:root {
			--page-margin: #4d97ff40;
			--editor-background: #f6e5fa;
			--hover-preview: #ff9900;
			--playhead: #4cbf56;
			--primary-text: #fff;
			--secondary-text: #000;
			--inverted-text: #fff;
			--text-selection: rgba(255, 255, 255, 0.99);
			--box-selection-fill: #7725ff;
			--loop-accent: #ffab19;
			--link-accent: #ff9900;
			--ui-widget-background: #855cd6;
			--ui-widget-focus: #ff661a;
			--pitch-background: #F5F1F0;
			--tonic: #855cd6;
			--fifth-note: #7e7e7e;
			--third-note: #d2bddd;
			--use-color-formula: false;
			--pitch-channel-limit: 10;
			--track-editor-bg-pitch: #fff;
			--track-editor-bg-pitch-dim: #c7c7c7;
			--track-editor-bg-noise: #4d97ff40;
			--track-editor-bg-noise-dim: #1c54a3b0;
			--track-editor-bg-mod: #855cd6;
			--track-editor-bg-mod-dim: #503389;
			--multiplicative-mod-slider: #ff6680;
			--overwriting-mod-slider: #ff3355;
			--indicator-primary: #855cd6;
			--indicator-secondary: #cecece;
			--select2-opt-group: #5a3b98;
			--input-box-outline: #626262;
			--mute-button-normal: #cf63cf;
			--mute-button-mod: #cf63cf;
			--mod-label-primary: #ff3355;
			--white-piano-key: #fff;
			--black-piano-key: #000;
			--white-piano-key-text: #000;
			--black-piano-key-text: #fff;
			--note-flash: #4cbf56;
			--note-flash-secondary: #b84848;
			--oscilloscope-line-L: #d587e6;
			--oscilloscope-line-R: #b11cc7;
			--pitch1-secondary-channel: #3373cc;
			--pitch1-primary-channel: #4c97ff;
			--pitch1-secondary-note: #3373cc;
			--pitch1-primary-note: #4c97ff;
			--pitch2-secondary-channel: #774dcb;
			--pitch2-primary-channel: #9966ff;
			--pitch2-secondary-note: #774dcb;
			--pitch2-primary-note: #9966ff;
			--pitch3-secondary-channel: #bd42bd;
			--pitch3-primary-channel: #cf63cf;
			--pitch3-secondary-note: #bd42bd;
			--pitch3-primary-note: #cf63cf;
			--pitch4-secondary-channel: #cc9900;
			--pitch4-primary-channel: #ffbf00;
			--pitch4-secondary-note: #cc9900;
			--pitch4-primary-note: #ffbf00;
			--pitch5-secondary-channel: #cf8b17;
			--pitch5-primary-channel: #ffab19;
			--pitch5-secondary-note: #cf8b17;
			--pitch5-primary-note: #ffab19;
			--pitch6-secondary-channel: #2e8eb8;
			--pitch6-primary-channel: #5cb1d6;
			--pitch6-secondary-note: #2e8eb8;
			--pitch6-primary-note: #5cb1d6;
			--pitch7-secondary-channel: #389438;
			--pitch7-primary-channel: #59c059;
			--pitch7-secondary-note: #389438;
			--pitch7-primary-note: #59c059;
			--pitch8-secondary-channel: #db6e00;
			--pitch8-primary-channel: #ff8c1a;
			--pitch8-secondary-note: #db6e00;
			--pitch8-primary-note: #ff8c1a;
			--pitch9-secondary-channel: #ff3355;
			--pitch9-primary-channel: #ff6680;
			--pitch9-secondary-note: #ff3355;
			--pitch9-primary-note: #ff6680;
			--pitch10-secondary-channel: #0b8e69;
			--pitch10-primary-channel: #0fbd8c;
			--pitch10-secondary-note: #0b8e69;
			--pitch10-primary-note: #0fbd8c;
			--noise1-secondary-channel: #ef3d23;
			--noise1-primary-channel: #fcf9ce;
			--noise1-secondary-note: #ef3d23;
			--noise1-primary-note: #fcf9ce;
			--noise2-secondary-channel: #dd002b;
			--noise2-primary-channel: #f73d61;
			--noise2-secondary-note: #dd002b;
			--noise2-primary-note: #f73d61;
			--noise3-secondary-channel: #d0e9ea;
			--noise3-primary-channel: #f3ffff;
			--noise3-secondary-note: #d0e9ea;
			--noise3-primary-note: #f3ffff;
			--noise4-secondary-channel: #ed9b24;
			--noise4-primary-channel: #ffc941;
			--noise4-secondary-note: #ed9b24;
			--noise4-primary-note: #ffc941;
			--noise5-secondary-channel: #663b00;
			--noise5-primary-channel: #ffe9cc;
			--noise5-secondary-note: #663b00;
			--noise5-primary-note: #ffe9cc;
			--mod1-secondary-channel: #001026;
			--mod1-primary-channel: #ffab19;
			--mod1-secondary-note: #001026;
			--mod1-primary-note: #ffab19;
			--mod2-secondary-channel: #603813;
			--mod2-primary-channel: #ffc93e;
			--mod2-secondary-note: #603813;
			--mod2-primary-note: #ffc93e;
			--mod3-secondary-channel: #1b75bb;
			--mod3-primary-channel: #e6e7e8;
			--mod3-secondary-note: #1b75bb;
			--mod3-primary-note: #e6e7e8;
			--mod4-secondary-channel: #404041;
			--mod4-primary-channel: #f05a28;
			--mod4-secondary-note: #404041;
			--mod4-primary-note: #f05a28;
			--disabled-note-primary: #ff6680;
			--disabled-note-secondary: #ff3355;
		  }
		  * {
		  --play-symbol:url("./Greenflag.png"); 
		  --pause-symbol:url("./stopsign.png");
		  --stop-symbol:url("./stopsign.png");
		  }

		div.promptContainerBG {
			background-color: var(--editor-background) !important;
			backdrop-filter: unset !important;
			opacity: 0.5 !important;
		}

		  button.playButton::before {

			background-image: url("./Greenflag.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px;
			color: #fff0;
		}

		button.pauseButton::before {
			background-image: url("./stopsign.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px;
			color: #fff0;
		}

		button.stopButton::before {
 
			background-image: url("./stopsign.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px;
			color: #fff0;
		}

		  #text-content > section > h1 {
			margin: auto;
			content: url("./AbyssBox Scratch Logo3.png");
		  }
		  .beepboxEditor,
		  #beepboxEditorContainer {
			background-color: rgb(255, 255, 255) !important;
			border-radius: 6px;
			box-shadow: 0px 0px 0px 4px rgba(158, 158, 158, 0.91);
		  }
		  .beepboxEditor .loopEditor {
			--editor-background: #4d97ff40 !important;
			border-radius: 3px;
		  }
		 .beepboxEditor .muteEditor {
			--editor-background: #4d97ff40 !important;
			border-radius: 0px;
			height: 158px;
		  }
		  .beepboxEditor .pattern-area {
			--editor-background: #4d97ff40 !important;
			border-radius: 3px;
		  }
		 .beepboxEditor .trackContainer svg {
		  	--editor-background: #3100FF !important;
		  }
		  .beepboxEditor .muteEditor > :last-child {
			 --editor-background: #4d97ff40 !important;
		  }
		  .beepboxEditor #octaveScrollBarContainer {
			background-color: #4d97ff40;
		  }
		  .beepboxEditor .muteButtonText {
			transform: translate(0px, 1px) !important;
			color: #777 !important;
		  }
		  .beepboxEditor .instrument-bar {
			--text-color-lit: #fff !important;
			--text-color-dim: #4c4c4c !important;
		  }
		  .beepboxEditor .instrument-bar .selected-instrument {
			color: rgb(0, 0, 0) !important;
			text-shadow: 0px 0px 4px var(--text-color-lit);
		  }
		  .beepboxEditor .instrument-bar .deactivated {
			color: rgba(0, 0, 0, 1) !important;
			text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
		  }
		  .beepboxEditor .instrument-bar > :not(.last-button) {
			border-color: var(--background-color-lit) !important;
		  }
		  .beepboxEditor .instrument-bar .selected-instrument {
			border-color: rgba(255, 255, 255, 1) !important;
		  }
		  .beepboxEditor button, button {
			color: #fff;
			background: #3c236f;
		  }
		  .beepboxEditor .instrument-bar .selected-instrument,
		  .beepboxEditor .filterEditor svg,
		  .beepboxEditor .fadeInOut svg,
		  .beepboxEditor .harmonics svg,
		  .beepboxEditor .spectrum svg {
			background: rgb(255, 255, 255) !important;
			box-shadow:
			  0px 0px 1px 1px rgba(0, 0, 0, 0.7),
			  inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
			  inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3);
		  }
		  .beepboxEditor input[type="range"]::-webkit-slider-thumb {
			background: #000000 !important;
		  }
		  .beepboxEditor input[type="range"]::-moz-range-thumb {
			background: #000000 !important;
		  }
		  .beepboxEditor input[type="range"]::-webkit-slider-runnable-track {
			background: rgb(127, 127, 127) !important;
		  }
		  .beepboxEditor input[type="range"]::-moz-range-track {
			background: rgb(127, 127, 127) !important;
		  }
		  .beepboxEditor input[type="range"]::-webkit-slider-runnable-track::focus {
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
			  0px 0px 1px 1px rgba(0, 0, 0, 0.2),
			  inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
			  inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3);
		  }
		  .beepboxEditor input[type="range"]::-moz-range-track::focus {
			background: rgba(255, 255, 255, 0.2) !important;
			box-shadow:
			  0px 0px 1px 1px rgba(0, 0, 0, 0.2),
			  inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
			  inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3);
		  }
		  .beepboxEditor input[type="text"],
		  .beepboxEditor input[type="number"] {
			font-size: inherit !important;
			font-weight: bold !important;
			font-family: inherit !important;
			background: #ff8c1a !important;
			text-align: center !important;
			border: 1px solid var(--input-box-outline);
			color: #fff !important;
			box-shadow: 0px 0px 0px 1px rgb(134, 134, 134) !important;
		  }
		  .beepboxEditor .prompt {
			--primary-text: #fff;
			--secondary-text: #fff;
			--ui-widget-background: #351f5f;
			color: #fff !important;
			background: #855cd6 !important;
		  }
		  .beepboxEditor .trackContainer {
			--editor-background: #fff;
		  }
		  #text-content {
			color: #fff;
			background: #855cd6;
		  }
		  body:not(#secondImage) {
			background-image: url("./scratch-bg.png"); 
		  }
		  body:not(#secondImage) input {
			--primary-text: #000;
		  }
		  body:not(#secondImage) h1 {
			color: #000;
		  }
		  button.copyButton,
		  button.pasteButton,
		  button.exportInstrumentButton,
		  button.importInstrumentButton, 
		  button.addEnvelope,
		  div.editor-controls div button,
		  div.selectRow button,
		  div.effects-menu button,
		  div.effects-menu::before,
		  div.selectContainer select,
		  div.selectContainer::after,
		  span#select2-pitchPresetSelect-container {
			color: white !important;
		  }
		  div#text-content {
			padding-top: 15px;
		  }
		  div#beepboxEditorContainer{
			padding-bottom: 15px;
		  }
		  div.channelBox {
			border-radius: 5px;
		  }
		  div.curChannelBox {
			border-radius: 5px;
		  }
		   
		  div.loopEditor {
			border-radius: 0px !important;
		  }
		`,
		        "Half-Life": `
			:root { 		
			--page-margin: #0c1012; 		
			--editor-background: #0c1012; 		
			--hover-preview: white; 		
			--playhead: rgba(255, 255, 255, 0.9); 		
			--primary-text: #ffee00; 		
			--secondary-text: #ffee00; 		
			--inverted-text:  #000000;	 		
			--text-selection: rgba(119,68,255,0.99); 		
			--box-selection-fill: #ff6f00; 		
			--loop-accent: #ff6f00; 		
			--link-accent: #ff6f00; 		
			--ui-widget-background: #36454F;		
			--ui-widget-focus: #36454F; 		
			--pitch-background: #5e2103; 		
			--tonic: #ff6f00; 		
			--fifth-note: #963c00; 		
			--third-note: #b76f23;
			--white-piano-key: #ccbca5; 		
			--black-piano-key: #40382f; 		
			--use-color-formula: true; 		
			--track-editor-bg-pitch: #7d5100; 		
			--track-editor-bg-pitch-dim: #3b2c10; 		
			--track-editor-bg-noise: #730a00; 		
			--track-editor-bg-noise-dim: #360e0b; 		
			--track-editor-bg-mod: #856f00; 		
			--track-editor-bg-mod-dim: #3b3205; 		
			--multiplicative-mod-slider: #9f8460; 		
			--overwriting-mod-slider: #9e7534; 		
			--indicator-primary: #b38949; 		
			--indicator-secondary: #543d1d; 		
			--select2-opt-group: #4f3b19; 		
			--input-box-outline: #1a0b04; 		
			--mute-button-normal: #ddac5d;	 		
			--mute-button-mod: #ba3d36; 		
			--mod-label-primary: #542f16; 		
			--mod-label-secondary-text: rgb(120, 87, 86); 
			--mod-label-primary-text: gray; 
			--progress-bar: #ff6f00;

			--pitch-secondary-channel-hue: 0; 		
			--pitch-secondary-channel-hue-scale: 0; 		
			--pitch-secondary-channel-sat: 43; 		
			--pitch-secondary-channel-sat-scale: 0.1; 		
			--pitch-secondary-channel-lum: 60; 		
			--pitch-secondary-channel-lum-scale: 0.05; 
		
			--pitch-primary-channel-hue: 154; 		
			--pitch-primary-channel-hue-scale: 6.1; 		
			--pitch-primary-channel-sat: 75; 		
			--pitch-primary-channel-sat-scale: 0.1; 		
			--pitch-primary-channel-lum: 60; 		
			--pitch-primary-channel-lum-scale: 0.05; 	
	
			--pitch-secondary-note-hue: 154; 		
			--pitch-secondary-note-hue-scale: 6.1; 		
			--pitch-secondary-note-sat: 93.9; 		
			--pitch-secondary-note-sat-scale: 0.1; 		
			--pitch-secondary-note-lum: 20; 		
			--pitch-secondary-note-lum-scale: 0.05; 
		
			--pitch-primary-note-hue: 154; 		
			--pitch-primary-note-hue-scale: 6.1; 		
			--pitch-primary-note-sat: 65; 		
			--pitch-primary-note-sat-scale: 0.05; 		
			--pitch-primary-note-lum: 60; 		
			--pitch-primary-note-lum-scale: 0.05; 
		
			--noise-secondary-channel-hue: 0; 		
			--noise-secondary-channel-hue-scale: 2; 		
			--noise-secondary-channel-sat: 65; 		
			--noise-secondary-channel-sat-scale: 0; 		
			--noise-secondary-channel-lum: 60; 		
			--noise-secondary-channel-lum-scale: 0; 
		
			--noise-primary-channel-hue: 0; 		
			--noise-primary-channel-hue-scale: 1; 		
			--noise-primary-channel-sat: 100; 		
			--noise-primary-channel-sat-scale: 1; 		
			--noise-primary-channel-lum: 63.5; 		
			--noise-primary-channel-lum-scale: 0; 
		
			--noise-secondary-note-hue: 24; 		
			--noise-secondary-note-hue-scale: 2; 		
			--noise-secondary-note-sat: 100; 		
			--noise-secondary-note-sat-scale: 0; 		
			--noise-secondary-note-lum: 25; 		
			--noise-secondary-note-lum-scale: 0; 	
	
			--noise-primary-note-hue: 24; 		
			--noise-primary-note-hue-scale: 2; 		
			--noise-primary-note-sat: 75; 		
			--noise-primary-note-sat-scale: 1; 		
			--noise-primary-note-lum: 60; 		
			--noise-primary-note-lum-scale: 1; 	
	
			--mod-secondary-channel-hue: 55; 		
			--mod-secondary-channel-hue-scale: 1.5; 		
			--mod-secondary-channel-sat: 100; 		
			--mod-secondary-channel-sat-scale: 0; 		
			--mod-secondary-channel-lum: 20; 		
			--mod-secondary-channel-lum-scale: 0; 
		
			--mod-primary-channel-hue: 55; 		
			--mod-primary-channel-hue-scale: 1.5; 		
			--mod-primary-channel-sat: 96; 		
			--mod-primary-channel-sat-scale: 0; 		
			--mod-primary-channel-lum: 50; 		
			--mod-primary-channel-lum-scale: 0; 
		
			--mod-secondary-note-hue: 55; 		
			--mod-secondary-note-hue-scale: 1.5; 		
			--mod-secondary-note-sat: 92; 		
			--mod-secondary-note-sat-scale: 0; 		
			--mod-secondary-note-lum: 45; 		
			--mod-secondary-note-lum-scale: 0; 
		
			--mod-primary-note-hue: 55; 		
			--mod-primary-note-hue-scale: 1.5; 		
			--mod-primary-note-sat: 96; 		
			--mod-primary-note-sat-scale: 0; 		
			--mod-primary-note-lum: 85; 		
			--mod-primary-note-lum-scale: 0; 
			--note-flash: #ffffff;
			--note-flash-secondary: #ffffff77;	
				}
		/* replaces hotdog (in a hacky way) with an image of gordon freeman but really wide*/
		#Hotdog {
		display: none;
		}
		.instructions-column > section:first-of-type > p:first-of-type:after {
		display: block;
		content: url("./wide-gordon.png");
		width: inherit;
		height: contain;
		text-align: center;
		margin-top: 25px;
		}
		/* sets background image */
		body {
		background-image: url("./lambda.png") !important;
		background-size: cover !important;
		background-position: center !important;
		background-repeat: no-repeat !important;
			}
			/* make editor background transparent */
		#beepboxEditorContainer, .beepboxEditor, #text-content {
		}

			@font-face {
		   font-family: "trebuc";
		   src:
 		   url("./trebuc.otf") format("opentype") tech(color-COLRv1),
			}

			html {
 		   font-family: 'trebuc';
			}
			div.channelBoxLabel {
				font-family: 'trebuc' !important;
			}

			#modTitle::before {
				content: "λbyssBox" !important;
			}

			`,
			        "Frutiger Aero": `
			:root {		
			--page-margin: #fff; 		
			--editor-background: #2e538c;		
			--hover-preview: white; 		
			--playhead: rgba(255, 255, 255, 0.9); 		
			--primary-text: white; 		
			--secondary-text: #ceddff;		
			--inverted-text: white;	 		
			--text-selection: rgba(119,68,255,0.99); 		
			--box-selection-fill: #0a091e; 		
			--loop-accent: #6fafe8; 		
			--link-accent: #a2b0ff; 		
			--ui-widget-background: #84aef0; 		
			--ui-widget-focus: #2b5376; 		
			--pitch-background: #4671b5; 		
			--tonic: #fff; 		
			--fifth-note: #620297; 
			--third-note: #bf2c78;		
			--white-piano-key: #dbe5ec;		
			--black-piano-key: #2f3a40;
			--white-piano-key-text: #131200;		
			--black-piano-key-text: #fff;					
			--use-color-formula: true; 		
			--track-editor-bg-pitch: linear-gradient(rgba(39, 130, 176, 1),rgba(12, 43, 62, 1)); 		
			--track-editor-bg-pitch-dim: linear-gradient(rgba(12, 43, 62, 0.43),rgba(5, 21, 31, 0.76)); 		
			--track-editor-bg-noise: linear-gradient(rgba(45, 74, 161, 1),rgba(8, 32, 79, 1)); 		
			--track-editor-bg-noise-dim: linear-gradient(rgba(8, 32, 79, 0.43), rgba(3, 16, 41, 0.78)); 		
			--track-editor-bg-mod: linear-gradient(rgba(70, 41, 158, 1), rgba(38, 20, 94, 1)); 		
			--track-editor-bg-mod-dim: linear-gradient(rgba(38, 20, 94, 0.43),rgba(17, 6, 48, 0.76)); 		
			--multiplicative-mod-slider: #60769f; 		
			--overwriting-mod-slider: #343b9e; 		
			--indicator-primary: #499ab3; 		
			--indicator-secondary: #9db9c4; 		
			--select2-opt-group: #185f8a; 		
			--input-box-outline: #18041a; 		
			--mute-button-normal: #97d4f9; 		
			--mute-button-mod: #8a5fff;		
			--mod-label-primary: #341a7b; 		
			--mod-label-secondary-text: rgb(86, 93, 120);
			--mod-label-primary-text: gray; 
			--progress-bar: #84aef0;
			--empty-sample-bar: #26477a;

			--pitch-secondary-channel-hue: 110; 		
			--pitch-secondary-channel-hue-scale: 0; 		
			--pitch-secondary-channel-sat: 63; 		
			--pitch-secondary-channel-sat-scale: 0.1; 		
			--pitch-secondary-channel-lum: 50; 		
			--pitch-secondary-channel-lum-scale: 0.05; 
		
			--pitch-primary-channel-hue: 120; 		
			--pitch-primary-channel-hue-scale: 6.1; 		
			--pitch-primary-channel-sat: 75; 		
			--pitch-primary-channel-sat-scale: 0.1; 		
			--pitch-primary-channel-lum: 67.5; 		
			--pitch-primary-channel-lum-scale: 0.05; 	
	
			--pitch-secondary-note-hue: 110; 		
			--pitch-secondary-note-hue-scale: 6.1; 		
			--pitch-secondary-note-sat: 63.9; 		
			--pitch-secondary-note-sat-scale: 0.1; 		
			--pitch-secondary-note-lum: 55; 		
			--pitch-secondary-note-lum-scale: 0.05; 
		
			--pitch-primary-note-hue: 120; 		
			--pitch-primary-note-hue-scale: 6.1; 		
			--pitch-primary-note-sat: 100; 		
			--pitch-primary-note-sat-scale: 0.05; 		
			--pitch-primary-note-lum: 85.6; 		
			--pitch-primary-note-lum-scale: 0.025; 
		
			--noise-secondary-channel-hue: 90; 		
			--noise-secondary-channel-hue-scale: 2; 		
			--noise-secondary-channel-sat: 65; 		
			--noise-secondary-channel-sat-scale: 0; 		
			--noise-secondary-channel-lum: 42; 		
			--noise-secondary-channel-lum-scale: 0; 
		
			--noise-primary-channel-hue: 80; 		
			--noise-primary-channel-hue-scale: 1; 		
			--noise-primary-channel-sat: 100; 		
			--noise-primary-channel-sat-scale: 1; 		
			--noise-primary-channel-lum: 63.5; 		
			--noise-primary-channel-lum-scale: 0; 
		
			--noise-secondary-note-hue: 90; 		
			--noise-secondary-note-hue-scale: 2; 		
			--noise-secondary-note-sat: 60; 		
			--noise-secondary-note-sat-scale: 0; 		
			--noise-secondary-note-lum: 35; 		
			--noise-secondary-note-lum-scale: 0; 	
	
			--noise-primary-note-hue: 80; 		
			--noise-primary-note-hue-scale: 2; 		
			--noise-primary-note-sat: 100; 		
			--noise-primary-note-sat-scale: 1; 		
			--noise-primary-note-lum: 60; 		
			--noise-primary-note-lum-scale: 1; 	
	
			--mod-secondary-channel-hue: 55; 		
			--mod-secondary-channel-hue-scale: 1.5; 		
			--mod-secondary-channel-sat: 100; 		
			--mod-secondary-channel-sat-scale: 0; 		
			--mod-secondary-channel-lum: 20; 		
			--mod-secondary-channel-lum-scale: 0; 
		
			--mod-primary-channel-hue: 55; 		
			--mod-primary-channel-hue-scale: 1.5; 		
			--mod-primary-channel-sat: 96; 		
			--mod-primary-channel-sat-scale: 0; 		
			--mod-primary-channel-lum: 50; 		
			--mod-primary-channel-lum-scale: 0; 
		
			--mod-secondary-note-hue: 55; 		
			--mod-secondary-note-hue-scale: 1.5; 		
			--mod-secondary-note-sat: 62; 		
			--mod-secondary-note-sat-scale: 0; 		
			--mod-secondary-note-lum: 45; 		
			--mod-secondary-note-lum-scale: 0; 
		
			--mod-primary-note-hue: 55; 		
			--mod-primary-note-hue-scale: 1.5; 		
			--mod-primary-note-sat: 96; 		
			--mod-primary-note-sat-scale: 0; 		
			--mod-primary-note-lum: 85; 		
			--mod-primary-note-lum-scale: 0; 	

			--note-flash: #ffffff;
			--note-flash-secondary: #ffffff77;
			--sample-failed: #bf2c78;

		}
		div.promptContainerBG {
			background-color: var(--editor-background) !important;
			backdrop-filter: unset !important;
			opacity: 0 !important;
		} 

		div.mute-button::before {
			background: #fff0 !important;
			background-image: url("./vistaSpeakerIcon.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px !important;
			color: #fff0;

			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		div.mute-button.muted::before {
			background: #fff0 !important;
			background-image: url("./vistaSpeakerIconMuted.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px !important;
			color: #fff0;

			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		#text-content > section > h1 > font {
			display: none;
			}
			#text-content > section > h1 {
			margin: auto;
			content: url("./AbyssBoxFrutigerAeroThemeLogo.png");
			}

		button.mobileEffectsButton.deactivated {
		box-shadow: none !important;
		}

		button.mobileInstButton.deactivated {
		box-shadow: none !important;
		}

		button.mobileEnvelopesButton.deactivated {
		box-shadow: none !important;
		}

		select.trackSelectBox {
			border-image: none !important;
		}

			@font-face {
		   font-family: "Frutiger";
		   src:
 		   url("./FrutigerLight.ttf") format("truetype") tech(color-COLRv1),
			}

			canvas#oscilascopeAll {
				background: #2e538c !important; 
				border: 2px solid rgba(132, 174, 240, 0) !important;
			}

			.beepboxEditor .play-pause-area div:last-child {
				position: relative;
				width: 144px;
				height: 32px;
			  }
			  .beepboxEditor .play-pause-area div:last-child::before {
				content: "";
				display: block;
				width: calc(144px + 4px);
				height: calc(32px + 4px);
				box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.5), inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5), inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3);
				position: absolute;
				z-index: 1;
			  }

			div.prompt.noSelection{
				background: linear-gradient(rgba(132, 174, 240, 0.5), rgba(42, 61, 106, 0.5)) !important; 
				opacity: 55;
				backdrop-filter: blur(14px);
			}  

			svg#firstImage {
				opacity: 50%;
				--editor-background: #84aef0;
			}

			body {
			background-image: url("./frutigerbg3.jpg") !important;
			background-position: top;
			background-attachment: fixed;
			background-repeat: no-repeat;
			background-size: cover;
			image-rendering: optimizeQuality !important;
			}

			#beepboxEditorContainer {
				background: linear-gradient(rgba(238, 243, 255, 0.5), rgba(57, 94, 179, 0.5)) !important;
				border-style: solid;
  				border-color: lightblue;
				padding-bottom: 5px;
				backdrop-filter: blur(8px);
				box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
				--inverted-text: black;
			}
			#text-content {
				background: linear-gradient(#395eb380, #03112f80);
				border-style: solid;
  				border-color: lightblue;
				  backdrop-filter: blur(14px);
				  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
			}

				div.playback-bar-controls button.playButton, 
				div.playback-bar-controls button.pauseButton, 
				div.playback-bar-controls button.recordButton, 
				div.playback-bar-controls button.stopButton, 
				div.playback-bar-controls button.prevBarButton, 
				div.playback-bar-controls button.nextBarButton, 
				div.selectRow button.copyButton, 
				div.selectRow button.pasteButton, 
				div.editor-controls button.exportInstrumentButton, 
				div.editor-controls button.importInstrumentButton,
				div.editor-controls div button.add-envelope,
				div.editor-controls div button.delete-envelope, 
				.beepboxEditor .select2-selection__rendered,
				.beepboxEditor .instrument-bar button,
				.beepboxEditor .eq-filter-type-bar button .deactivated,
				.beepboxEditor .note-filter-type-bar button .deactivated,
				.beepboxEditor select  { 
					box-shadow: 0px 1px 3px 0px rgb(0, 0, 0), inset 0px -12px 14px 0px rgba(0, 0, 0, 0.3), inset 0px -7px 4px 0px rgba(79, 99, 204, 0.71), inset 0px -15px 0px 0px rgba(0, 0, 0, 0.2), inset 0px 1px 2px 1px #ffffff54;
					--ui-widget-background: linear-gradient(rgba(182, 207, 255, 0.8), rgba(98, 142, 242, 0.8)) !important;
				}

				.beepboxEditor select:focus
				{
					border-image-source: none;
					--ui-widget-background: linear-gradient(#2a3d6a, #2a3d6a) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px 10px 20px 1px rgba(0, 0, 0, 0.4),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}

				.beepboxEditor button, button
				{
					--ui-widget-background: linear-gradient(#84aef0, #2a3d6a) !important;
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				.beepboxEditor .select2-container--open .select2-selection__rendered,
				.beepboxEditor button:focus,
				button:focus,
				.beepboxEditor .instrument-bar .selected-instrument,
				.beepboxEditor .eq-filter-type-bar button:not(.deactivated),
				.beepboxEditor .note-filter-type-bar button:not(.deactivated)
				{
					--ui-widget-background: linear-gradient(#333, #444) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor .filterEditor svg,
				.beepboxEditor .fadeInOut svg,
				.beepboxEditor .harmonics svg,
				.beepboxEditor .spectrum svg
				{
					background: rgba(0, 0, 0, 0.3) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-thumb
				{
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-ms-thumb
				{
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-ms-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-ms-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-thumb
				{
					height: 16px !important;
					width: 16px !important;
					border-radius: 40px !important;
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-moz-range-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="text"],
				.beepboxEditor input[type="number"]
				{
					border: none !important;
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="checkbox"]
				{
					appearance: none;
					background: rgba(0, 0, 0, 0.3);
					color: currentColor;
					border-radius: 1px;
					width: 1em !important;
					height: 1em !important;
					box-shadow:
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked
				{
					display: flex;
					justify-content: center;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					width: 1em;
					height: 1em;
					text-align: center;
					font-size: 0.8em;
					content: "✓";
					color: currentColor;
					text-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5);
				}

			html {
 		   	font-family: 'Frutiger';
			}

			div.channelBoxLabel {
				font-family: 'Frutiger' !important;
			}

		   div.beepboxEditor.load {
			background: none !important;
		   }

		   div.noSelection {
			background: none !important;
		   }

		   .beepboxEditor .loopEditor {
			background: none !important;
		   }

		   .beepboxEditor .muteEditor {
			background: linear-gradient(#c4f0d1, #83c139) !important;
			border-radius: 5px;
			box-shadow: 0px 1px 1px 0px rgb(0, 0, 0), inset 0px 3px 14px 0px rgba(0, 0, 0, 0.1), inset 0px -4px 0px 0px rgba(0, 0, 0, 0.1);
			opacity: 65%;
		   }

		   div.muteEditor div {
			background: none !important;
			--track-editor-bg-pitch: #1b4079;
			--track-editor-bg-noise: #213779;
			--track-editor-bg-mod: #46299e;
	
			--track-editor-bg-pitch-dim: #0c2b3e; 		
			--track-editor-bg-noise-dim: #08204f; 			
			--track-editor-bg-mod-dim: #26145e; 

		   }

		   div.channelBox {
			border-radius: 5px;
		  }
		  div.curChannelBox {
			border-radius: 5px;
		  }

			`,
        "Frutiger Aero Night": `
			:root {		
			--page-margin: #26032b; 		
			--editor-background: #290f37;		
			--hover-preview: white; 		
			--playhead: rgba(255, 255, 255, 0.9); 		
			--primary-text: white; 		
			--secondary-text: #d7ceff;		
			--inverted-text: #140111;	 		
			--text-selection: rgba(119,68,255,0.99); 		
			--box-selection-fill: #0a091e; 		
			--loop-accent: #ab6fe8; 		
			--link-accent: #eba2ff; 		
			--ui-widget-background: #c03ed2; 		
			--ui-widget-focus: #582b76; 		
			--pitch-background: #26032b; 		
			--tonic: #8d46b5; 		
			--fifth-note: #0e0297; 
			--third-note: #bf2c78;		
			--white-piano-key: #dbe5ec;		
			--black-piano-key: #2f3a40;
			--white-piano-key-text: #131200;		
			--black-piano-key-text: #fff;					
			--use-color-formula: true; 		
			--track-editor-bg-pitch: linear-gradient(rgba(114, 39, 176, 1),rgba(44, 12, 62, 1)); 		
			--track-editor-bg-pitch-dim: linear-gradient(rgba(38, 12, 62, 0.4392156862745098),rgba(22, 5, 31, 0.7686274509803922)); 		
			--track-editor-bg-noise: linear-gradient(rgba(147, 45, 161, 1),rgba(71, 8, 79, 1)); 		
			--track-editor-bg-noise-dim: linear-gradient(rgba(67, 8, 79, 0.4392156862745098), rgba(38, 3, 41, 0.7686274509803922)); 		
			--track-editor-bg-mod: linear-gradient(rgba(158, 41, 80, 1), rgba(94, 20, 61, 1)); 		
			--track-editor-bg-mod-dim: linear-gradient(rgba(94, 20, 63, 0.4392156862745098),rgba(48, 6, 22, 0.7686274509803922)); 			
			--multiplicative-mod-slider: #60769f; 		
			--overwriting-mod-slider: #7d349e; 		
			--indicator-primary: #9149b3; 		
			--indicator-secondary: #b39dc4; 		
			--select2-opt-group: #185f8a; 		
			--input-box-outline: #18041a; 		
			--mute-button-normal: #c597f9; 		
			--mute-button-mod: #da5fff;		
			--mod-label-primary: #6b1a7b; 		
			--mod-label-secondary-text: rgb(86, 93, 120);
			--mod-label-primary-text: gray; 
			--progress-bar: #ec84f0;
			--empty-sample-bar: #1d092f;

			--pitch-secondary-channel-hue: 110; 		
			--pitch-secondary-channel-hue-scale: 0; 		
			--pitch-secondary-channel-sat: 63; 		
			--pitch-secondary-channel-sat-scale: 0.1; 		
			--pitch-secondary-channel-lum: 50; 		
			--pitch-secondary-channel-lum-scale: 0.05; 
		
			--pitch-primary-channel-hue: 120; 		
			--pitch-primary-channel-hue-scale: 6.1; 		
			--pitch-primary-channel-sat: 75; 		
			--pitch-primary-channel-sat-scale: 0.1; 		
			--pitch-primary-channel-lum: 67.5; 		
			--pitch-primary-channel-lum-scale: 0.05; 	
	
			--pitch-secondary-note-hue: 110; 		
			--pitch-secondary-note-hue-scale: 6.1; 		
			--pitch-secondary-note-sat: 63.9; 		
			--pitch-secondary-note-sat-scale: 0.1; 		
			--pitch-secondary-note-lum: 55; 		
			--pitch-secondary-note-lum-scale: 0.05; 
		
			--pitch-primary-note-hue: 120; 		
			--pitch-primary-note-hue-scale: 6.1; 		
			--pitch-primary-note-sat: 100; 		
			--pitch-primary-note-sat-scale: 0.05; 		
			--pitch-primary-note-lum: 85.6; 		
			--pitch-primary-note-lum-scale: 0.025; 
		
			--noise-secondary-channel-hue: 90; 		
			--noise-secondary-channel-hue-scale: 2; 		
			--noise-secondary-channel-sat: 65; 		
			--noise-secondary-channel-sat-scale: 0; 		
			--noise-secondary-channel-lum: 42; 		
			--noise-secondary-channel-lum-scale: 0; 
		
			--noise-primary-channel-hue: 80; 		
			--noise-primary-channel-hue-scale: 1; 		
			--noise-primary-channel-sat: 100; 		
			--noise-primary-channel-sat-scale: 1; 		
			--noise-primary-channel-lum: 63.5; 		
			--noise-primary-channel-lum-scale: 0; 
		
			--noise-secondary-note-hue: 90; 		
			--noise-secondary-note-hue-scale: 2; 		
			--noise-secondary-note-sat: 60; 		
			--noise-secondary-note-sat-scale: 0; 		
			--noise-secondary-note-lum: 35; 		
			--noise-secondary-note-lum-scale: 0; 	
	
			--noise-primary-note-hue: 80; 		
			--noise-primary-note-hue-scale: 2; 		
			--noise-primary-note-sat: 100; 		
			--noise-primary-note-sat-scale: 1; 		
			--noise-primary-note-lum: 60; 		
			--noise-primary-note-lum-scale: 1; 	
	
			--mod-secondary-channel-hue: 55; 		
			--mod-secondary-channel-hue-scale: 1.5; 		
			--mod-secondary-channel-sat: 100; 		
			--mod-secondary-channel-sat-scale: 0; 		
			--mod-secondary-channel-lum: 20; 		
			--mod-secondary-channel-lum-scale: 0; 
		
			--mod-primary-channel-hue: 55; 		
			--mod-primary-channel-hue-scale: 1.5; 		
			--mod-primary-channel-sat: 96; 		
			--mod-primary-channel-sat-scale: 0; 		
			--mod-primary-channel-lum: 50; 		
			--mod-primary-channel-lum-scale: 0; 
		
			--mod-secondary-note-hue: 55; 		
			--mod-secondary-note-hue-scale: 1.5; 		
			--mod-secondary-note-sat: 62; 		
			--mod-secondary-note-sat-scale: 0; 		
			--mod-secondary-note-lum: 45; 		
			--mod-secondary-note-lum-scale: 0; 
		
			--mod-primary-note-hue: 55; 		
			--mod-primary-note-hue-scale: 1.5; 		
			--mod-primary-note-sat: 96; 		
			--mod-primary-note-sat-scale: 0; 		
			--mod-primary-note-lum: 85; 		
			--mod-primary-note-lum-scale: 0; 	

			--note-flash: #ffffff;
			--note-flash-secondary: #ffffff77;
			--sample-failed: #bf2c78;

		}

		* {
		/*cursor: url("abyssbox_cursor.png"), auto !important;*/
		--muted-symbol: url("./vistaSpeakerIconMuted.png");
		--unmuted-symbol: url("./vistaSpeakerIcon.png");
		}
	

		/* Frutiger Aero Icons */

		div.promptContainerBG {
			background-color: var(--editor-background) !important;
			backdrop-filter: unset !important;
			opacity: 0 !important;
		}

		div.mute-button::before {
			background: #fff0 !important;
			background-image: url("./vistaSpeakerIcon.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px !important;
			color: #fff0;

			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important; 
		}

		div.mute-button.muted::before {
			background: #fff0 !important;
			background-image: url("./vistaSpeakerIconMuted.png") !important;
			background-size: 18px !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			mask-size: 800px !important;
			color: #fff0;

			image-rendering: -moz-crisp-edges !important;         /* Firefox */
			image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
			image-rendering: -o-crisp-edges !important;            /* Opera */
			image-rendering: pixelated !important;                 /* Future browsers */
			image-rendering: optimizeSpeed !important;             /* IE */
		}

		#text-content > section > h1 > font {
			display: none;
			}
			#text-content > section > h1 {
			margin: auto;
			content: url("./AbyssBoxFrutigerAeroThemeLogo.png");
			}

		button.mobileEffectsButton.deactivated {
		box-shadow: none !important;
		}

		button.mobileInstButton.deactivated {
		box-shadow: none !important;
		}

		button.mobileEnvelopesButton.deactivated {
		box-shadow: none !important;
		}

		select.trackSelectBox {
			border-image: none !important;
		}

			@font-face {
		   font-family: "Frutiger";
		   src:
 		   url("./FrutigerLight.ttf") format("truetype") tech(color-COLRv1),
			}

			canvas#oscilascopeAll {
				background: #2e538c !important; 
				border: 2px solid #84aef000 !important;
			}

			.beepboxEditor .play-pause-area div:last-child {
				position: relative;
				width: 144px;
				height: 32px;
			  }
			  .beepboxEditor .play-pause-area div:last-child::before {
				content: "";
				display: block;
				width: calc(144px + 4px);
				height: calc(32px + 4px);
				box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.5), inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5), inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3);
				position: absolute;
				z-index: 1;
			  }

			div.prompt.noSelection{
				background: linear-gradient(#84aef080, #2a3d6a80) !important; 
				opacity: 77;
				backdrop-filter: blur(14px);
			}  

			svg#firstImage {
				opacity: 50%;
				--editor-background: #000000;
			}


			body {
			background-image: url("./frutigerbg3.png") !important;
			background-position: top;
			background-attachment: fixed;
			background-repeat: no-repeat;
			background-size: 145%;
			image-rendering: optimizeQuality !important;
				}

			#beepboxEditorContainer {
				background: linear-gradient(rgba(245, 171, 251, 0.5019607843137255), rgba(72, 57, 179, 0.5019607843137255)) !important;
				border-style: solid;
  				border-color: #050428;
				padding-bottom: 5px;
				--inverted-text: black;
				backdrop-filter: blur(14px);
				box-shadow: inset 0 0 2000px rgba(0, 0, 0, 0.5)
			}
			#text-content {
				background: linear-gradient(rgba(72, 57, 179, 0.5019607843137255), rgba(34, 3, 47, 0.5019607843137255));
				border-style: solid;
  				border-color: #050428;
				  backdrop-filter: blur(14px);
				  box-shadow: inset 0 0 2000px rgba(0, 0, 0, 0.5)
			}

				div.playback-bar-controls button.playButton, 
				div.playback-bar-controls button.pauseButton, 
				div.playback-bar-controls button.recordButton, 
				div.playback-bar-controls button.stopButton, 
				div.playback-bar-controls button.prevBarButton, 
				div.playback-bar-controls button.nextBarButton, 
				div.selectRow button.copyButton, 
				div.selectRow button.pasteButton, 
				div.editor-controls button.exportInstrumentButton, 
				div.editor-controls button.importInstrumentButton,
				div.editor-controls div button.add-envelope,
				div.editor-controls div button.delete-envelope, 
				.beepboxEditor .select2-selection__rendered,
				.beepboxEditor .instrument-bar button,
				.beepboxEditor .eq-filter-type-bar button .deactivated,
				.beepboxEditor .note-filter-type-bar button .deactivated,
				.beepboxEditor select  { 
					box-shadow: 0px 1px 3px 0px rgb(0, 0, 0), inset 0px -12px 14px 0px rgba(0, 0, 0, 0.3), inset 0px -7px 4px 0px rgba(140, 47, 202, 0.71), inset 0px -15px 0px 0px rgba(0, 0, 0, 0.2), inset 0px 1px 2px 1px #ffffff54;
					--ui-widget-background: linear-gradient(rgba(219, 122, 238, 0.8), rgba(143, 98, 242, 0.8)) !important;
				}

				.beepboxEditor select:focus
				{
					border-image-source: none;
					--ui-widget-background: linear-gradient(#db7aeecc, #8f62f2cc) !important;
					box-shadow: 0px 1px 3px 0px rgb(0, 0, 0), inset 0px -12px 14px 0px rgba(0, 0, 0, 0.3), inset 0px -7px 4px 0px rgba(140, 47, 202, 0.71), inset 0px -15px 0px 0px rgba(0, 0, 0, 0.2), inset 0px 1px 2px 1px rgba(255, 255, 255, 0.32941176470588235)
				}

				.beepboxEditor button, button
				{
					--ui-widget-background: linear-gradient(#db7aeecc, #8f62f2cc) !important;
					box-shadow: 0px 1px 3px 0px rgb(0, 0, 0), inset 0px -12px 14px 0px rgba(0, 0, 0, 0.3), inset 0px -7px 4px 0px rgba(140, 47, 202, 0.71), inset 0px -15px 0px 0px rgba(0, 0, 0, 0.2), inset 0px 1px 2px 1px rgba(255, 255, 255, 0.32941176470588235)
				}
				.beepboxEditor .select2-container--open .select2-selection__rendered,
				.beepboxEditor button:focus,
				button:focus,
				.beepboxEditor .instrument-bar .selected-instrument,
				.beepboxEditor .eq-filter-type-bar button:not(.deactivated),
				.beepboxEditor .note-filter-type-bar button:not(.deactivated)
				{
					--ui-widget-background: linear-gradient(#333, #444) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor .filterEditor svg,
				.beepboxEditor .fadeInOut svg,
				.beepboxEditor .harmonics svg,
				.beepboxEditor .spectrum svg
				{
					background: rgba(0, 0, 0, 0.3) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-thumb
				{
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-ms-thumb
				{
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-ms-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-ms-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-thumb
				{
					height: 16px !important;
					width: 16px !important;
					border-radius: 40px !important;
					box-shadow:
						0px 2px 2px 1px rgba(0, 0, 0, 0.4),
						0px 0px 1px 1px rgba(0, 0, 0, 0.7),
						inset 0px 1px 0px 0px rgba(255, 255, 255, 1),
						inset 0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px -8px 3px rgba(0, 0, 0, 0.2)
					;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-track
				{
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
					border-radius: 4px;
				}
				 
				.beepboxEditor input[type="range"]:focus::-moz-range-track
				{
					background: rgba(255, 255, 255, 0.2) !important;
					box-shadow:
						0px 0px 1px 1px rgba(0, 0, 0, 0.2),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="text"],
				.beepboxEditor input[type="number"]
				{
					border: none !important;
					background: rgba(0, 0, 0, 0.2) !important;
					box-shadow:
						0px -1px 1px 0px rgba(0, 0, 0, 0.5),
						inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="checkbox"]
				{
					appearance: none;
					background: rgba(0, 0, 0, 0.3);
					color: currentColor;
					border-radius: 1px;
					width: 1em !important;
					height: 1em !important;
					box-shadow:
						inset 0px 2px 3px 0px rgba(0, 0, 0, 0.7),
						inset 0px -1px 0px 0px rgba(255, 255, 255, 0.3)
					;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked
				{
					display: flex;
					justify-content: center;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					width: 1em;
					height: 1em;
					text-align: center;
					font-size: 0.8em;
					content: "✓";
					color: currentColor;
					text-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5);
				}

			html {
 		   	font-family: 'Frutiger';
			}

			div.channelBoxLabel {
				font-family: 'Frutiger' !important;
			}


		   div.beepboxEditor.load {
			background: none !important;
		   }

		   div.noSelection {
			background: none !important;
		   }

		   .beepboxEditor .loopEditor {
			background: none !important;
		   }

		   .beepboxEditor .muteEditor {
			background: linear-gradient(rgba(154, 118, 170, 1), rgba(61, 36, 72, 1)) !important;
			border-radius: 5px;
			box-shadow: 0px 1px 1px 0px rgb(0, 0, 0), inset 0px 3px 14px 0px rgba(0, 0, 0, 0.1), inset 0px -4px 0px 0px rgba(0, 0, 0, 0.1);
			opacity: 65%;
		   }

		   div.muteEditor div {
			background: none !important;
			--track-editor-bg-pitch: #5f8fd6;
			--track-editor-bg-noise: #5f8fd6;
			--track-editor-bg-mod: #8a76c5;
	
			--track-editor-bg-pitch-dim: #2472a1; 		
			--track-editor-bg-noise-dim: #2472a1; 			
			--track-editor-bg-mod-dim: #4222a0; 

		   }

		   div.channelBox {
			border-radius: 5px;
		  }
		  div.curChannelBox {
			border-radius: 5px;
		  }

			`,
			        "Doom 1993": `
			:root { 		
			--page-margin: #470000; 		
			--editor-background: #470000; 		
			--hover-preview: white; 		
			--playhead: rgba(255, 255, 255, 0.9); 		
			--primary-text: #ffffff; 		
			--secondary-text: #ffffff; 		
			--inverted-text:  #000000;	 		
			--text-selection: rgba(119,68,255,0.99); 		
			--box-selection-fill: #ff6f00; 		
			--loop-accent: #ff0000; 		
			--link-accent: #962727; 		
			--ui-widget-background: #4f3b36;		
			--ui-widget-focus: #4f3b36; 		
			--pitch-background: #7d0000; 		
			--tonic: #ff0000; 		
			--fifth-note: #962727; 	
			--third-note: #d2192a;	
			--white-piano-key: #ccbca5; 		
			--black-piano-key: #40382f; 		
			--use-color-formula: true; 		
			--track-editor-bg-pitch: #7d1f00; 		
			--track-editor-bg-pitch-dim: #401000; 		
			--track-editor-bg-noise: #7d0000; 		
			--track-editor-bg-noise-dim: #400000; 		
			--track-editor-bg-mod: #7d0028; 		
			--track-editor-bg-mod-dim: #470017; 		
			--multiplicative-mod-slider: #9f8460; 		
			--overwriting-mod-slider: #9f6460; 		
			--indicator-primary: #b38949; 		
			--indicator-secondary: #543d1d; 		
			--select2-opt-group: #4f3b19; 		
			--input-box-outline: #1a0404; 		
			--mute-button-normal: #dd5d5d;	 		
			--mute-button-mod: #ba3d36; 		
			--mod-label-primary: #541616; 		
			--mod-label-secondary-text: rgb(120, 87, 86); 
			--mod-label-primary-text: gray; 
			--progress-bar: #ff0000;

			--pitch-secondary-channel-hue: 0; 		
			--pitch-secondary-channel-hue-scale: 0; 		
			--pitch-secondary-channel-sat: 43; 		
			--pitch-secondary-channel-sat-scale: 0.1; 		
			--pitch-secondary-channel-lum: 60; 		
			--pitch-secondary-channel-lum-scale: 0.05; 
		
			--pitch-primary-channel-hue: -4; 		
			--pitch-primary-channel-hue-scale: 6.1; 		
			--pitch-primary-channel-sat: 75; 		
			--pitch-primary-channel-sat-scale: 0.1; 		
			--pitch-primary-channel-lum: 60; 		
			--pitch-primary-channel-lum-scale: 0.05; 	
	
			--pitch-secondary-note-hue: -4; 		
			--pitch-secondary-note-hue-scale: 6.1; 		
			--pitch-secondary-note-sat: 93.9; 		
			--pitch-secondary-note-sat-scale: 0.1; 		
			--pitch-secondary-note-lum: 20; 		
			--pitch-secondary-note-lum-scale: 0.05; 
		
			--pitch-primary-note-hue: -4; 		
			--pitch-primary-note-hue-scale: 6.1; 		
			--pitch-primary-note-sat: 65; 		
			--pitch-primary-note-sat-scale: 0.05; 		
			--pitch-primary-note-lum: 60; 		
			--pitch-primary-note-lum-scale: 0.05; 
		
			--noise-secondary-channel-hue: 0; 		
			--noise-secondary-channel-hue-scale: 2; 		
			--noise-secondary-channel-sat: 65; 		
			--noise-secondary-channel-sat-scale: 0; 		
			--noise-secondary-channel-lum: 60; 		
			--noise-secondary-channel-lum-scale: 0; 
		
			--noise-primary-channel-hue: 0; 		
			--noise-primary-channel-hue-scale: 1; 		
			--noise-primary-channel-sat: 100; 		
			--noise-primary-channel-sat-scale: 1; 		
			--noise-primary-channel-lum: 63.5; 		
			--noise-primary-channel-lum-scale: 0; 
		
			--noise-secondary-note-hue: 24; 		
			--noise-secondary-note-hue-scale: 2; 		
			--noise-secondary-note-sat: 100; 		
			--noise-secondary-note-sat-scale: 0; 		
			--noise-secondary-note-lum: 25; 		
			--noise-secondary-note-lum-scale: 0; 	
	
			--noise-primary-note-hue: 24; 		
			--noise-primary-note-hue-scale: 2; 		
			--noise-primary-note-sat: 75; 		
			--noise-primary-note-sat-scale: 1; 		
			--noise-primary-note-lum: 60; 		
			--noise-primary-note-lum-scale: 1; 	
	
			--mod-secondary-channel-hue: 55; 		
			--mod-secondary-channel-hue-scale: 1.5; 		
			--mod-secondary-channel-sat: 100; 		
			--mod-secondary-channel-sat-scale: 0; 		
			--mod-secondary-channel-lum: 20; 		
			--mod-secondary-channel-lum-scale: 0; 
		
			--mod-primary-channel-hue: 55; 		
			--mod-primary-channel-hue-scale: 1.5; 		
			--mod-primary-channel-sat: 96; 		
			--mod-primary-channel-sat-scale: 0; 		
			--mod-primary-channel-lum: 50; 		
			--mod-primary-channel-lum-scale: 0; 
		
			--mod-secondary-note-hue: 55; 		
			--mod-secondary-note-hue-scale: 1.5; 		
			--mod-secondary-note-sat: 92; 		
			--mod-secondary-note-sat-scale: 0; 		
			--mod-secondary-note-lum: 45; 		
			--mod-secondary-note-lum-scale: 0; 
		
			--mod-primary-note-hue: 55; 		
			--mod-primary-note-hue-scale: 1.5; 		
			--mod-primary-note-sat: 96; 		
			--mod-primary-note-sat-scale: 0; 		
			--mod-primary-note-lum: 85; 		
			--mod-primary-note-lum-scale: 0; 
			
			--note-flash: #ffffff;
			--note-flash-secondary: #ffffff77;
				}
		
		#text-content > section > h1 > font {
		display: none;
		}
		#text-content > section > h1 {
		margin: auto;
		content: url("./AbyssBox_DOOM.png");
		}
		body {
		background-image: url("./doomsky.png") !important;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
			}
			/* make editor background transparent */
		#beepboxEditorContainer, .beepboxEditor, #text-content {
		}


			@font-face {
		   font-family: "doomfont";
		   src:
 		   url("./doomfont.otf") format("opentype") tech(color-COLRv1),
			}

			html {
 		   font-family: 'doomfont';
			}
			div.channelBoxLabel {
				font-family: 'doomfont' !important;
			}

			`,
        "Undertale": `
			:root {
				--page-margin: #000;
				--editor-background: #000;
				--hover-preview: #fff;
				--playhead: rgba(255, 255, 255, 0.9);
				--primary-text: #fff;
				--secondary-text: #979797;
				--inverted-text: #000;
				--text-selection: rgba(255, 255, 255, .99);
				--box-selection-fill: #fff;
				--loop-accent: #f00;
				--link-accent: #0f0;
				--ui-widget-background: #4d4d4d;
				--ui-widget-focus: #000;
				--pitch-background: #2d2d2d73;
				--tonic: #c9c9c9;
				--fifth-note: #400000;
				--third-note: #073037;
				--white-piano-key: #fff;
				--black-piano-key: #000;
				--white-piano-key-text: #000;
				--black-piano-key-text: #fff;
				--use-color-formula: false;
			--pitch-channel-limit: 10;
				--track-editor-bg-pitch: #8b8b8b;
				--track-editor-bg-pitch-dim: #000;
				--track-editor-bg-noise: #5c5c5c;
				--track-editor-bg-noise-dim: #000;
				--track-editor-bg-mod: #585858;
				--track-editor-bg-mod-dim: #000;
				--multiplicative-mod-slider: #f00;
				--overwriting-mod-slider: #00f;
				--indicator-primary: #f00;
				--indicator-secondary: #919191;
				--select2-opt-group: #5d576f;
				--input-box-outline: #626262;
				--mute-button-normal: #ffffff;
				--mute-button-mod: #4f4f4f;
				--mod-label-primary: #f00;
				--progress-bar: #00ff00;

				--pitch1-secondary-channel: #590000;
			  --pitch1-primary-channel: #f00;
			  --pitch1-secondary-note: #590000;
			  --pitch1-primary-note: #f00;
			
			  --pitch2-secondary-channel: #00678a;
			  --pitch2-primary-channel: #00ffef;
			  --pitch2-secondary-note: #00678a;
			  --pitch2-primary-note: #00ffef;
			
			  --pitch3-secondary-channel: #b35600;
			  --pitch3-primary-channel: #ff7a00;
			  --pitch3-secondary-note: #b35600;
			  --pitch3-primary-note: #ff7a00;
			
			  --pitch4-secondary-channel: #002866;
			  --pitch4-primary-channel: #001aff;
			  --pitch4-secondary-note: #002866;
			  --pitch4-primary-note: #001aff;
			
			  --pitch5-secondary-channel: #005e0b;
			  --pitch5-primary-channel: #00ff1d;
			  --pitch5-secondary-note: #005e0b;
			  --pitch5-primary-note: #00ff1d;
			
			  --pitch6-secondary-channel: #b55d00;
			  --pitch6-primary-channel: #fe0;
			  --pitch6-secondary-note: #b55d00;
			  --pitch6-primary-note: #fe0;
			
			  --pitch7-secondary-channel: #6a00b3;
			  --pitch7-primary-channel: #a429f7;
			  --pitch7-secondary-note: #6a00b3;
			  --pitch7-primary-note: #a429f7;
			
			  --pitch8-secondary-channel: #02009f;
			  --pitch8-primary-channel: #0058ff;
			  --pitch8-secondary-note: #02009f;
			  --pitch8-primary-note: #0058ff;
			
			  --pitch9-secondary-channel: #5c5c5c;
			  --pitch9-primary-channel: #fff;
			  --pitch9-secondary-note: #5c5c5c;
			  --pitch9-primary-note: #fff;
			
			  --pitch10-secondary-channel: #5e2700;
			  --pitch10-primary-channel: #ffb300;
			  --pitch10-secondary-note: #5e2700;
			  --pitch10-primary-note: #ffb300;
			
			  --noise1-secondary-channel: #750000;
			  --noise1-primary-channel: #f00;
			  --noise1-secondary-note: #750000;
			  --noise1-primary-note: #f00;
			
			  --noise2-secondary-channel: #8567ff;
			  --noise2-primary-channel: #f00;
			  --noise2-secondary-note: #8567ff;
			  --noise2-primary-note: #f00;
			
			  --noise3-secondary-channel: #8567ff;
			  --noise3-primary-channel: #cec2ff;
			  --noise3-secondary-note: #8567ff;
			  --noise3-primary-note: #cec2ff;
			
			  --noise4-secondary-channel: #00266a;
			  --noise4-primary-channel: #ffe100;
			  --noise4-secondary-note: #00266a;
			  --noise4-primary-note: #ffe100;
			
			  --noise5-secondary-channel: #976a00;
			  --noise5-primary-channel: #ffe100;
			  --noise5-secondary-note: #976a00;
			  --noise5-primary-note: #ffe100;
			
			  --mod1-secondary-channel: #aaa;
			  --mod1-primary-channel: #fff;
			  --mod1-secondary-note: #aaa;
			  --mod1-primary-note: #fff;
			
			  --mod2-secondary-channel: #950000;
			  --mod2-primary-channel: #ff6000;
			  --mod2-secondary-note: #950000;
			  --mod2-primary-note: #ff6000;
			
			  --mod3-secondary-channel: #021300;
			  --mod3-primary-channel: #1db917;
			  --mod3-secondary-note: #021300;
			  --mod3-primary-note: #1db917;
			
			  --mod4-secondary-channel: #a00000;
			  --mod4-primary-channel: #ff252f;
			  --mod4-secondary-note: #a00000;
			  --mod4-primary-note: #ff252f;
			
			  --disabled-note-primary: #999;
			  --disabled-note-secondary: #696969;

			  --arrow-color: #f67c33;
			  --icon-color: #f67c33;
				}
				* {
					cursor: url("./icon-soul"), auto !important;
					--file-page-symbol: url("./icon-file.png");
					--edit-pencil-symbol: url("./icon-edit.png");
					--preferences-gear-symbol: url("./icon-preferences.png");
					--text-enabled-icon:❤️ ;
					}
		
			
					div.promptContainerBG {
						background-color: var(--editor-background) !important;
						backdrop-filter: unset !important;
						opacity: 0.5 !important;
					}
			body {
			background-image: url("./battlebg.png") !important;
			background-position: center;
			background-size: contain;
			background-attachment: fixed;
			background-repeat: no-repeat;
			}
			#text-content > section > h1 > font {
			display: none;
			}
			#jummboxPlant{
				opacity:0;
			}
			#text-content > section > h1 {
			 
			background-image: url("./AbyssBoxUtThemeLogo.png");
 			background-size: contain;
 			background-position: center;
  			background-repeat: no-repeat;
			}

			div.selectContainer.menu.file select,
			div.selectContainer.menu.edit select,
			div.selectContainer.menu.preferences select {
				border-style: solid;
				border-color: #f67c33;
				border-radius: 0px;
			}
			div.selectContainer.menu.file,
			div.selectContainer.menu.edit,
			div.selectContainer.menu.preferences {
				--ui-widget-background: black;
				--icon-color: #f67c33;
				--arrow-color: #f67c33;
				color: #f67c33;
			}
			.beepboxEditor select:focus,
			.beepboxEditor .selectContainer:focus-within
			{
				border-color: #fbff4b !important;
				--ui-widget-background: black !important;
				--icon-color: #f00 !important;
				--arrow-color: #fbff4b !important;
				color: #fbff4b !important;

				--file-page-symbol: url("./icon-soul.png");
				--edit-pencil-symbol: url("./icon-soul.png");
				--preferences-gear-symbol: url("./icon-soul.png");
			}
			.beepboxEditor .menu.edit::before,
			.beepboxEditor .menu.file::before,
			.beepboxEditor .menu.preferences::before {
				background: var(--icon-color) !important;
			}
			.beepboxEditor .menu.edit::after,
			.beepboxEditor .menu.file::after,
			.beepboxEditor .menu.preferences::after {
				background: var(--arrow-color) !important;
			}

			#text-content {
				border-style: solid;
				border-radius: 0px;
				padding-left: 20px;
				padding-right: 20px;
				padding-top: 15px;
			}
		#beepboxEditorContainer {
			border-style: solid;
			border-radius: 0px;
			padding-left: 20px;
			padding-right: 20px;
			padding-bottom: 15px;
			}
			`,
		        "Windows Xp": `
			:root {		
			--page-margin: #edead9; 		
			--editor-background: #faf9f2; 		
			--hover-preview: black; 		
			--playhead: #000; 		
			--primary-text: #231f20; 		
			--secondary-text: #231f20; 		
			--inverted-text: black;	 		
			--text-selection: rgba(119,68,255,0.99); 		
			--box-selection-fill: #1e0915; 		
			--loop-accent: #003399; 		
			--link-accent: #003399; 		
			--ui-widget-background: #DBD9CD; 		
			--ui-widget-focus: #DBD9CD; 		
			--pitch-background: #ffffff; 		
			--tonic: #d5dbf5; 		
			--fifth-note: #e8e8e8; 	
			--third-note: #b6ceac;	
			--white-piano-key: #ebe2ca; 		
			--black-piano-key: #403a2f; 		
			--use-color-formula: true; 		
			--track-editor-bg-pitch: #cfcab2; 		
			--track-editor-bg-pitch-dim: #9c9781; 		
			--track-editor-bg-noise: #cfcab2; 		
			--track-editor-bg-noise-dim: #9c9781; 		
			--track-editor-bg-mod: #cfcab2; 		
			--track-editor-bg-mod-dim: #9c9781; 		
			--multiplicative-mod-slider: #9f6082; 		
			--overwriting-mod-slider: #9e3470; 		
			--indicator-primary: #b3498f; 		
			--indicator-secondary: #541d40; 		
			--select2-opt-group: #4f191e; 		
			--input-box-outline: #18041a; 		
			--mute-button-normal: #dd5d94;	 		
			--mute-button-mod: #ba364c; 		
			--mod-label-primary: #541625; 		
			--mod-label-secondary-text: rgb(120, 87, 86); 
			--mod-label-primary-text: gray;
			--progress-bar: #00ff00;
			--octave-scrollbar: #cfcab2;

--pitch-secondary-channel-hue: 0;		
--pitch-secondary-channel-hue-scale: 6.1;		
--pitch-secondary-channel-sat: 43.3;		
--pitch-secondary-channel-sat-scale: 0.1;		
--pitch-secondary-channel-lum: 30;		
--pitch-secondary-channel-lum-scale: 0.05;
		
--pitch-primary-channel-hue: 0;		
--pitch-primary-channel-hue-scale: 6.1;		
--pitch-primary-channel-sat: 60;		
--pitch-primary-channel-sat-scale: 0.1;		
--pitch-primary-channel-lum: 57.5;		
--pitch-primary-channel-lum-scale: 0.05;
		
--pitch-secondary-note-hue: 0;		
--pitch-secondary-note-hue-scale: 6.1;		
--pitch-secondary-note-sat: 43.9;		
--pitch-secondary-note-sat-scale: 0.1;		
--pitch-secondary-note-lum: 35;		
--pitch-secondary-note-lum-scale: 0.05;
		
--pitch-primary-note-hue: 0;		
--pitch-primary-note-hue-scale: 6.1;		
--pitch-primary-note-sat: 60;		
--pitch-primary-note-sat-scale: 0.05;		
--pitch-primary-note-lum: 65.6;		
--pitch-primary-note-lum-scale: 0.025;
		
--noise-secondary-channel-hue: 0;		
--noise-secondary-channel-hue-scale: 2;		
--noise-secondary-channel-sat: 25;		
--noise-secondary-channel-sat-scale: 0;		
--noise-secondary-channel-lum: 32;		
--noise-secondary-channel-lum-scale: 0;
		
--noise-primary-channel-hue: 0;		
--noise-primary-channel-hue-scale: 2;		
--noise-primary-channel-sat: 33;		
--noise-primary-channel-sat-scale: 0;		
--noise-primary-channel-lum: 53.5;		
--noise-primary-channel-lum-scale: 0;
		
--noise-secondary-note-hue: 0;		
--noise-secondary-note-hue-scale: 2;		
--noise-secondary-note-sat: 33.5;		
--noise-secondary-note-sat-scale: 0;		
--noise-secondary-note-lum: 35;		
--noise-secondary-note-lum-scale: 0;	
--noise-primary-note-hue: 0;		
--noise-primary-note-hue-scale: 2;		
--noise-primary-note-sat: 46.5;		
--noise-primary-note-sat-scale: 0;		
--noise-primary-note-lum: 54;		
--noise-primary-note-lum-scale: 0;	
--mod-secondary-channel-hue: 192;		
--mod-secondary-channel-hue-scale: 1.5;		
--mod-secondary-channel-sat: 88;		
--mod-secondary-channel-sat-scale: 0;		
--mod-secondary-channel-lum: 30;		
--mod-secondary-channel-lum-scale: 0;	
--mod-primary-channel-hue: 192;		
--mod-primary-channel-hue-scale: 1.5;		
--mod-primary-channel-sat: 56;		
--mod-primary-channel-sat-scale: 0;		
--mod-primary-channel-lum: 60;		
--mod-primary-channel-lum-scale: 0;	
--mod-secondary-note-hue: 192;		
--mod-secondary-note-hue-scale: 1.5;		
--mod-secondary-note-sat: 42;		
--mod-secondary-note-sat-scale: 0;		
--mod-secondary-note-lum: 35;		
--mod-secondary-note-lum-scale: 0;	
--mod-primary-note-hue: 192;		
--mod-primary-note-hue-scale: 1.5;		
--mod-primary-note-sat: 56;		
--mod-primary-note-sat-scale: 0;		
--mod-primary-note-lum: 65;		
--mod-primary-note-lum-scale: 0;	

			--note-flash: #ffffff77;
			--note-flash-secondary: #ffffff66;
				}
				
				@font-face {
					font-family: "tahoma";
					src:
					 url("./tahoma.otf") format("opentype") tech(color-COLRv1),
					 image-rendering: -moz-crisp-edges !important;
					 image-rendering: -webkit-optimize-contrast !important; 
					 image-rendering: -o-crisp-edges !important;
					 image-rendering: pixelated !important;
					 image-rendering: optimizeSpeed !important;
				}
		
				div.promptContainerBG {
					display: none !important;
				}

				html {
				font-family: 'tahoma';
			 font-size: 150% !important;
				}
				div.channelBoxLabel {
					font-family: 'tahoma' !important;
				}

				.beepboxEditor .promptContainer {
				}

				div.prompt.noSelection {
					margin: auto;
					text-align: center;
					background: var(--editor-background);
					border-radius: 15px;
					border: 0px solid var(--ui-widget-background) !important;
					padding-left: 20px !important;
					box-shadow: 6px 6px 27px 4px rgba(0, 0, 0, 0.5) !important;
					padding-top: 6px !important;
					padding-right: 20px !important;
					padding-bottom: 20px !important;
					border-image-source: url("./xpborder.png") !important;
					border-image-slice: 34 !important;
					border-image-width: 50px !important;
					border-width: unset !important;
					image-rendering: -moz-crisp-edges !important;     
					image-rendering: -webkit-optimize-contrast !important; 
					image-rendering: -o-crisp-edges !important;
					image-rendering: pixelated !important;
					image-rendering: optimizeSpeed !important; 
				}

				div.prompt.noSelection button.cancelButton {
					opacity: 0;
				}

				div.promptTitle {
					text-align: left !important;
					color: white !important;
				}
				.layoutExt::before {
					content: "layout.exe";
				}
				.layoutTitle {
					display: none;
				}
				.channelExt::after {
					content: "channelSettings.exe";
				}
				.channelTitle {
					display: none;
				}
				.limiterExt::after {
					content: "limiter.exe";
				}
				.limiterTitle {
					display: none;
				}

				.bpmTitle {
					display: none;
				}
				.bpmExt::after {
					content: "bpb.exe";
				}

				.gerTitle {
					display: none;
				}
				.gerExt::after {
					content: "euclidianRhythm.exe";
				}

				.samplesTitle {
					display: none;
				}
				.samplesExt::after {
					content: "sampler.exe";
					margin-bottom: 0.5em;

				}
				.samplesExt {
					padding-bottom: 8px;
				}

				.importTitle {
					display: none;
				}
				.importExt::after {
					content: "import.exe";
				}

				.exportTitle {
					display: none;
				}
				.exportExt::after {
					content: "export.exe";
				}

				.import-instrumentTitle {
					display: none;
				}
				.import-instrumentExt::after {
					content: "importInstrument.exe";
				}

				.export-instrumentTitle {
					display: none;
				}
				.export-instrumentExt::after {
					content: "exportInstrument.exe";
				}

				.song-lengthTitle {
					display: none;
				}
				.song-lengthExt::after {
					content: "songExtender.exe";
				}

				.mnsTitle {
					display: none;
				}
				.mnsExt::after {
					content: "moveNotesSideways.exe";
				}

				.themeExt::after {
					content: "setTheme.exe";
				}
				.themeTitle {
					display: none;
				}

				.customThemeExt::after {
					content: "customThemeEditor.exe";
				}
				.customThemeTitle {
					display: none;
				}

				.nrsTitle {
					display: none;
				}
				.nrsExt::after {
					content: "setupMidiKeyboard.exe";
				}

				.beepboxEditor .promptContainer::before {
					background: #fff0;
				}

		* {
		cursor: url("./xpcursor.png"), auto !important;
		--play-symbol:url("./xpPlay.png");
		--pause-symbol:url("./xpPause.png");
		--record-symbol:url("./xpRecord.png");
		--stop-symbol:url("./xpStop.png");
		--prev-bar-symbol:url("./xpBackward.png");
		--next-bar-symbol:url("./xpForward.png");
		--file-page-symbol: url("./xpFile.png");
		--edit-pencil-symbol: url("./xpEdit.png");
		--preferences-gear-symbol: url("./xpPreferences.png");
		--muted-symbol: url("./xpSpeakerMute.png");
		--unmuted-symbol: url("./xpSpeaker.png");
		--volume-symbol: url("./xpSpeaker.png");
		--zoom-in-symbol: url("./xpZoomIn.png");
		--zoom-out-symbol: url("./xpZoomOut.png");
		}

		.beepboxEditor button,
		button.mobilePatternButton,
		button.mobileTrackButton,
		button.mobileSettingsButton,
		button.mobilePlayButton,
		button.mobilePauseButton,
		button.mobileNextBarButton,
		button.mobilePrevBarButton,
		button.playButton,
		button.pauseButton, 
		button.recordButton, 
		button.stopButton,
		button.nextBarButton, 
		button.prevBarButton, 
		button.copyButton, 
		button.pasteButton, 
		button.exportInstrumentButton, 
		button.importInstrumentButton, 
		.beepboxEditor select, 
		.beepboxEditor .select2-selection__rendered {
				cursor: url("./xphandcursor.png"), pointer !important;
			}

		div.mute-button::before {
			background-image: url("./xpSpeaker.png") !important;
			background-size: 120% !important;
			background-position-x: center !important;
			background-position-y: center !important;
			background-repeat: no-repeat !important;
			image-rendering: -moz-crisp-edges !important;   
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important; 
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		div.mute-button.muted::before {
			background-image: url("./xpSpeakerMute.png") !important;
			background-size: 120% !important;
			background-position-x: center !important;
			background-position-y: center !important;
			background-repeat: no-repeat !important;
			image-rendering: -moz-crisp-edges !important; 
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important; 
			image-rendering: pixelated !important; 
			image-rendering: optimizeSpeed !important; 
		}

		button.recordButton::Before {
			background-image: url("./xpRecord.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			background-repeat: no-repeat !important;

			image-rendering: -moz-crisp-edges !important;        
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;

		}

		button.stopButton::Before {
			background-image: url("./xpStop.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		button.pauseButton::Before {
			background-image: url("./xpPause.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		.beepboxEditor span.volume-speaker {
			background-image: url("./xpSpeaker.png");
			background-position: center !important;
			background-repeat: no-repeat !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
			}

		div.selectContainer.menu.file::before {

			background-image: url("./xpFile.png");
			background-size: 64%;
			background-position-x: center;
			background-position-y: center;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important;
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		div.selectContainer.menu.edit::before {
			background-image: url("./xpEdit.png");
			background-size: 64%;
			background-position-x: center;
			background-position-y: center;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}
		div.selectContainer.menu.preferences::before {
			background-image: url("./xpPreferences.png");
			background-size: 64%;
			background-position-x: center;
			background-position-y: center;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}
		button.playButton::before {
			background-image: url("./xpPlay.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}
		.beepboxEditor button.prevBarButton::before {
			background-image: url("./xpBackward.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		.beepboxEditor button.nextBarButton::before {
			background-image: url("./xpForward.png") !important;
			background-size: 64% !important;
			background-position: center !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		.beepboxEditor .zoomInButton::before {
			background-image: url("./xpZoomIn.png") !important;
			background-position: center !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		.beepboxEditor .zoomOutButton::before {
			background-image: url("./xpZoomOut.png") !important;
			background-position: center !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}

		.beepboxEditor input[type="range"]::-moz-range-thumb {
			background-image: url("./scrollbar.png") !important;
			background-position: center !important;
			background-size: inherit !important;
			border-radius: 0px !important;
			width: 13px !important;
			height: 23px !important;
			image-rendering: -moz-crisp-edges !important;
			image-rendering: -webkit-optimize-contrast !important; 
			image-rendering: -o-crisp-edges !important;
			image-rendering: pixelated !important;
			image-rendering: optimizeSpeed !important;
		}
			#text-content > section > h1 > font {
		display: none;
		}
		#text-content > section > h1 {
		margin: auto;
		content: url("./AbyssBox_XP.png");
		}
		body {
		background-image: url("./xphills.png") !important;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
			}
			#text-content {
    			margin: auto;
				margin-top: auto;
				text-align: center;
				background: var(--editor-background);
				border-radius: 15px;
				border: 0px solid var(--ui-widget-background) !important;
				padding-left: 20px !important;
				box-shadow: 6px 6px 27px 4px rgba(0, 0, 0, 0.5) !important;
				padding-top: 58px !important;
				padding-right: 20px !important;
				padding-bottom: 20px !important;
				border-image-source: url("./xpborder.png") !important;
				border-image-slice: 34 !important;
				border-image-width: 50px !important;
				border-width: unset !important;
				image-rendering: -moz-crisp-edges !important;
				image-rendering: -webkit-optimize-contrast !important;
				image-rendering: -o-crisp-edges !important;
				image-rendering: pixelated !important;
				image-rendering: optimizeSpeed !important;
				margin-top: 15px;
				}
			#beepboxEditorContainer {
    				border-image-source: url("./xptextbg.png");
    				border-image-slice: 11 fill; 
   				border-image-width: 11px; 
				border-image-repeat: stretch;
    				background-color: transparent; 
    				padding: 13px; 
				}

			.pattern-area {
			border: #fff 1px solid;
			border-right-color: rgb(255, 255, 255);
			border-bottom-color: rgb(255, 255, 255);
			padding: 2px;
			background: #f9f8f3;
			border-right-color: #c7c7bd;
			border-bottom-color: #c7c7bd;
			}

			.track-area {
			--editor-background: #edead9;
			--ui-widget-background: #edead9;
			}

			.beepboxEditor .muteEditor {
			background: #edead9;
			}

			.settings-area {
			border: #fff 1px solid;
			border-right-color: rgb(255, 255, 255);
			border-bottom-color: rgb(255, 255, 255);
			padding: 2px;
			background: #f9f8f3;
			border-right-color: #c7c7bd;
			border-bottom-color: #c7c7bd;
			}

			.beepboxEditor {
			background: #edead9 !important;
			}

			#octaveScrollBarContainer {
			--tonic: #9c9781;
			}

			.barScrollBar {
			--ui-widget-background: #9c9781;
			--editor-background: #edead9;
			}

			.songLoopButton {
			background: #edead9;
			}

			#firstImage {
				background-image: url("./xpsongeditorbg.png") !important;
				background-repeat: no-repeat !important;
				background-size: 100% 100% !important;
			}

			select {
				cursor: url("./xphandcursor.png"), pointer !important;
			}

			.beepboxEditor input[type="range"]::-moz-range-track
			{
				background: rgba(222, 217, 189, 0.2) !important;
				box-shadow:
					0px 0px 1px 1px rgba(0, 0, 0, 0.0), 
					inset 0px 1px 2px 0px rgb(125, 120, 95), 
					inset 0px -1px 0px 0px rgb(255, 255, 255)
				;
				border-radius: 4px;
			} /* Thanks to LeoV's Skeumorphic theme on this one */
			
			.beepboxEditor input[type="range"]::-moz-range-track {
				height: 3px !important;
			}
			
			.beepboxEditor select:focus {
					border-image-source: url("./xpbuttonpressedbg.png");
					border-image-slice: 4 fill; 
					border-image-width: 4px; 
					border-image-repeat: repeat;
					background-color: transparent; 
					padding: 6px; 
					cursor: url("./xphandcursor.png"), pointer !important;
				}

				.beepboxEditor input[type="checkbox"]
				{
					appearance: none;
					background: rgba(255, 255, 255, 1);
					color: currentColor;
					border-radius: 0px;
					width: 13px !important;
					height: 13px !important;
					background-image:url("./xpCheckmarkBlank.png");
					background-repeat:no-repeat;

					image-rendering: -moz-crisp-edges !important;
					image-rendering: -webkit-optimize-contrast !important; 
					image-rendering: -o-crisp-edges !important;
					image-rendering: pixelated !important;
					image-rendering: optimizeSpeed !important;
					transform: scale(2) !important;
					}

				.beepboxEditor input[type="checkbox"]:checked
				{
					display: flex;
					justify-content: center;
					transform: scale(2) !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					width: 13px;
					height: 13px;
					text-align: center;
					content: "";
					background-repeat:no-repeat;
					background-image:url("./xpCheckmark.png");
					image-rendering: -moz-crisp-edges !important;
					image-rendering: -webkit-optimize-contrast !important; 
					image-rendering: -o-crisp-edges !important;
					image-rendering: pixelated !important;
					image-rendering: optimizeSpeed !important;
				}
				button.envelopeDropdown, div.selectRow button:not(.copyButton,.pasteButton,.exportInstrumentButton,.importInstrumentButton) {
					--ui-widget-background: var(--editor-background) !important;
					border-image-source: none !important;
				}

				.beepboxEditor input[type="range"]::-webkit-slider-thumb
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-thumb
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-ms-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-thumb
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-moz-range-track
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="text"],
				.beepboxEditor input[type="number"]
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
	
				div.selectRow span 
				{
					cursor: url("./xphandcursor.png"), pointer !important;
				}
				 


			`,
        "corporate dark": `
			:root {
			--page-margin: #1f1f1f;
			--editor-background: #1f1f1f;
			--hover-preview: white;
			--playhead: white;
			--primary-text: #e8e8e8;
			--secondary-text: #8c8c8c;
			--inverted-text: #1D1C1D;
			--text-selection: #C249DD;
			--box-selection-fill: rgba(0,0,0,0.2);
			--loop-accent: #C249DD;
			--link-accent: #0E9DD3;
			--ui-widget-background: #303134;
			--ui-widget-focus: #5B5957;
			--pitch-background: #3e3f42;
			--tonic: #303134;
			--fifth-note: #98809D;
			--third-note: #62738b;
			--white-piano-key: white;
			--black-piano-key: #1D1C1D;
			--white-piano-key-text: #1D1C1D;
			--black-piano-key-text: white;
			--use-color-formula: false;
			--track-editor-bg-pitch: #303134;
			--track-editor-bg-pitch-dim: #1d1e20;
			--track-editor-bg-noise: #303134;
			--track-editor-bg-noise-dim: #1d1e20;
			--track-editor-bg-mod: #46524a;
			--track-editor-bg-mod-dim: #2c352f;
			--multiplicative-mod-slider: #456;
			--overwriting-mod-slider: #654;
			--indicator-primary: #C249DD;
			--indicator-secondary: #602670;
			--select2-opt-group: #474747;
			--input-box-outline: #F4EDE4;
			--mute-button-normal: #DE8969;
			--mute-button-mod: #C05B8C;
			--pitch-channel-limit: 4;
			--noise-channel-limit: 3;
			--pitch1-secondary-channel: #17616B;
			--pitch1-primary-channel:   #36C5F0;
			--pitch1-secondary-note:    #17616B;
			--pitch1-primary-note:      #36C5F0;
			--pitch2-secondary-channel: #185F34;
			--pitch2-primary-channel:   #2EB67D;
			--pitch2-secondary-note:    #185F34;
			--pitch2-primary-note:      #2EB67D;
			--pitch3-secondary-channel: #755617;
			--pitch3-primary-channel:   #ECB22E;
			--pitch3-secondary-note:    #755617;
			--pitch3-primary-note:      #ECB22E;
			--pitch4-secondary-channel: #821237;
			--pitch4-primary-channel:   #E01E5A;
			--pitch4-secondary-note:    #821237;
			--pitch4-primary-note:      #E01E5A;
			--pitch5-secondary-channel: #D020D0;
			--pitch5-primary-channel:   #FF90FF;
			--pitch5-secondary-note:    #E040E0;
			--pitch5-primary-note:      #FFC0FF;
			--pitch6-secondary-channel: #7777B0;
			--pitch6-primary-channel:   #A0A0FF;
			--pitch6-secondary-note:    #8888D0;
			--pitch6-primary-note:      #D0D0FF;
			--pitch7-secondary-channel: #8AA100;
			--pitch7-primary-channel:   #DEFF25;
			--pitch7-secondary-note:    #AAC700;
			--pitch7-primary-note:      #E6FF92;
			--pitch8-secondary-channel: #DF0019;
			--pitch8-primary-channel:   #FF98A4;
			--pitch8-secondary-note:    #FF4E63;
			--pitch8-primary-note:      #FFB2BB;
			--pitch9-secondary-channel: #00A170;
			--pitch9-primary-channel:   #50FFC9;
			--pitch9-secondary-note:    #00C78A;
			--pitch9-primary-note:      #83FFD9;
			--pitch10-secondary-channel:#A11FFF;
			--pitch10-primary-channel:  #CE8BFF;
			--pitch10-secondary-note:   #B757FF;
			--pitch10-primary-note:     #DFACFF;
			--noise1-secondary-channel: #424242;
			--noise1-primary-channel:   #AAAAAA;
			--noise1-secondary-note:    #424242;
			--noise1-primary-note:      #AAAAAA;
			--noise2-secondary-channel: #5E3A2D;
			--noise2-primary-channel:   #DE8969;
			--noise2-secondary-note:    #5E3A2D;
			--noise2-primary-note:      #DE8969;
			--noise3-secondary-channel: #32595B;
			--noise3-primary-channel:   #78D7DD;
			--noise3-secondary-note:    #32595B;
			--noise3-primary-note:      #78D7DD;
			--noise4-secondary-channel: #7A4F9A;
			--noise4-primary-channel:   #AF82D2;
			--noise4-secondary-note:    #9E71C1;
			--noise4-primary-note:      #D4C1EA;
			--noise5-secondary-channel: #607837;
			--noise5-primary-channel:   #A2BB77;
			--noise5-secondary-note:    #91AA66;
			--noise5-primary-note:      #C5E2B2;
			--mod1-secondary-channel:   #339955;
			--mod1-primary-channel:     #77fc55;
			--mod1-secondary-note:      #77ff8a;
			--mod1-primary-note:        #cdffee;
			--mod2-secondary-channel:   #993355;
			--mod2-primary-channel:     #f04960;
			--mod2-secondary-note:      #f057a0;
			--mod2-primary-note:        #ffb8de;
			--mod3-secondary-channel:   #553399;
			--mod3-primary-channel:     #8855fc;
			--mod3-secondary-note:      #aa64ff;
			--mod3-primary-note:	    #f8ddff;
			--mod4-secondary-channel:   #a86436;
			--mod4-primary-channel:     #c8a825;
			--mod4-secondary-note:      #e8ba46;
			--mod4-primary-note:        #fff6d3;
			--mod-label-primary:        #999;
			--mod-label-secondary-text: #333;
			--mod-label-primary-text:   black;
			--disabled-note-primary:    #999;
			--disabled-note-secondary:  #666;
			--mod-title: #1D1C1D;
			}

			.channelBox {
			border-radius: 25px;
			}

			button:hover {
			border-radius: 4px;
			background-color: #1d1e20 !important;
			}

			select:hover {
			border-radius: 4px !important;
			background-color: #1d1e20 !important;
			}

			#select2-pitchPresetSelect-container:hover {
			border-radius: 4px !important;
			background-color: #1d1e20 !important;
			}`,
        "corporate light": `
			:root {
			--page-margin: white;
			--editor-background: white;
			--hover-preview: white;
			--playhead: white;
			--primary-text: #1D1C1D;
			--secondary-text: #A5A19B;
			--inverted-text: #1D1C1D;
			--text-selection: #C249DD;
			--box-selection-fill: rgba(0,0,0,0.2);
			--loop-accent: #C249DD;
			--link-accent: #0E9DD3;
			--ui-widget-background: #F4EDE4;
			--ui-widget-focus: white;
			--pitch-background: #E8DED1;
			--tonic: #E6B8A8;
			--fifth-note: #DB99EA;
			--third-note: #99c3ff;
			--white-piano-key: white;
			--black-piano-key: #1D1C1D;
			--white-piano-key-text: #1D1C1D;
			--black-piano-key-text: white;
			--use-color-formula: false;
			--track-editor-bg-pitch: #E8DED1;
			--track-editor-bg-pitch-dim: #ecc6ba;
			--track-editor-bg-noise: #E8DED1;
			--track-editor-bg-noise-dim: #ecc6ba;
			--track-editor-bg-mod: #87BB9B;
			--track-editor-bg-mod-dim: #6baa83;
			--multiplicative-mod-slider: #456;
			--overwriting-mod-slider: #654;
			--indicator-primary: #C249DD;
			--indicator-secondary: #602670;
			--select2-opt-group: #474747;
			--input-box-outline: #F4EDE4;
			--mute-button-normal: #DE8969;
			--mute-button-mod: #C05B8C;
			--pitch-channel-limit: 4;
			--noise-channel-limit: 3;
			--pitch1-secondary-channel: #17616B;
			--pitch1-primary-channel:   #36C5F0;
			--pitch1-secondary-note:    #17616B;
			--pitch1-primary-note:      #36C5F0;
			--pitch2-secondary-channel: #185F34;
			--pitch2-primary-channel:   #2EB67D;
			--pitch2-secondary-note:    #185F34;
			--pitch2-primary-note:      #2EB67D;
			--pitch3-secondary-channel: #755617;
			--pitch3-primary-channel:   #ECB22E;
			--pitch3-secondary-note:    #755617;
			--pitch3-primary-note:      #ECB22E;
			--pitch4-secondary-channel: #821237;
			--pitch4-primary-channel:   #E01E5A;
			--pitch4-secondary-note:    #821237;
			--pitch4-primary-note:      #E01E5A;
			--pitch5-secondary-channel: #D020D0;
			--pitch5-primary-channel:   #FF90FF;
			--pitch5-secondary-note:    #E040E0;
			--pitch5-primary-note:      #FFC0FF;
			--pitch6-secondary-channel: #7777B0;
			--pitch6-primary-channel:   #A0A0FF;
			--pitch6-secondary-note:    #8888D0;
			--pitch6-primary-note:      #D0D0FF;
			--pitch7-secondary-channel: #8AA100;
			--pitch7-primary-channel:   #DEFF25;
			--pitch7-secondary-note:    #AAC700;
			--pitch7-primary-note:      #E6FF92;
			--pitch8-secondary-channel: #DF0019;
			--pitch8-primary-channel:   #FF98A4;
			--pitch8-secondary-note:    #FF4E63;
			--pitch8-primary-note:      #FFB2BB;
			--pitch9-secondary-channel: #00A170;
			--pitch9-primary-channel:   #50FFC9;
			--pitch9-secondary-note:    #00C78A;
			--pitch9-primary-note:      #83FFD9;
			--pitch10-secondary-channel:#A11FFF;
			--pitch10-primary-channel:  #CE8BFF;
			--pitch10-secondary-note:   #B757FF;
			--pitch10-primary-note:     #DFACFF;
			--noise1-secondary-channel: #424242;
			--noise1-primary-channel:   #AAAAAA;
			--noise1-secondary-note:    #424242;
			--noise1-primary-note:      #AAAAAA;
			--noise2-secondary-channel: #5E3A2D;
			--noise2-primary-channel:   #DE8969;
			--noise2-secondary-note:    #5E3A2D;
			--noise2-primary-note:      #DE8969;
			--noise3-secondary-channel: #32595B;
			--noise3-primary-channel:   #78D7DD;
			--noise3-secondary-note:    #32595B;
			--noise3-primary-note:      #78D7DD;
			--noise4-secondary-channel: #7A4F9A;
			--noise4-primary-channel:   #AF82D2;
			--noise4-secondary-note:    #9E71C1;
			--noise4-primary-note:      #D4C1EA;
			--noise5-secondary-channel: #607837;
			--noise5-primary-channel:   #A2BB77;
			--noise5-secondary-note:    #91AA66;
			--noise5-primary-note:      #C5E2B2;
			--mod1-secondary-channel:   #339955;
			--mod1-primary-channel:     #77fc55;
			--mod1-secondary-note:      #77ff8a;
			--mod1-primary-note:        #cdffee;
			--mod2-secondary-channel:   #993355;
			--mod2-primary-channel:     #f04960;
			--mod2-secondary-note:      #f057a0;
			--mod2-primary-note:        #ffb8de;
			--mod3-secondary-channel:   #553399;
			--mod3-primary-channel:     #8855fc;
			--mod3-secondary-note:      #aa64ff;
			--mod3-primary-note:	    #f8ddff;
			--mod4-secondary-channel:   #a86436;
			--mod4-primary-channel:     #c8a825;
			--mod4-secondary-note:      #e8ba46;
			--mod4-primary-note:        #fff6d3;
			--mod-label-primary:        #999;
			--mod-label-secondary-text: #333;
			--mod-label-primary-text:   black;
			--disabled-note-primary:    #999;
			--disabled-note-secondary:  #666;
			--mod-title: #1D1C1D;
			}

			.channelBox {
			border-radius: 25px;
			}

			button:hover {
			border-radius: 4px;
			background-color: #dbd2c5 !important;
			}

			select:hover {
			border-radius: 4px !important;
			background-color: #dbd2c5 !important;
			}

			#select2-pitchPresetSelect-container:hover {
			border-radius: 4px !important;
			background-color: #dbd2c5 !important;
			}`,
        "Terminal 2.0 (AB)": `
			:root { 
			--page-margin: black; 
			--editor-background: black; 
			--hover-preview: white; 
			--playhead: white; 
			--primary-text: #26ff00; 
			--secondary-text: #0d6d00; 
			--inverted-text: #000000; 
			--text-selection: rgba(119,68,255,0.99); 
			--box-selection-fill: rgba(255,255,255,0.2); 
			--loop-accent: #1eff00; 
			--link-accent: #8dff7e; 
			--ui-widget-background: #000000; 
			--ui-widget-focus: #242424; 
			--pitch-background: #0d0d0d50; 
			--tonic: #06350090; 
			--fifth-note: #20202090; 
			--third-note: #2f571f8f;
			--white-piano-key: #ffffff; 
			--black-piano-key: #000000; 
			--white-piano-key-text: #131200; 
			--black-piano-key-text: #fff; 
			--use-color-formula: false;
			--pitch-channel-limit: 10; 
			--track-editor-bg-pitch: #152912; 
			--track-editor-bg-pitch-dim: #091307; 
			--track-editor-bg-noise: #1a1a1a; 
			--track-editor-bg-noise-dim: #333; 
			--track-editor-bg-mod: #000000; 
			--track-editor-bg-mod-dim: #000000; 
			--multiplicative-mod-slider: #073c00; 
			--overwriting-mod-slider: #0c6700; 
			--indicator-primary: #139f00; 
			--indicator-secondary: #1eff00; 
			--select2-opt-group: #171717; 
			--input-box-outline: #00ff00; 
			--mute-button-normal: #00ff44; 
			--mute-button-mod: #44ff00; 
			--progress-bar: #00ff00;
			--pitch1-secondary-channel: #0099A1; 
			--pitch1-primary-channel: #25F3FF; 
			--pitch1-secondary-note: #00BDC7; 
			--pitch1-primary-note: #92F9FF; 
			--pitch2-secondary-channel: #A1A100; 
			--pitch2-primary-channel: #FFFF25; 
			--pitch2-secondary-note: #C7C700; 
			--pitch2-primary-note: #FFFF92; 
			--pitch3-secondary-channel: #C75000; 
			--pitch3-primary-channel: #FF9752; 
			--pitch3-secondary-note: #FF771C; 
			--pitch3-primary-note: #FFCDAB; 
			--pitch4-secondary-channel: #00A100; 
			--pitch4-primary-channel: #50FF50; 
			--pitch4-secondary-note: #00C700; 
			--pitch4-primary-note: #A0FFA0; 
			--pitch5-secondary-channel: #D020D0; 
			--pitch5-primary-channel: #FF90FF; 
			--pitch5-secondary-note: #E040E0; 
			--pitch5-primary-note: #FFC0FF; 
			--pitch6-secondary-channel: #7777B0; 
			--pitch6-primary-channel: #A0A0FF; 
			--pitch6-secondary-note: #8888D0; 
			--pitch6-primary-note: #D0D0FF; 
			--pitch7-secondary-channel: #8AA100; 
			--pitch7-primary-channel: #DEFF25; 
			--pitch7-secondary-note: #AAC700; 
			--pitch7-primary-note: #E6FF92; 
			--pitch8-secondary-channel: #DF0019; 
			--pitch8-primary-channel: #FF98A4; 
			--pitch8-secondary-note: #FF4E63; 
			--pitch8-primary-note: #FFB2BB; 
			--pitch9-secondary-channel: #00A170; 
			--pitch9-primary-channel: #50FFC9; 
			--pitch9-secondary-note: #00C78A; 
			--pitch9-primary-note: #83FFD9; 
			--pitch10-secondary-channel: #A11FFF; 
			--pitch10-primary-channel: #CE8BFF; 
			--pitch10-secondary-note: #B757FF; 
			--pitch10-primary-note: #DFACFF; 
			--noise1-secondary-channel: #6F6F6F; 
			--noise1-primary-channel: #AAAAAA; 
			--noise1-secondary-note: #A7A7A7; 
			--noise1-primary-note: #E0E0E0; 
			--noise2-secondary-channel: #996633; 
			--noise2-primary-channel: #DDAA77; 
			--noise2-secondary-note: #CC9966; 
			--noise2-primary-note: #F0D0BB; 
			--noise3-secondary-channel: #4A6D8F; 
			--noise3-primary-channel: #77AADD; 
			--noise3-secondary-note: #6F9FCF; 
			--noise3-primary-note: #BBD7FF; 
			--noise4-secondary-channel: #7A4F9A; 
			--noise4-primary-channel: #AF82D2; 
			--noise4-secondary-note: #9E71C1; 
			--noise4-primary-note: #D4C1EA; 
			--noise5-secondary-channel: #607837; 
			--noise5-primary-channel: #A2BB77; 
			--noise5-secondary-note: #91AA66; 
			--noise5-primary-note: #C5E2B2; 
			--mod1-secondary-channel: #339955; 
			--mod1-primary-channel: #77fc55; 
			--mod1-secondary-note: #77ff8a; 
			--mod1-primary-note: #cdffee; 
			--mod2-secondary-channel: #993355; 
			--mod2-primary-channel: #f04960; 
			--mod2-secondary-note: #f057a0; 
			--mod2-primary-note: #ffb8de; 
			--mod3-secondary-channel: #553399; 
			--mod3-primary-channel: #8855fc; 
			--mod3-secondary-note: #aa64ff; 
			--mod3-primary-note: #f8ddff; 
			--mod4-secondary-channel: #a86436; 
			--mod4-primary-channel: #c8a825; 
			--mod4-secondary-note: #e8ba46; 
			--mod4-primary-note: #fff6d3; 
			--mod-label-primary: #164705; 
			--mod-label-secondary-text: #333; 
			--mod-label-primary-text: #44ff00; 
			--disabled-note-primary: #999; 
			--disabled-note-secondary: #666; 
			--note-flash: #a4ff82; 
			--note-flash-secondary: #dffbd57a; }
			
			 body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 0;
				background-image: url("./lines2.png") !important;
				background-size: 10%;
			}

						@font-face {
					   font-family: "Workbench";
					   src:
						url("./Workbench.ttf") format("truetype") tech(color-COLRv1),
						}
			
						html {
							font-family: 'Workbench';
						}
			
						div.channelBoxLabel {
							font-family: 'Workbench' !important;
						}
			
			
						#modTitle::before {
							content: "> AbyssBox Terminal 2.0" !important;
						}
			`,
        "Protanopia": `
:root { 
--page-margin: #000000; 
--editor-background: #000000; 
--hover-preview: white; 
--playhead: rgba(255, 255, 255, 0.9); 
--primary-text: #ffffff; 
--secondary-text: #e5e5e5; 
--inverted-text: #000000; 
--text-selection: rgba(119,68,255,0.99); 
--box-selection-fill: #044b94; 
--loop-accent: #ffffff; 
--link-accent: #8915c8; 
--ui-widget-background: #676767; 
--ui-widget-focus: #696969; 
--pitch-background: #302f36; 
--tonic: #19181c; 
--fifth-note: #1b1924; 
--third-note: #192415;
--white-piano-key: #a6a6a6; 
--black-piano-key: #484848; 
--use-color-formula: false;
			--pitch-channel-limit: 10; 
--track-editor-bg-pitch: #666666; 
--track-editor-bg-pitch-dim: #383838; 
--track-editor-bg-noise: #438240; 
--track-editor-bg-noise-dim: #1e361d; 
--track-editor-bg-mod: #5f419c; 
--track-editor-bg-mod-dim: #3e2b66; 
--multiplicative-mod-slider: #b62326; 
--overwriting-mod-slider: #5f1214; 
--indicator-primary: #ccffdb; 
--indicator-secondary: #55dee6; 
--select2-opt-group: #595959; 
--input-box-outline: #ffffff; 
--mute-button-normal: #f11d22; 
--mute-button-mod: #4b57c2; 
--mod-label-primary: #0909ff; 
--mod-label-secondary-text: #ffffff; 
--mod-label-primary-text: #c8ecfd; 
				--pitch1-secondary-channel: #160740;
				--pitch1-primary-channel:   #482d8a;

				--pitch1-secondary-note:    #160740;
				--pitch1-primary-note:      #482d8a;

				--pitch2-secondary-channel: #0b555e;
				--pitch2-primary-channel:   #126e7a;

				--pitch2-secondary-note:    #0b555e;
				--pitch2-primary-note:      #126e7a;

				--pitch3-secondary-channel: #1d898c;
				--pitch3-primary-channel:   #2fa9ad;

				--pitch3-secondary-note:    #1d898c;
				--pitch3-primary-note:      #2fa9ad;

				--pitch4-secondary-channel: #3f9160;
				--pitch4-primary-channel:   #55ad78;

				--pitch4-secondary-note:    #3f9160;
				--pitch4-primary-note:      #55ad78;

				--pitch5-secondary-channel: #69b051;
				--pitch5-primary-channel:   #97e07e;

				--pitch5-secondary-note:    #69b051;
				--pitch5-primary-note:      #97e07e;

				--pitch6-secondary-channel: #bbcc8f;
				--pitch6-primary-channel:   #d4e3ac;

				--pitch6-secondary-note:    #bbcc8f;
				--pitch6-primary-note:      #d4e3ac;

				--pitch7-secondary-channel: #8f7657;
				--pitch7-primary-channel:   #b5a28a;

				--pitch7-secondary-note:    #8f7657;
				--pitch7-primary-note:      #b5a28a;

				--pitch8-secondary-channel: #804d3c;
				--pitch8-primary-channel:   #a16a58;

				--pitch8-secondary-note:    #804d3c;
				--pitch8-primary-note:      #a16a58;

				--pitch9-secondary-channel: #a62b2b;
				--pitch9-primary-channel:   #ba3c3c;

				--pitch9-secondary-note:    #a62b2b;
				--pitch9-primary-note:      #ba3c3c;

				--pitch10-secondary-channel:#ba497c;
				--pitch10-primary-channel:  #d46195;

				--pitch10-secondary-note:   #ba497c;
				--pitch10-primary-note:     #d46195;

				--noise1-secondary-channel: #6F6F6F;
				--noise1-primary-channel:   #AAAAAA;

				--noise1-secondary-note:    #A7A7A7;
				--noise1-primary-note:      #E0E0E0;

				--noise2-secondary-channel: #996633;
				--noise2-primary-channel:   #DDAA77;
				--noise2-secondary-note:    #CC9966;
				--noise2-primary-note:      #F0D0BB;
				--noise3-secondary-channel: #4A6D8F;
				--noise3-primary-channel:   #77AADD;
				--noise3-secondary-note:    #6F9FCF;
				--noise3-primary-note:      #BBD7FF;
				--noise4-secondary-channel: #7A4F9A;
				--noise4-primary-channel:   #AF82D2;
				--noise4-secondary-note:    #9E71C1;
				--noise4-primary-note:      #D4C1EA;
				--noise5-secondary-channel: #607837;
				--noise5-primary-channel:   #A2BB77;
				--noise5-secondary-note:    #91AA66;
				--noise5-primary-note:      #C5E2B2;
          				--mod1-secondary-channel:   #339955;
					--mod1-primary-channel:     #77fc55;
					--mod1-secondary-note:      #77ff8a;
					--mod1-primary-note:        #cdffee;
					--mod2-secondary-channel:   #993355;
					--mod2-primary-channel:     #f04960;
					--mod2-secondary-note:      #f057a0;
					--mod2-primary-note:        #ffb8de;
					--mod3-secondary-channel:   #553399;
					--mod3-primary-channel:     #8855fc;
					--mod3-secondary-note:      #aa64ff;
					--mod3-primary-note:	    #f8ddff;
					--mod4-secondary-channel:   #a86436;
					--mod4-primary-channel:     #c8a825;
					--mod4-secondary-note:      #e8ba46;
					--mod4-primary-note:        #fff6d3;
					--mod-label-primary:        #999;
					--mod-label-secondary-text: #333;
					--mod-label-primary-text:   black;
					--disabled-note-primary:    #999;
					--disabled-note-secondary:  #666;

					
					
}

			`,
        "Tritanopia": `
:root { 
--page-margin: #000000; 
--editor-background: #000000; 
--hover-preview: white; 
--playhead: rgba(255, 255, 255, 0.9); 
--primary-text: #ffffff; 
--secondary-text: #e5e5e5; 
--inverted-text: #000000; 
--text-selection: rgba(119,68,255,0.99); 
--box-selection-fill: #044b94; 
--loop-accent: #ffffff; 
--link-accent: #8915c8; 
--ui-widget-background: #676767; 
--ui-widget-focus: #696969; 
--pitch-background: #302f36; 
--tonic: #19181c; 
--fifth-note: #1b1924; 
--third-note: #192415;
--white-piano-key: #a6a6a6; 
--black-piano-key: #484848; 
--use-color-formula: false;
			--pitch-channel-limit: 10; 
--track-editor-bg-pitch: #666666; 
--track-editor-bg-pitch-dim: #383838; 
--track-editor-bg-noise: #438240; 
--track-editor-bg-noise-dim: #1e361d; 
--track-editor-bg-mod: #5f419c; 
--track-editor-bg-mod-dim: #3e2b66; 
--multiplicative-mod-slider: #b62326; 
--overwriting-mod-slider: #5f1214; 
--indicator-primary: #ccffdb; 
--indicator-secondary: #55dee6; 
--select2-opt-group: #595959; 
--input-box-outline: #ffffff; 
--mute-button-normal: #f11d22; 
--mute-button-mod: #4b57c2; 
--mod-label-primary: #0909ff; 
--mod-label-secondary-text: #ffffff; 
--mod-label-primary-text: #c8ecfd; 
				--pitch1-secondary-channel: #9C0000;
				--pitch1-primary-channel:   #FF0000;

				--pitch1-secondary-note:    #9C0000;
				--pitch1-primary-note:      #FF0000;

				--pitch2-secondary-channel: #8E009C;
				--pitch2-primary-channel:   #EB25FF;

				--pitch2-secondary-note:    #8E009C;
				--pitch2-primary-note:      #EB25FF;

				--pitch3-secondary-channel: #00069C;
				--pitch3-primary-channel:   #3D45FF;

				--pitch3-secondary-note:    #00069C;
				--pitch3-primary-note:      #3D45FF;

				--pitch4-secondary-channel: #00829C;
				--pitch4-primary-channel:   #24DBFF;

				--pitch4-secondary-note:    #00829C;
				--pitch4-primary-note:      #24DBFF;

				--pitch5-secondary-channel: #009C18;
				--pitch5-primary-channel:   #70FF86;

				--pitch5-secondary-note:    #009C18;
				--pitch5-primary-note:      #70FF86;

				--pitch6-secondary-channel: #8E9C00;
				--pitch6-primary-channel:   #DBEF16;

				--pitch6-secondary-note:    #8E9C00;
				--pitch6-primary-note:      #DBEF16;

				--pitch7-secondary-channel: #9C6A00;
				--pitch7-primary-channel:   #F7AC0E;

				--pitch7-secondary-note:    #9C6A00;
				--pitch7-primary-note:      #F7AC0E;

				--pitch8-secondary-channel: #9C2300;
				--pitch8-primary-channel:   #F53700;

				--pitch8-secondary-note:    #9C2300;
				--pitch8-primary-note:      #F53700;

				--pitch9-secondary-channel: #441A0D;
				--pitch9-primary-channel:   #9E3F22;

				--pitch9-secondary-note:    #441A0D;
				--pitch9-primary-note:      #9E3F22;

				--pitch10-secondary-channel:#2C0D44;
				--pitch10-primary-channel:  #7436A4;

				--pitch10-secondary-note:   #2C0D44;
				--pitch10-primary-note:     #7436A4;

				--noise1-secondary-channel: #6F6F6F;
				--noise1-primary-channel:   #AAAAAA;

				--noise1-secondary-note:    #A7A7A7;
				--noise1-primary-note:      #E0E0E0;

				--noise2-secondary-channel: #996633;
				--noise2-primary-channel:   #DDAA77;
				--noise2-secondary-note:    #CC9966;
				--noise2-primary-note:      #F0D0BB;
				--noise3-secondary-channel: #4A6D8F;
				--noise3-primary-channel:   #77AADD;
				--noise3-secondary-note:    #6F9FCF;
				--noise3-primary-note:      #BBD7FF;
				--noise4-secondary-channel: #7A4F9A;
				--noise4-primary-channel:   #AF82D2;
				--noise4-secondary-note:    #9E71C1;
				--noise4-primary-note:      #D4C1EA;
				--noise5-secondary-channel: #607837;
				--noise5-primary-channel:   #A2BB77;
				--noise5-secondary-note:    #91AA66;
				--noise5-primary-note:      #C5E2B2;
          				--mod1-secondary-channel:   #339955;
					--mod1-primary-channel:     #77fc55;
					--mod1-secondary-note:      #77ff8a;
					--mod1-primary-note:        #cdffee;
					--mod2-secondary-channel:   #993355;
					--mod2-primary-channel:     #f04960;
					--mod2-secondary-note:      #f057a0;
					--mod2-primary-note:        #ffb8de;
					--mod3-secondary-channel:   #553399;
					--mod3-primary-channel:     #8855fc;
					--mod3-secondary-note:      #aa64ff;
					--mod3-primary-note:	    #f8ddff;
					--mod4-secondary-channel:   #a86436;
					--mod4-primary-channel:     #c8a825;
					--mod4-secondary-note:      #e8ba46;
					--mod4-primary-note:        #fff6d3;
					--mod-label-primary:        #999;
					--mod-label-secondary-text: #333;
					--mod-label-primary-text:   black;
					--disabled-note-primary:    #999;
					--disabled-note-secondary:  #666;
					
					
}

			`,
        "Deuteranopia": `
    :root {
    --page-margin: #000;
    --editor-background: #060606;
    --hover-preview: #fff;
    --playhead: rgb(255, 255, 255);
    --primary-text: #fff;
    --secondary-text: #fff;
    --inverted-text: #000;
    --text-selection: rgba(126, 126, 126, .99);
    --box-selection-fill: #b74a4a;
    --loop-accent: #7744FF;
    --link-accent: #7744FF;
    --ui-widget-background: #484848;
    --ui-widget-focus: #3e3e3e;
    --pitch-background: #3e3e3e;
    --tonic: #861057;
    --fifth-note: #7e7e7e;
	--third-note: #486;
    --use-color-formula: false;
			--pitch-channel-limit: 10;
    --track-editor-bg-pitch: #666161;
    --track-editor-bg-pitch-dim: #3e3e3e;
    --track-editor-bg-noise: #474747;
    --track-editor-bg-noise-dim: #1a1a1a;
    --track-editor-bg-mod: #474747;
    --track-editor-bg-mod-dim: #1a1a1a;
    --multiplicative-mod-slider: #868686;
    --overwriting-mod-slider: #fff;
    --indicator-primary: #fff;
    --indicator-secondary: #535353;
    --select2-opt-group: #5d576f;
    --input-box-outline: #626262;
    --mute-button-normal: #ffdc00;
    --mute-button-mod: #0027ff;
    --mod-label-primary: #2b2b2b;

    --pitch1-secondary-channel: #0082BB;
  --pitch1-primary-channel: #B1E8FF;
  --pitch1-secondary-note: #0082BB;
  --pitch1-primary-note: #B1E8FF;
  --pitch2-secondary-channel: #005F88;
  --pitch2-primary-channel: #00B2FF;
  --pitch2-secondary-note: #005F88;
  --pitch2-primary-note: #00B2FF;
  --pitch3-secondary-channel: #0E0090;
  --pitch3-primary-channel: #5196ff;
  --pitch3-secondary-note: #0E0090;
  --pitch3-primary-note: #5196ff;
  --pitch4-secondary-channel: #001540;
  --pitch4-primary-channel: #0041CA;
  --pitch4-secondary-note: #001b55;
  --pitch4-primary-note: #0041CA;
  --pitch5-secondary-channel: #936e21;
  --pitch5-primary-channel: #ffb300;
  --pitch5-secondary-note: #936e21;
  --pitch5-primary-note: #ffbe23;
  --pitch6-secondary-channel: #ca5b00;
  --pitch6-primary-channel: #faff52;
  --pitch6-secondary-note: #ca5b00;
  --pitch6-primary-note: #faff52;
  --pitch7-secondary-channel: #75714a;
  --pitch7-primary-channel: #fff3b8;
  --pitch7-secondary-note: #75714a;
  --pitch7-primary-note: #fff3b8;
  --pitch8-secondary-channel: #9c4100;
  --pitch8-primary-channel: #fc0;
  --pitch8-secondary-note: #9c4100;
  --pitch8-primary-note: #fc0;
  --pitch9-secondary-channel: #8d4d00;
  --pitch9-primary-channel: #ff9b20;
  --pitch9-secondary-note: #8d4d00;
  --pitch9-primary-note: #ff9b20;
  --pitch10-secondary-channel: #a28f00;
  --pitch10-primary-channel: #ffac55;
  --pitch10-secondary-note: #a28f00;
  --pitch10-primary-note: #ffac55;
  --noise1-secondary-channel: #868686;
  --noise1-primary-channel: #fff;
  --noise1-secondary-note: #868686;
  --noise1-primary-note: #fff;
  --noise2-secondary-channel: #ad5600;
  --noise2-primary-channel: #ffd300;
  --noise2-secondary-note: #ad5600;
  --noise2-primary-note: #ffd300;
  --noise3-secondary-channel: #4f2f00;
  --noise3-primary-channel: #fff3bc;
  --noise3-secondary-note: #4f2f00;
  --noise3-primary-note: #fff3bc;
  --noise4-secondary-channel: #0070ff;
  --noise4-primary-channel: #84f1ff;
  --noise4-secondary-note: #0070ff;
  --noise4-primary-note: #84f1ff;
  --noise5-secondary-channel: #00c4b2;
  --noise5-primary-channel: #4198ff;
  --noise5-secondary-note: #00c4b2;
  --noise5-primary-note: #4198ff;
  --mod1-secondary-channel: #00046c;
  --mod1-primary-channel: #00faff;
  --mod1-secondary-note: #00046c;
  --mod1-primary-note: #00faff;
  --mod2-secondary-channel: #d25a00;
  --mod2-primary-channel: #fdff00;
  --mod2-secondary-note: #d25a00;
  --mod2-primary-note: #fdff00;
  --mod3-secondary-channel: #5a5a5a;
  --mod3-primary-channel: #fff;
  --mod3-secondary-note: #5a5a5a;
  --mod3-primary-note: #fff;
  --mod4-secondary-channel: #006dfb;
  --mod4-primary-channel: #0ce7ff;
  --mod4-secondary-note: #006dfb;
  --mod4-primary-note: #0ce7ff;
  --disabled-note-primary: #8d8d8d;
  --disabled-note-secondary: #363636;

  
  
    }

			`,
		
		
		
        "jummbox light": `
				:root {
					-webkit-text-stroke-width: 0.5px;
					--page-margin: #cab1d3;
					--editor-background: #f4f4f4;
					--hover-preview: #2d26a2;
					--playhead: rgb(20 25 153 / 90%);
					--primary-text: #b686c3;
					--secondary-text: #970f38;
					--inverted-text: #fefdff;
					--text-selection: rgb(56 21 8 / 99%);
					--box-selection-fill: rgb(20 203 160 / 61%);
					--loop-accent: #09dc0e;
					--link-accent: #3ee669;
					--ui-widget-background: #0e0a42;
					--ui-widget-focus: #380c42;
					--pitch-background: #8daf96;
					--tonic: #a16fb1;
					--fifth-note: #d08c8c;
					--white-piano-key: #fbffee;
					--black-piano-key: #c9d8e5;
					--white-piano-key-text: #101160;
					--black-piano-key-text: #231b03;
					--use-color-formula: true;
					--track-editor-bg-pitch: #34456a;
					--track-editor-bg-pitch-dim: #88afad;
					--track-editor-bg-noise: #564566;
					--track-editor-bg-noise-dim: #aaa;
					--track-editor-bg-mod: #7f779d;
					--track-editor-bg-mod-dim: #aaa;
					--multiplicative-mod-slider: #807caf;
					--overwriting-mod-slider: #909cdf;
					--indicator-primary: #ae38ff;
					--indicator-secondary: #5c8dbb;
					--select2-opt-group: #581b50;
					--input-box-outline: #6f7074;
					--mute-button-normal: #db1e00;
					--mute-button-mod: #883bf9;
					--mod-label-primary: #525297;
					--mod-label-secondary-text: rgb(197 147 245);
					--mod-label-primary-text: #a3aae9;
                    --pitch-secondary-channel-hue: 26;
                    --pitch-secondary-channel-hue-scale: 214.5;
                    --pitch-secondary-channel-sat: 74.3;
                    --pitch-secondary-channel-sat-scale: -0.1;
					--pitch-secondary-channel-lum: 55;
					--pitch-secondary-channel-lum-scale: -0.05;
					--pitch-primary-channel-hue: 26;
					--pitch-primary-channel-hue-scale: 214.5;
					--pitch-primary-channel-sat: 74;
					--pitch-primary-channel-sat-scale: -0.1;
					--pitch-primary-channel-lum: 65.5;
					--pitch-primary-channel-lum-scale: -0.05;
					--pitch-secondary-note-hue: 26;
					--pitch-secondary-note-hue-scale: 214.5;
					--pitch-secondary-note-sat: 74.9;
					--pitch-secondary-note-sat-scale: -0.1;
					--pitch-secondary-note-lum: 70;
					--pitch-secondary-note-lum-scale: -0.05;
					--pitch-primary-note-hue: 26;
					--pitch-primary-note-hue-scale: 214.5;
					--pitch-primary-note-sat: 85;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 64.6;
					--pitch-primary-note-lum-scale: -0.025;
					--noise-secondary-channel-hue: 220;
					--noise-secondary-channel-hue-scale: 2;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 62;
					--noise-secondary-channel-lum-scale: -0.1;
					--noise-primary-channel-hue: 220;
					--noise-primary-channel-hue-scale: 2;
					--noise-primary-channel-sat: 53;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 53.5;
					--noise-primary-channel-lum-scale: -0.1;
					--noise-secondary-note-hue: 220;
					--noise-secondary-note-hue-scale: 2;
					--noise-secondary-note-sat: 58.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 85;
					--noise-secondary-note-lum-scale: -1;
					--noise-primary-note-hue: 220;
					--noise-primary-note-hue-scale: 2;
					--noise-primary-note-sat: 56.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 54;
					--noise-primary-note-lum-scale: -1;
					--mod-secondary-channel-hue: 90;
					--mod-secondary-channel-hue-scale: 1.5;
					--mod-secondary-channel-sat: 88;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 60;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 90;
					--mod-primary-channel-hue-scale: 1.5;
					--mod-primary-channel-sat: 89;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 65;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 90;
					--mod-secondary-note-hue-scale: 1.5;
					--mod-secondary-note-sat: 79;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 95;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 90;
					--mod-primary-note-hue-scale: 1.5;
					--mod-primary-note-sat: 79;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 55;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary:    #868;
					--disabled-note-secondary:  #767;
				}

				.beepboxEditor button, .beepboxEditor select {
					background-color: var(--secondary-text);
				}

				.select2-selection__rendered {
					background-color: var(--secondary-text);
				}

				.beepboxEditor .piano-button::before {
					display: none;
				}

				.promptContainerBG::before {
					box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
				}
			`,
        "amoled dark": `
				:root {
					--page-margin: #000;
					--editor-background: #020406;
					--playhead: rgba(255, 255, 255, 0.9);
					--secondary-text: #8e88ce;
					--box-selection-fill: #044b94;
					--loop-accent: #ad38f9;
					--link-accent: #bd25ff;
					--ui-widget-background: #080d1f;
					--ui-widget-focus: #060f2d;
					--pitch-background: #02060b;
					--tonic: #00113a;
					--fifth-note: #1b0019;
					--white-piano-key: #02040c;
					--black-piano-key: #02040c;
                    --white-piano-key-text: #fff;
					--use-color-formula: true;
					--track-editor-bg-pitch: #050829;
					--track-editor-bg-pitch-dim: #010213;
					--track-editor-bg-noise: #051529;
					--track-editor-bg-noise-dim: #010b13;
					--track-editor-bg-mod: #150529;
					--track-editor-bg-mod-dim: #0a0113;
					--multiplicative-mod-slider: #2b409c;
					--overwriting-mod-slider: #6850b5;
					--indicator-primary: #7f3bec;
					--indicator-secondary: #213888;
					--select2-opt-group: #1d123c;
					--input-box-outline: #1b1e48;
					--mute-button-normal: #d234b0;
					--mute-button-mod: #263d98;
					--mod-label-primary: #090910;
					--mod-label-secondary-text: rgb(73, 69, 214);
					--mod-label-primary-text: white;
					--pitch-secondary-channel-hue: 183;
					--pitch-secondary-channel-hue-scale: 158.7;
					--pitch-secondary-channel-sat: 83.3;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 40;
					--pitch-secondary-channel-lum-scale: 0.05;
					--pitch-primary-channel-hue: 183;
					--pitch-primary-channel-hue-scale: 158.7;
					--pitch-primary-channel-sat: 100;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 67.5;
					--pitch-primary-channel-lum-scale: 0.05;
					--pitch-secondary-note-hue: 183;
					--pitch-secondary-note-hue-scale: 158.7;
					--pitch-secondary-note-sat: 93.9;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 25;
					--pitch-secondary-note-lum-scale: 0.05;
					--pitch-primary-note-hue: 183;
					--pitch-primary-note-hue-scale: 158.7;
					--pitch-primary-note-sat: 100;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 85.6;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 30;
					--noise-secondary-channel-hue-scale: 2;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 42;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 30;
					--noise-primary-channel-hue-scale: 2;
					--noise-primary-channel-sat: 33;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 63.5;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 30;
					--noise-secondary-note-hue-scale: 2;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 55;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 30;
					--noise-primary-note-hue-scale: 2;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 74;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 0;
					--mod-secondary-channel-hue-scale: 1.5;
					--mod-secondary-channel-sat: 88;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 0;
					--mod-primary-channel-hue-scale: 1.5;
					--mod-primary-channel-sat: 96;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 0;
					--mod-secondary-note-hue-scale: 1.5;
					--mod-secondary-note-sat: 92;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 45;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 0;
					--mod-primary-note-hue-scale: 1.5;
					--mod-primary-note-sat: 96;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 85;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary: #91879f;
					--disabled-note-secondary: #6a677a;
				}

			`,
        "beachcombing": `
			:root {
			  --page-margin: #010121;
  --editor-background: #020222;
  --hover-preview: #f3ffff;
  --playhead: #fff;
  --primary-text: #c1f1ff;
  --secondary-text: #546775;
  --box-selection-fill: #3e0028;
  --loop-accent: #5e68fffc;
  --link-accent: #ff3ad5fc;
  --ui-widget-background: #1f2b52;
  --ui-widget-focus: #384e91;
  --pitch-background: #2c3155;
  --tonic: #935175;
  --fifth-note: #1f569f;
  --white-piano-key: #f3f2ff;
  --black-piano-key: #4b4471;
  --white-piano-key-text: #4b4471;
  --track-editor-bg-pitch: #34406c;
  --track-editor-bg-pitch-dim: #121931;
  --track-editor-bg-noise: #562e3b;
  --track-editor-bg-noise-dim: #161313;
  --track-editor-bg-mod: #372e66;
  --track-editor-bg-mod-dim: #2a1640;
  --multiplicative-mod-slider: #606c9f;
  --overwriting-mod-slider: #6850b5;
  --indicator-primary: #ff8bd1;
  --indicator-secondary: #393e4f;
  --select2-opt-group: #5d576f;
  --input-box-outline: #222;
  --mute-button-normal: #7ce1ff;
  --mute-button-mod: #db519d;
  --pitch1-secondary-channel: #329b70;
  --pitch1-primary-channel: #53ffb8;
  --pitch1-secondary-note: #4cb98c;
  --pitch1-primary-note: #98ffd4;
  --pitch2-secondary-channel: #b08e4d;
  --pitch2-primary-channel: #ffe185;
  --pitch2-secondary-note: #91782e;
  --pitch2-primary-note: #ffd968;
  --pitch3-secondary-channel: #018e8e;
  --pitch3-primary-channel: #3de4ff;
  --pitch3-secondary-note: #24b7b7;
  --pitch3-primary-note: #a7ffff;
  --pitch4-secondary-channel: #792354;
  --pitch4-primary-channel: #ff68bd;
  --pitch4-secondary-note: #a73c78;
  --pitch4-primary-note: #ff98d2;
  --pitch5-secondary-channel: #185aab;
  --pitch5-primary-channel: #6493ff;
  --pitch5-secondary-note: #3e99d9;
  --pitch5-primary-note: #b3e3ff;
  --pitch6-secondary-channel: #953C47;
  --pitch6-primary-channel: #FF7888;
  --pitch6-secondary-note: #DF4F60;
  --pitch6-primary-note: #FFB2BB;
  --pitch7-secondary-channel: #4f007d;
  --pitch7-primary-channel: #a54cd9;
  --pitch7-secondary-note: #732b9d;
  --pitch7-primary-note: #d386ff;
  --pitch8-secondary-channel: #323c99;
  --pitch8-primary-channel: #1b61ff;
  --pitch8-secondary-note: #1848b3;
  --pitch8-primary-note: #6f9bff;
  --pitch9-secondary-channel: #1F605A;
  --pitch9-primary-channel: #69FFEA;
  --pitch9-secondary-note: #178076;
  --pitch10-secondary-channel: #6D438C;
  --pitch10-secondary-note: #8040B0;
  --noise1-secondary-channel: #635070;
  --noise1-primary-channel: #9071db;
  --noise1-secondary-note: #915dc1;
  --noise1-primary-note: #c5a5ff;
  --noise2-secondary-channel: #993367;
  --noise2-primary-channel: #dd777c;
  --noise2-secondary-note: #cc6695;
  --noise2-primary-note: #f0bbd1;
  --noise3-secondary-channel: #4a8c8f;
  --noise3-primary-channel: #77c5dd;
  --noise3-secondary-note: #6fb4cf;
  --noise3-primary-note: #bbf2ff;
  --noise4-secondary-channel: #8e3e7d;
  --noise4-primary-channel: #c682d2;
  --noise4-secondary-note: #b871c1;
  --noise4-primary-note: #ffb8f0;
  --noise5-secondary-channel: #785e37;
  --noise5-primary-channel: #bb9d77;
  --noise5-secondary-note: #aa8c66;
  --noise5-primary-note: #e2d1b2;
  --mod1-secondary-channel: #4e8397;
  --mod1-primary-channel: #92e6f3;
  --mod1-secondary-note: #76b9d9;
  --mod1-primary-note: #cde3ff;
  --mod2-secondary-channel: #ad5774;
  --mod2-primary-channel: #eba4ae;
  --mod2-secondary-note: #c9719b;
  --mod2-primary-note: #fdcee7;
  --mod3-secondary-channel: #6f579f;
  --mod3-primary-channel: #b192f7;
  --mod3-secondary-note: #7c3fc8;
  --mod4-secondary-channel: #a88a36;
  --mod4-primary-channel: #bec825;
  --mod4-secondary-note: #aecb57;
  --mod4-primary-note: #dee9bd;
  --mod-label-primary: #2c2c56;
  --mod-label-secondary-text: rgb(71,69,147);
  --mod-label-primary-text: white;
  --disabled-note-primary: #91879f;
  --disabled-note-secondary: #6a677a;


			}
		`,
        "roe": `
			:root {
			--page-margin: #050000;
			--editor-background: #050000;
			--primary-text: #b8cee0;
			--secondary-text: #cb3434;
			--text-selection: rgb(255 68 68 / 99%);
			--box-selection-fill: rgb(255 0 0 / 30%);
			--loop-accent: #7744FF;
			--link-accent: #FF2A2A;
			--ui-widget-background: #1a2642;
			--ui-widget-focus: #2c3f6d;
			--pitch-background: #15111a;
			--tonic: #1b3041;
			--fifth-note: #381818;
			--white-piano-key: #cdcdcd;
			--black-piano-key: #232323;
			--track-editor-bg-pitch: #302938;
			--track-editor-bg-pitch-dim: #211c26;
			--track-editor-bg-noise: #261f42;
			--track-editor-bg-noise-dim: #1a152d;
			--track-editor-bg-mod: #183049;
			--track-editor-bg-mod-dim: #102132;
			--multiplicative-mod-slider: #344a7f;
			--overwriting-mod-slider: #344a7f;
			--indicator-primary: #FF2A2A;
			--indicator-secondary: #800000;
			--select2-opt-group: #141e34;
			--input-box-outline: #141e34;
			--mute-button-normal: #299eff;
			--mute-button-mod: #165a93;
			--pitch1-secondary-channel: #273c90;
			--pitch1-primary-channel: #476BFF;
			--pitch1-secondary-note: #273c90;
			--pitch1-primary-note: #476BFF;
			--pitch2-secondary-channel: #3a3898;
			--pitch2-primary-channel: #625FFB;
			--pitch2-secondary-note: #3a3898;
			--pitch2-primary-note: #625FFB;
			--pitch3-secondary-channel: #542780;
			--pitch3-primary-channel: #9C49EC;
			--pitch3-secondary-note: #542780;
			--pitch3-primary-note: #9C49EC;
			--pitch4-secondary-channel: #84225d;
			--pitch4-primary-channel: #fd3fb1;
			--pitch4-secondary-note: #84225d;
			--pitch4-primary-note: #fd3fb1;
			--pitch5-secondary-channel: #8d2323;
			--pitch5-primary-channel: #ff3f3f;
			--pitch5-secondary-note: #8d2323;
			--pitch5-primary-note: #ff3f3f;
			--pitch6-secondary-channel: #84225d;
			--pitch6-primary-channel: #fd3fb1;
			--pitch6-secondary-note: #84225d;
			--pitch6-primary-note: #fd3fb1;
			--pitch7-secondary-channel: #542780;
			--pitch7-primary-channel: #9C49EC;
			--pitch7-secondary-note: #542780;
			--pitch7-primary-note: #9C49EC;
			--pitch8-secondary-channel: #3a3898;
			--pitch8-primary-channel: #625FFB;
			--pitch8-secondary-note: #3a3898;
			--pitch8-primary-note: #625FFB;
			--pitch9-secondary-channel: #273c90;
			--pitch9-primary-channel: #476BFF;
			--pitch9-secondary-note: #273c90;
			--pitch9-primary-note: #476BFF;
			--pitch10-secondary-channel: #165a93;
			--pitch10-primary-channel: #299EFF;
			--pitch10-secondary-note: #165a93;
			--pitch10-primary-note: #299EFF;
			--noise1-secondary-channel: #4281FF;
			--noise1-primary-channel: #96b9ff;
			--noise1-secondary-note: #4281FF;
			--noise1-primary-note: #96b9ff;
			--noise2-secondary-channel: #7347FF;
			--noise2-primary-channel: #c3b0ff;
			--noise2-secondary-note: #7347FF;
			--noise2-primary-note: #c3b0ff;
			--noise3-secondary-channel: #9F3CBF;
			--noise3-primary-channel: #e29cf9;
			--noise3-secondary-note: #9F3CBF;
			--noise3-primary-note: #e29cf9;
			--noise4-secondary-channel: #D3326F;
			--noise4-primary-channel: #fb9bbf;
			--noise4-secondary-note: #D3326F;
			--noise4-primary-note: #fb9bbf;
			--noise5-secondary-channel: #FF2A2A;
			--noise5-primary-channel: #ffa2a2;
			--noise5-secondary-note: #FF2A2A;
			--noise5-primary-note: #ffa2a2;
			--mod1-secondary-channel: #47587a;
			--mod1-primary-channel: #96b9ff;
			--mod1-secondary-note: #47587a;
			--mod1-primary-note: #96b9ff;
			--mod2-secondary-channel: #716791;
			--mod2-primary-channel: #c3b0ff;
			--mod2-secondary-note: #716791;
			--mod2-primary-note: #c3b0ff;
			--mod3-secondary-channel: #6f4c7b;
			--mod3-primary-channel: #e29cf9;
			--mod3-secondary-note: #6f4c7b;
			--mod3-primary-note: #e29cf9;
			--mod4-secondary-channel: #9e6279;
			--mod4-primary-channel: #fb9bbf;
			--mod4-secondary-note: #9e6279;
			--mod4-primary-note: #fb9bbf;
			--mod-label-primary: #15111a;
			--mod-label-secondary-text: #cb3434;
			--mod-label-primary-text: white;
			--disabled-note-primary: #c9c9c9;
			--disabled-note-secondary: #616161;
		}`,
        "moonlight": `
			:root {
			--page-margin: #020514;
			--editor-background: #020514;
			--primary-text: #D4DCE9;
			--secondary-text: #3E87DA;
			--text-selection: #03599bd9;
			--box-selection-fill: hsl(206deg 66% 41% / 85%);
			--loop-accent: #639BD6;
			--link-accent: #A8C6E8;
			--ui-widget-background: #1e2940;
			--ui-widget-focus: #324b81;
			--pitch-background: #223849;
			--tonic: #33536c;
			--fifth-note: hsl(206deg 36% 16%);
			--white-piano-key: #c1bfe9;
			--black-piano-key: #454354;
			--track-editor-bg-pitch: #25568d80;
			--track-editor-bg-pitch-dim: #10253c80;
			--track-editor-bg-noise: #25568d80;
			--track-editor-bg-noise-dim: #10253c80;
			--track-editor-bg-mod: #25568d80;
			--track-editor-bg-mod-dim: #10253c80;
			--multiplicative-mod-slider: #0476cd;
			--overwriting-mod-slider: #035899;
			--indicator-primary: #57a1f4;
			--indicator-secondary: #2e5684;
			--select2-opt-group: #24355c;
			--input-box-outline: #141e34;
			--mute-button-normal: #6ebffc;
			--mute-button-mod: #0a92fa;
			--pitch1-secondary-channel: #47425c;
			--pitch1-primary-channel: #918bac;
			--pitch1-secondary-note: #6b6489;
			--pitch1-primary-note: #a8a3bf;
			--pitch2-secondary-channel: #626493;
			--pitch2-primary-channel: #bdbed3;
			--pitch2-secondary-note: #626493;
			--pitch2-primary-note: #bdbed3;
			--pitch3-secondary-channel: #6e89b4;
			--pitch3-primary-channel: #d4dce9;
			--pitch3-secondary-note: #6e89b4;
			--pitch3-primary-note: #d4dce9;
			--pitch4-secondary-channel: #4c77a9;
			--pitch4-primary-channel: #a8c6e8;
			--pitch4-secondary-note: #4c77a9;
			--pitch4-primary-note: #a8c6e8;
			--pitch5-secondary-channel: #314e6d;
			--pitch5-primary-channel: #639bd6;
			--pitch5-secondary-note: #46698f;
			--pitch5-primary-note: #639bd6;
			--pitch6-secondary-channel: #143d6b;
			--pitch6-primary-channel: #3e87da;
			--pitch6-secondary-note: #143d6b;
			--pitch6-primary-note: #3e87da;
			--pitch7-secondary-channel: #314e6d;
			--pitch7-primary-channel: #639bd6;
			--pitch7-secondary-note: #314e6d;
			--pitch7-primary-note: #639bd6;
			--pitch8-secondary-channel: #4c77a9;
			--pitch8-primary-channel: #a8c6e8;
			--pitch8-secondary-note: #4c77a9;
			--pitch8-primary-note: #a8c6e8;
			--pitch9-secondary-channel: #6e89b4;
			--pitch9-primary-channel: #d4dce9;
			--pitch9-secondary-note: #6e89b4;
			--pitch9-primary-note: #d4dce9;
			--pitch10-secondary-channel: #626493;
			--pitch10-primary-channel: #bdbed3;
			--pitch10-secondary-note: #626493;
			--pitch10-primary-note: #bdbed3;
			--noise1-secondary-channel: #4b4a55;
			--noise1-primary-channel: #9795a3;
			--noise1-secondary-note: #4b4a55;
			--noise1-primary-note: #9795a3;
			--noise2-secondary-channel: #858e9d;
			--noise2-primary-channel: #d7dce5;
			--noise2-secondary-note: #858e9d;
			--noise2-primary-note: #d7dce5;
			--noise3-secondary-channel: #394e65;
			--noise3-primary-channel: #809bb7;
			--noise3-secondary-note: #394e65;
			--noise3-primary-note: #809bb7;
			--noise4-secondary-channel: #37577b;
			--noise4-primary-channel: #6189b8;
			--noise4-secondary-note: #37577b;
			--noise4-primary-note: #6189b8;
			--noise5-secondary-channel: #223849;
			--noise5-primary-channel: #5588af;
			--noise5-secondary-note: #223849;
			--noise5-primary-note: #5588af;
			--mod1-secondary-channel: #3e336c;
			--mod1-primary-channel: #6d60a4;
			--mod1-secondary-note: #3e336c;
			--mod1-primary-note: #6d60a4;
			--mod2-secondary-channel: #716791;
			--mod2-primary-channel: #bdbed3;
			--mod2-secondary-note: #716791;
			--mod2-primary-note: #bdbed3;
			--mod3-secondary-channel: #6b91bd;
			--mod3-primary-channel: #4b8fdd;
			--mod3-secondary-note: #597ca7;
			--mod3-primary-note: #7eade3;
			--mod4-secondary-channel: #14559f;
			--mod4-primary-channel: #3386e6;
			--mod4-secondary-note: #14559f;
			--mod4-primary-note: #3386e6;
			--mod-label-primary: #1e2940;
			--mod-label-secondary-text: #748ebe;
			--mod-label-primary-text: white;
			--disabled-note-primary: #828282;
			--disabled-note-secondary: #4f4f4f;
			}`,
        "autumn": `
		:root {
			--page-margin: #060304;
			--editor-background: #060304;
			--text-selection: rgb(115 80 76);
			--box-selection-fill: rgb(174 73 81 / 45%);
			--loop-accent: #834A69;
			--ui-widget-background: #2a2523;
			--ui-widget-focus: #4e4c44;
			--pitch-background: #121212;
			--tonic: #4f4f4f;
			--fifth-note: #222;
			--white-piano-key: #b59b9b;
			--black-piano-key: #231e1e;
			--track-editor-bg-pitch: #352f38;
			--track-editor-bg-pitch-dim: #232025;
			--track-editor-bg-noise: #3c3029;
			--track-editor-bg-noise-dim: #251d19;
			--track-editor-bg-mod: #202623;
			--track-editor-bg-mod-dim: #131715;
			--multiplicative-mod-slider: #D9D16E;
			--overwriting-mod-slider: #2D826F;
			--indicator-primary: #D9D16E;
			--indicator-secondary: #444226;
			--select2-opt-group: #20191c;
			--input-box-outline: #20191c;
			--mute-button-normal: var(--pitch2-primary-channel);
			--mute-button-mod: var(--pitch4-primary-channel);
			--pitch1-secondary-channel: #704a34;
			--pitch1-primary-channel: #D9895A;
			--pitch1-secondary-note: #704a34;
			--pitch1-primary-note: #D9895A;
			--pitch2-secondary-channel: #5f3538;
			--pitch2-primary-channel: #AE4951;
			--pitch2-secondary-note: #5f3538;
			--pitch2-primary-note: #AE4951;
			--pitch3-secondary-channel: #5c4336;
			--pitch3-primary-channel: #CA9A81;
			--pitch3-secondary-note: #5c4336;
			--pitch3-primary-note: #CA9A81;
			--pitch4-secondary-channel: #1d3143;
			--pitch4-primary-channel: #386995;
			--pitch4-secondary-note: #1d3143;
			--pitch4-primary-note: #386995;
			--pitch5-secondary-channel: #9c8a58;
			--pitch5-primary-channel: #D9D16E;
			--pitch5-secondary-note: #7c783f;
			--pitch5-primary-note: #D9D16E;
			--pitch6-secondary-channel: #886562;
			--pitch6-primary-channel: #D3A9A5;
			--pitch6-secondary-note: #886562;
			--pitch6-primary-note: #D3A9A5;
			--pitch7-secondary-channel: #1c3f37;
			--pitch7-primary-channel: #2D826F;
			--pitch7-secondary-note: #1c3f37;
			--pitch7-primary-note: #2D826F;
			--pitch8-secondary-channel: #442e2d;
			--pitch8-primary-channel: #815150;
			--pitch8-secondary-note: #442e2d;
			--pitch8-primary-note: #815150;
			--pitch9-secondary-channel: #8e6f60;
			--pitch9-primary-channel: #E5B8A1;
			--pitch9-secondary-note: #8e6f60;
			--pitch9-primary-note: #E5B8A1;
			--pitch10-secondary-channel: #4f3142;
			--pitch10-primary-channel: #834A69;
			--pitch10-secondary-note: #4f3142;
			--pitch10-primary-note: #834A69;
			--noise1-secondary-channel: #6b5346;
			--noise1-primary-channel: #b99c89;
			--noise1-secondary-note: #6b5346;
			--noise1-primary-note: #F0D0BB;
			--noise2-secondary-channel: #4a3839;
			--noise2-primary-channel: #9c6b6e;
			--noise2-secondary-note: #4a3839;
			--noise2-primary-note: #c18b8f;
			--noise3-secondary-channel: #2d3c4a;
			--noise3-primary-channel: #536e86;
			--noise3-secondary-note: #2d3c4a;
			--noise3-primary-note: #8fa8c0;
			--noise4-secondary-channel: #273f3a;
			--noise4-primary-channel: #4e8377;
			--noise4-secondary-note: #273f3a;
			--noise4-primary-note: #87baae;
			--noise5-secondary-channel: #372730;
			--noise5-primary-channel: #7f5e70;
			--noise5-secondary-note: #372730;
			--noise5-primary-note: #cc96b3;
			--mod1-secondary-channel: #783f1f;
			--mod1-primary-channel: #dc6d2c;
			--mod1-secondary-note: #783f1f;
			--mod1-primary-note: #dc6d2c;
			--mod2-secondary-channel: #0b3153;
			--mod2-primary-channel: #1464ac;
			--mod2-secondary-note: #0b3153;
			--mod2-primary-note: #1464ac;
			--mod3-secondary-channel: #075040;
			--mod3-primary-channel: #08a17f;
			--mod3-secondary-note: #075040;
			--mod3-primary-note: #08a17f;
			--mod4-secondary-channel: #631640;
			--mod4-primary-channel: #b4186d;
			--mod4-secondary-note: #631640;
			--mod4-primary-note: #b4186d;
			--mod-label-primary: #000;
			--mod-label-secondary-text: #707070;
			--mod-label-primary-text: white;
			--disabled-note-primary: #5d5d5d;
			--disabled-note-secondary: #292929;
		}`,
        "fruit": `
		:root {
			--page-margin: #040507;
			--editor-background: #040507;
			--text-selection: rgb(115 103 76);
			--box-selection-fill: rgb(174 109 73 / 45%);
			--loop-accent: #EC897D;
			--link-accent: #FDE484;
			--ui-widget-background: #22222c;
			--ui-widget-focus: #39394c;
			--pitch-background: #101010;
			--tonic: #2c2d34;
			--fifth-note: #191a20;
			--white-piano-key: #bbbaba;
			--black-piano-key: #2d2d2d;
			--track-editor-bg-pitch: #2b2d40;
			--track-editor-bg-pitch-dim: #191a25;
			--track-editor-bg-noise: #3c3644;
			--track-editor-bg-noise-dim: #26222b;
			--track-editor-bg-mod: #322a2a;
			--track-editor-bg-mod-dim: #191515;
			--multiplicative-mod-slider: #977da9;
			--overwriting-mod-slider: #798FA7;
			--indicator-primary: #EAAC9D;
			--indicator-secondary: #5e413a;
			--select2-opt-group: #191920;
			--input-box-outline: #191920;
			--mute-button-normal: #798FA7;
			--mute-button-mod: #354457;
			--pitch1-secondary-channel: #91655a;
			--pitch1-primary-channel: #EAAC9D;
			--pitch1-secondary-note: #91655a;
			--pitch1-primary-note: #EAAC9D;
			--pitch2-secondary-channel: #8f6513;
			--pitch2-primary-channel: #FFAF12;
			--pitch2-secondary-note: #8f6513;
			--pitch2-primary-note: #FFAF12;
			--pitch3-secondary-channel: #212f46;
			--pitch3-primary-channel: #34558B;
			--pitch3-secondary-note: #212f46;
			--pitch3-primary-note: #34558B;
			--pitch4-secondary-channel: #2e6b5b;
			--pitch4-primary-channel: #4EC5A7;
			--pitch4-secondary-note: #2e6b5b;
			--pitch4-primary-note: #4EC5A7;
			--pitch5-secondary-channel: #555D46;
			--pitch5-primary-channel: #aabf84;
			--pitch5-secondary-note: #555D46;
			--pitch5-primary-note: #aabf84;
			--pitch6-secondary-channel: #A2553B;
			--pitch6-primary-channel: #e59a81;
			--pitch6-secondary-note: #A2553B;
			--pitch6-primary-note: #e59a81;
			--pitch7-secondary-channel: #7b4021;
			--pitch7-primary-channel: #FE813E;
			--pitch7-secondary-note: #7b4021;
			--pitch7-primary-note: #FE813E;
			--pitch8-secondary-channel: #847753;
			--pitch8-primary-channel: #EFDAA3;
			--pitch8-secondary-note: #847753;
			--pitch8-primary-note: #EFDAA3;
			--pitch9-secondary-channel: #2c3642;
			--pitch9-primary-channel: #798FA7;
			--pitch9-secondary-note: #2c3642;
			--pitch9-primary-note: #798FA7;
			--pitch10-secondary-channel: #0d4453;
			--pitch10-primary-channel: #107895;
			--pitch10-secondary-note: #0d4453;
			--pitch10-primary-note: #107895;
			--noise1-secondary-channel: #71617C;
			--noise1-primary-channel: #977da9;
			--noise1-secondary-note: #71617C;
			--noise1-primary-note: #977da9;
			--noise2-secondary-channel: #3B3D4A;
			--noise2-primary-channel: #707591;
			--noise2-secondary-note: #3B3D4A;
			--noise2-primary-note: #707591;
			--noise3-secondary-channel: #625f5e;
			--noise3-primary-channel: #A19D9C;
			--noise3-secondary-note: #625f5e;
			--noise3-primary-note: #A19D9C;
			--noise4-secondary-channel: #ab847b;
			--noise4-primary-channel: #EAAC9D;
			--noise4-secondary-note: #ab847b;
			--noise4-primary-note: #EAAC9D;
			--noise5-secondary-channel: #B49D74;
			--noise5-primary-channel: #dec69b;
			--noise5-secondary-note: #B49D74;
			--noise5-primary-note: #dec69b;
			--mod1-secondary-channel: #722124;
			--mod1-primary-channel: #D13A41;
			--mod1-secondary-note: #722124;
			--mod1-primary-note: #D13A41;
			--mod2-secondary-channel: #213657;
			--mod2-primary-channel: #34558B;
			--mod2-secondary-note: #213657;
			--mod2-primary-note: #34558B;
			--mod3-secondary-channel: #555D46;
			--mod3-primary-channel: #848f6d;
			--mod3-secondary-note: #555D46;
			--mod3-primary-note: #848f6d;
			--mod4-secondary-channel: #71617C;
			--mod4-primary-channel: #a68ab9;
			--mod4-secondary-note: #71617C;
			--mod4-primary-note: #a68ab9;
			--mod-label-primary: #282828;
			--mod-label-secondary-text: #707070;
			--mod-label-primary-text: white;
			--disabled-note-primary: #5d5d5d;
			--disabled-note-secondary: #292929;
		}`,
        "sunset": `
		:root {
			--page-margin: #040300;
			--editor-background: #040300;
			--text-selection: rgb(94 0 157);
			--box-selection-fill: rgb(174 173 73 / 45%);
			--loop-accent: #EC897D;
			--link-accent: #FDE484;
			--ui-widget-background: #241b24;
			--ui-widget-focus: #3a2e39;
			--pitch-background: #141414;
			--tonic: #2C212B;
			--fifth-note: #2E2A15;
			--white-piano-key: #bbbaba;
			--black-piano-key: #2d2d2d;
			--track-editor-bg-pitch: #2d2e42;
			--track-editor-bg-pitch-dim: #191a25;
			--track-editor-bg-noise: #393340;
			--track-editor-bg-noise-dim: #26222b;
			--track-editor-bg-mod: #232a2c;
			--track-editor-bg-mod-dim: #151819;
			--multiplicative-mod-slider: #977da9;
			--overwriting-mod-slider: #798FA7;
			--indicator-primary: #F28891;
			--indicator-secondary: #601d23;
			--select2-opt-group: #151015;
			--input-box-outline: #151015;
			--mute-button-normal: #E4739D;
			--mute-button-mod: #9650A6;
			--pitch1-secondary-channel: #7F7721;
			--pitch1-primary-channel: #F3E79A;
			--pitch1-secondary-note: #7F7721;
			--pitch1-primary-note: #F3E79A;
			--pitch2-secondary-channel: #785E20;
			--pitch2-primary-channel: #F7D086;
			--pitch2-secondary-note: #785E20;
			--pitch2-primary-note: #F7D086;
			--pitch3-secondary-channel: #6E4219;
			--pitch3-primary-channel: #F9B881;
			--pitch3-secondary-note: #6E4219;
			--pitch3-primary-note: #F9B881;
			--pitch4-secondary-channel: #79351F;
			--pitch4-primary-channel: #F7A086;
			--pitch4-secondary-note: #79351F;
			--pitch4-primary-note: #F7A086;
			--pitch5-secondary-channel: #81272F;
			--pitch5-primary-channel: #F28891;
			--pitch5-secondary-note: #81272F;
			--pitch5-primary-note: #F28891;
			--pitch6-secondary-channel: #8F224D;
			--pitch6-primary-channel: #E4739D;
			--pitch6-secondary-note: #8F224D;
			--pitch6-primary-note: #E4739D;
			--pitch7-secondary-channel: #611548;
			--pitch7-primary-channel: #CF63A6;
			--pitch7-secondary-note: #611548;
			--pitch7-primary-note: #CF63A6;
			--pitch8-secondary-channel: #561253;
			--pitch8-primary-channel: #B557A9;
			--pitch8-secondary-note: #4D104A;
			--pitch8-primary-note: #B557A9;
			--pitch9-secondary-channel: #4c1260;
			--pitch9-primary-channel: #9650A6;
			--pitch9-secondary-note: #3C0F4C;
			--pitch9-primary-note: #9650A6;
			--pitch10-secondary-channel: #3e1d78;
			--pitch10-primary-channel: #704D9E;
			--pitch10-secondary-note: #27124C;
			--pitch10-primary-note: #704D9E;
			--noise1-secondary-channel: #A7A578;
			--noise1-primary-channel: #EFE9AC;
			--noise1-secondary-note: #A7A578;
			--noise1-primary-note: #EFE9AC;
			--noise2-secondary-channel: #947A5F;
			--noise2-primary-channel: #FBCEA8;
			--noise2-secondary-note: #947A5F;
			--noise2-primary-note: #FBCEA8;
			--noise3-secondary-channel: #A3635D;
			--noise3-primary-channel: #F4A5AB;
			--noise3-secondary-note: #A3635D;
			--noise3-primary-note: #F4A5AB;
			--noise4-secondary-channel: #724D60;
			--noise4-primary-channel: #CD90B6;
			--noise4-secondary-note: #724D60;
			--noise4-primary-note: #CD90B6;
			--noise5-secondary-channel: #503F5C;
			--noise5-primary-channel: #7C6A9E;
			--noise5-secondary-note: #503F5C;
			--noise5-primary-note: #7C6A9E;
			--mod1-secondary-channel: #371883;
			--mod1-primary-channel: #6416C6;
			--mod1-secondary-note: #1F0A52;
			--mod1-primary-note: #6416C6;
			--mod2-secondary-channel: #690645;
			--mod2-primary-channel: #E52FA2;
			--mod2-secondary-note: #690645;
			--mod2-primary-note: #E52FA2;
			--mod3-secondary-channel: #943618;
			--mod3-primary-channel: #eb5b2c;
			--mod3-secondary-note: #943618;
			--mod3-primary-note: #eb5b2c;
			--mod4-secondary-channel: #928409;
			--mod4-primary-channel: #ecd50e;
			--mod4-secondary-note: #928409;
			--mod4-primary-note: #ecd50e;
			--mod-label-primary: #282828;
			--mod-label-secondary-text: #707070;
			--mod-label-primary-text: white;
			--disabled-note-primary: #5d5d5d;
			--disabled-note-secondary: #292929;
		}`,
        "toxic": `
		:root {
			--page-margin: #010003;
			--editor-background: #010003;
			--text-selection: rgb(147 195 0);
			--box-selection-fill: rgb(145 174 73 / 49%);
			--loop-accent: #BCDE2C;
			--link-accent: #edff9f;
			--ui-widget-background: #261e2e;
			--ui-widget-focus: #322042;
			--pitch-background: #141c15;
			--tonic: #282c21;
			--fifth-note: #18221a;
			--white-piano-key: #e3e3e3;
			--black-piano-key: #2d2d2d;
			--track-editor-bg-pitch: #38293e;
			--track-editor-bg-pitch-dim: #251c29;
			--track-editor-bg-noise: #2c304c;
			--track-editor-bg-noise-dim: #191b2b;
			--track-editor-bg-mod: #311b32;
			--track-editor-bg-mod-dim: #1d101e;
			--multiplicative-mod-slider: #977da9;
			--overwriting-mod-slider: #798FA7;
			--indicator-primary: #aae9ff;
			--indicator-secondary: #253e46;
			--select2-opt-group: #110d15;
			--input-box-outline: #110d15;
			--mute-button-normal: #8f5ad1;
			--mute-button-mod: #482574;
			--pitch1-secondary-channel: #6b7f19;
			--pitch1-primary-channel: #BCDE2C;
			--pitch1-secondary-note: #6b7f19;
			--pitch1-primary-note: #BCDE2C;
			--pitch2-secondary-channel: #497a31;
			--pitch2-primary-channel: #7BD152;
			--pitch2-secondary-note: #497a31;
			--pitch2-primary-note: #7BD152;
			--pitch3-secondary-channel: #286b40;
			--pitch3-primary-channel: #45BE71;
			--pitch3-secondary-note: #286b40;
			--pitch3-primary-note: #45BE71;
			--pitch4-secondary-channel: #125140;
			--pitch4-primary-channel: #25A884;
			--pitch4-secondary-note: #125140;
			--pitch4-primary-note: #25A884;
			--pitch5-secondary-channel: #114c49;
			--pitch5-primary-channel: #21908C;
			--pitch5-secondary-note: #114c49;
			--pitch5-primary-note: #21908C;
			--pitch6-secondary-channel: #143843;
			--pitch6-primary-channel: #2B788E;
			--pitch6-secondary-note: #143843;
			--pitch6-primary-note: #2B788E;
			--pitch7-secondary-channel: #1d354e;
			--pitch7-primary-channel: #355F8D;
			--pitch7-secondary-note: #1a2f46;
			--pitch7-primary-note: #355F8D;
			--pitch8-secondary-channel: #2c2e5a;
			--pitch8-primary-channel: #414486;
			--pitch8-secondary-note: #1e1f3d;
			--pitch8-primary-note: #414486;
			--pitch9-secondary-channel: #3c1f5e;
			--pitch9-primary-channel: #5e3b89;
			--pitch9-secondary-note: #25133b;
			--pitch9-primary-note: #5e3b89;
			--pitch10-secondary-channel: #510264;
			--pitch10-primary-channel: #720d8a;
			--pitch10-secondary-note: #440154;
			--pitch10-primary-note: #720d8a;
			--noise1-secondary-channel: #BCDE2C;
			--noise1-primary-channel: #edff9f;
			--noise1-secondary-note: #BCDE2C;
			--noise1-primary-note: #edff9f;
			--noise2-secondary-channel: #45BE71;
			--noise2-primary-channel: #89ffb4;
			--noise2-secondary-note: #45BE71;
			--noise2-primary-note: #89ffb4;
			--noise3-secondary-channel: #21908C;
			--noise3-primary-channel: #72fffa;
			--noise3-secondary-note: #21908C;
			--noise3-primary-note: #72fffa;
			--noise4-secondary-channel: #355F8D;
			--noise4-primary-channel: #7cb6f5;
			--noise4-secondary-note: #355F8D;
			--noise4-primary-note: #7cb6f5;
			--noise5-secondary-channel: #482574;
			--noise5-primary-channel: #8f5ad1;
			--noise5-secondary-note: #48257A;
			--noise5-primary-note: #8f5ad1;
			--mod1-secondary-channel: #815a16;
			--mod1-primary-channel: #F5AB29;
			--mod1-secondary-note: #815a16;
			--mod1-primary-note: #F5AB29;
			--mod2-secondary-channel: #4d341a;
			--mod2-primary-channel: #C98540;
			--mod2-secondary-note: #4d341a;
			--mod2-primary-note: #C98540;
			--mod3-secondary-channel: #643734;
			--mod3-primary-channel: #A75D58;
			--mod3-secondary-note: #643734;
			--mod3-primary-note: #A75D58;
			--mod4-secondary-channel: #461430;
			--mod4-primary-channel: #812359;
			--mod4-secondary-note: #3f112b;
			--mod4-primary-note: #812359;
			--mod-label-primary: #282828;
			--mod-label-secondary-text: #707070;
			--mod-label-primary-text: white;
			--disabled-note-primary: #5d5d5d;
			--disabled-note-secondary: #292929;
		}`,
        "violet verdant": `
		:root {
			--page-margin: #0e031a;
			--editor-background: #0e031a;
			--hover-preview: #e5ffea;
			--playhead: rgba(255, 255, 255, 0.9);
			--primary-text: #f0e0ff;
			--secondary-text: #706087;
			--box-selection-fill: #225835;
			--loop-accent: #8f00fb;
			--link-accent: #82dd5d;
			--ui-widget-background: #303c66;
			--ui-widget-focus: #62559b;
			--pitch-background: #293b52;
			--tonic: #5b46ad;
			--fifth-note: #42604d;
			--white-piano-key: #f6e8ff;
			--black-piano-key: #5a4972;
			--use-color-formula: true;
			--track-editor-bg-pitch: #392a46;
			--track-editor-bg-pitch-dim: #1c1d28;
			--track-editor-bg-noise: #403150;
			--track-editor-bg-noise-dim: #161313;
			--track-editor-bg-mod: #253c25;
			--track-editor-bg-mod-dim: #0c1811;
			--multiplicative-mod-slider: #606c9f;
			--overwriting-mod-slider: #6850b5;
			--indicator-primary: #9c64f7;
			--indicator-secondary: #393e4f;
			--select2-opt-group: #5d576f;
			--input-box-outline: #403150;
			--mute-button-normal: #82dd5d;
			--mute-button-mod: #945de5;
			--mod-label-primary: #312840;
			--mod-label-secondary-text: rgb(88 70 104);
			--mod-label-primary-text: #82dd5d;
			--pitch-secondary-channel-hue: 64;
			--pitch-secondary-channel-hue-scale: 6.1;
			--pitch-secondary-channel-sat: 63.3;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 40;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: 64;
			--pitch-primary-channel-hue-scale: 6.1;
			--pitch-primary-channel-sat: 90;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 67.5;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: 32;
			--pitch-secondary-note-hue-scale: 6.1;
			--pitch-secondary-note-sat: 87.9;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 25;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: 64;
			--pitch-primary-note-hue-scale: 6.1;
			--pitch-primary-note-sat: 90;
			--pitch-primary-note-sat-scale: 0.05;
			--pitch-primary-note-lum: 85.6;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 192;
			--noise-secondary-channel-hue-scale: 2;
			--noise-secondary-channel-sat: 45;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 32;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 192;
			--noise-primary-channel-hue-scale: 2;
			--noise-primary-channel-sat: 33;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 43.5;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 160;
			--noise-secondary-note-hue-scale: 2;
			--noise-secondary-note-sat: 33.5;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 45;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 192;
			--noise-primary-note-hue-scale: 2;
			--noise-primary-note-sat: 46.5;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 74;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 132;
			--mod-secondary-channel-hue-scale: 1.5;
			--mod-secondary-channel-sat: 88;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 50;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 132;
			--mod-primary-channel-hue-scale: 1.5;
			--mod-primary-channel-sat: 96;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 80;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 100;
			--mod-secondary-note-hue-scale: 1.5;
			--mod-secondary-note-sat: 92;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 45;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 132;
			--mod-primary-note-hue-scale: 1.5;
			--mod-primary-note-sat: 96;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 85;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary: #91879f;
			--disabled-note-secondary: #6a677a;
		}`,
        "portal": `
		:root {
			--page-margin: #04081a;
			--editor-background: #04081a;
			--box-selection-fill: rgb(0 72 181);
			--loop-accent: #44d4ff;
			--link-accent: #ffa500;
			--ui-widget-background: #212c4a;
			--ui-widget-focus: #121f42;
			--pitch-background: #1b263e;
			--tonic: #995d00;
			--fifth-note: #0898a1;
			--white-piano-key: #ffffff;
			--black-piano-key: #516d7a;
			--track-editor-bg-pitch: #213352;
			--track-editor-bg-pitch-dim: #152032;
			--track-editor-bg-noise: #403524;
			--track-editor-bg-noise-dim: #2a1f0e;
			--indicator-primary: #5490ff;
			--mute-button-normal: #3372ff;
			--mute-button-mod: #dd872f;
			--pitch1-primary-channel: #77f7ff;
			--pitch2-secondary-channel: #0083a1;
			--pitch2-primary-channel: #35d9ff;
			--pitch2-secondary-note: #0083a1;
			--pitch2-primary-note: #a4eeff;
			--pitch3-secondary-channel: #0074c7;
			--pitch3-primary-channel: #3caeff;
			--pitch3-secondary-note: #00477a;
			--pitch3-primary-note: #aadcff;
			--pitch4-secondary-channel: #0039a1;
			--pitch4-primary-channel: #2673ff;
			--pitch4-secondary-note: #001f56;
			--pitch4-primary-note: #9bbeff;
			--pitch5-secondary-channel: #31148b;
			--pitch5-primary-channel: #7042ff;
			--pitch5-secondary-note: #190656;
			--pitch5-primary-note: #b79fff;
			--pitch6-secondary-channel: #979934;
			--pitch6-primary-channel: #fbff2f;
			--pitch6-secondary-note: #5d5e0a;
			--pitch6-primary-note: #fdff9a;
			--pitch7-secondary-channel: #b78f00;
			--pitch7-primary-channel: #ffd747;
			--pitch7-secondary-note: #5e3d00;
			--pitch7-primary-note: #ffe381;
			--pitch8-secondary-channel: #9d6500;
			--pitch8-primary-channel: #ffa400;
			--pitch8-secondary-note: #583900;
			--pitch8-primary-note: #ffd07c;
			--pitch9-secondary-channel: #744203;
			--pitch9-primary-channel: #ff8e00;
			--pitch9-secondary-note: #502d00;
			--pitch9-primary-note: #ffcb89;
			--pitch10-secondary-channel: #a32d00;
			--pitch10-primary-channel: #ff885b;
			--pitch10-secondary-note: #521700;
			--pitch10-primary-note: #ffb397;
			--noise1-secondary-channel: #6e2210;
			--noise1-primary-channel: #ff4600;
			--noise1-secondary-note: #4c1a08;
			--noise1-primary-note: #ffc9b4;
			--noise2-secondary-channel: #6a3110;
			--noise2-primary-channel: #ff782a;
			--noise2-secondary-note: #4c1f05;
			--noise2-primary-note: #ffb488;
			--noise3-secondary-channel: #72460e;
			--noise3-primary-channel: #d9871f;
			--noise3-secondary-note: #442905;
			--noise3-primary-note: #ffdcae;
			--noise4-secondary-channel: #837a0f;
			--noise4-primary-channel: #f7ea55;
			--noise4-secondary-note: #605906;
			--noise4-primary-note: #fff9ab;
			--noise5-secondary-channel: #8c8f00;
			--noise5-primary-channel: #fdff90;
			--noise5-secondary-note: #606200;
			--noise5-primary-note: #feffbc;
			--mod1-secondary-channel: #561b97;
			--mod1-primary-channel: #aa66f5;
			--mod1-secondary-note: #30075c;
			--mod1-primary-note: #cd9fff;
			--mod2-secondary-channel: #5116df;
			--mod2-primary-channel: #6b2dff;
			--mod2-secondary-note: #36138b;
			--mod2-primary-note: #bea3ff;
			--mod3-secondary-channel: #2535a1;
			--mod3-primary-channel: #3f57ff;
			--mod3-secondary-note: #0e185c;
			--mod3-primary-note: #8494ff;
			--mod4-secondary-channel: #1b5883;
			--mod4-primary-channel: #5eb7f5;
			--mod4-secondary-note: #072f4a;
			--mod4-primary-note: #63beff;
			--mod-label-primary: #24293a;
			--mod-label-secondary-text: #454d4e;
			--mod-label-primary-text: #7bd4ff;
			--disabled-note-primary: #072f4a;
			--disabled-note-secondary: #6585a7;
		}`,
        "fusion": `:root {
			--page-margin: #0c0306;
			--editor-background: #0c0306;
			--primary-text: #26d9cd;
			--secondary-text: #ff6666;
			--inverted-text: white;
			--text-selection: #ffffff;
			--box-selection-fill: #ff00004d;
			--loop-accent: #ff6666;
			--link-accent: white;
			--ui-widget-background: #232323;
			--ui-widget-focus: #303030;
			--pitch-background: hsl(61deg 100% 70% / 25%);
			--tonic: #66a3ff40;
			--fifth-note: #ff666640;
			--white-piano-key: #cdcdcd;
			--black-piano-key: #232323;
			--track-editor-bg-pitch: #404040bf;
			--track-editor-bg-pitch-dim: #151515;
			--track-editor-bg-noise: #404040bf;
			--track-editor-bg-noise-dim: #151515;
			--track-editor-bg-mod: #404040bf;
			--track-editor-bg-mod-dim: #151515;
			--multiplicative-mod-slider: #ef7692;
			--overwriting-mod-slider: #f43e69;
			--indicator-primary: #26d9cd;
			--indicator-secondary: hsl(176deg 70% 25%);
			--select2-opt-group: #232323;
			--input-box-outline: #141e34;
			--mute-button-normal: #26d9cd;
			--mute-button-mod: hsl(346deg 70% 50%);
			--pitch1-secondary-channel: #bf4040;
			--pitch1-primary-channel: #ff6666;
			--pitch1-secondary-note: #bf4040;
			--pitch1-primary-note: #ff6666;
			--pitch2-secondary-channel: #bf5b40;
			--pitch2-primary-channel: #ff8766;
			--pitch2-secondary-note: #bf5b40;
			--pitch2-primary-note: #ff8766;
			--pitch3-secondary-channel: #bf7940;
			--pitch3-primary-channel: #ffab66;
			--pitch3-secondary-note: #bf7940;
			--pitch3-primary-note: #ffab66;
			--pitch4-secondary-channel: #bf9b40;
			--pitch4-primary-channel: #ffd466;
			--pitch4-secondary-note: #bf9b40;
			--pitch4-primary-note: #ffd466;
			--pitch5-secondary-channel: #bdbf40;
			--pitch5-primary-channel: #fcff66;
			--pitch5-secondary-note: #bdbf40;
			--pitch5-primary-note: #fcff66;
			--pitch6-secondary-channel: #9dbf40;
			--pitch6-primary-channel: #d6ff66;
			--pitch6-secondary-note: #9dbf40;
			--pitch6-primary-note: #d6ff66;
			--pitch7-secondary-channel: #9dbf40;
			--pitch7-primary-channel: #fcff66;
			--pitch7-secondary-note: #9dbf40;
			--pitch7-primary-note: #fcff66;
			--pitch8-secondary-channel: #bf9b40;
			--pitch8-primary-channel: #ffd466;
			--pitch8-secondary-note: #bf9b40;
			--pitch8-primary-note: #ffd466;
			--pitch9-secondary-channel: #bf5b40;
			--pitch9-primary-channel: #ffab66;
			--pitch9-secondary-note: #bf5b40;
			--pitch9-primary-note: #ffab66;
			--pitch10-secondary-channel: #d15a1f;
			--pitch10-primary-channel: #ff8766;
			--pitch10-secondary-note: #d15a1f;
			--pitch10-primary-note: #ff8766;
			--noise1-secondary-channel: #4073bf;
			--noise1-primary-channel: #66a3ff;
			--noise1-secondary-note: #4073bf;
			--noise1-primary-note: #66a3ff;
			--noise2-secondary-channel: #405dbf;
			--noise2-primary-channel: #668aff;
			--noise2-secondary-note: #405dbf;
			--noise2-primary-note: #668aff;
			--noise3-secondary-channel: #4f40bf;
			--noise3-primary-channel: #7866ff;
			--noise3-secondary-note: #4f40bf;
			--noise3-primary-note: #7866ff;
			--noise4-secondary-channel: #8840bf;
			--noise4-primary-channel: #bd66ff;
			--noise4-secondary-note: #8840bf;
			--noise4-primary-note: #bd66ff;
			--noise5-secondary-channel: #bf40b5;
			--noise5-primary-channel: #ff66f2;
			--noise5-secondary-note: #bf40b5;
			--noise5-primary-note: #ff66f2;
			--mod1-secondary-channel: #cc6666;
			--mod1-primary-channel: #ff9999;
			--mod1-secondary-note: #cc6666;
			--mod1-primary-note: #ff9999;
			--mod2-secondary-channel: #cc7766;
			--mod2-primary-channel: #ffaa99;
			--mod2-secondary-note: #bf5540;
			--mod2-primary-note: #ffaa99;
			--mod3-secondary-channel: #cc8866;
			--mod3-primary-channel: #ffbb99;
			--mod3-secondary-note: #cc8866;
			--mod3-primary-note: #ffbb99;
			--mod4-secondary-channel: #cc9966;
			--mod4-primary-channel: #ffcc99;
			--mod4-secondary-note: #cc9966;
			--mod4-primary-note: #ffcc99;
			--disabled-note-primary: #696969;
			--disabled-note-secondary: #232323;
		}`,
        "inverse": `:root {
			--page-margin: #c4c8e3;
			--editor-background: #c4c8e3;
			--hover-preview: #000000;
			--playhead: #243953;
			--primary-text: black;
			--secondary-text: #855b95;
			--text-selection: rgb(132 125 255);
			--box-selection-fill: rgb(174 109 73 / 65%);
			--loop-accent: #EC897D;
			--link-accent: #4e00c8;
			--ui-widget-background: #e7e7ff;
			--ui-widget-focus: #d0d3e9;
			--pitch-background: #ffffff;
			--tonic: #bbbbbb;
			--fifth-note: #dcdcdc;
			--white-piano-key: #ffffff;
			--black-piano-key: #615f66;
			--track-editor-bg-pitch: #e9ebff;
			--track-editor-bg-pitch-dim: #e9ebff;
			--track-editor-bg-noise: #fdf2fe;
			--track-editor-bg-noise-dim: #fdf2fe;
			--track-editor-bg-mod: #dbdefe;
			--track-editor-bg-mod-dim: #dbdefe;
			--multiplicative-mod-slider: #6900b3;
			--overwriting-mod-slider: #004b9d;
			--indicator-primary: #ff633d;
			--indicator-secondary: #933822;
			--select2-opt-group: #e7e7ff;
			--input-box-outline: #e7e7ff;
			--mute-button-normal: #0072ef;
			--mute-button-mod: #002e67;
			--pitch1-secondary-channel: #b77d6e;
			--pitch1-primary-channel: #ff9d85;
			--pitch1-secondary-note: #b77d6e;
			--pitch1-primary-note: #ff9d85;
			--pitch2-secondary-channel: #be8821;
			--pitch2-primary-channel: #FFAF12;
			--pitch2-secondary-note: #be8821;
			--pitch2-primary-note: #FFAF12;
			--pitch3-secondary-channel: #3a62a4;
			--pitch3-primary-channel: #528ae6;
			--pitch3-secondary-note: #3a62a4;
			--pitch3-primary-note: #528ae6;
			--pitch4-secondary-channel: #3e8d78;
			--pitch4-primary-channel: #4EC5A7;
			--pitch4-secondary-note: #3e8d78;
			--pitch4-primary-note: #4EC5A7;
			--pitch5-secondary-channel: #84906d;
			--pitch5-primary-channel: #aabf84;
			--pitch5-secondary-note: #84906d;
			--pitch5-primary-note: #aabf84;
			--pitch6-secondary-channel: #bd6345;
			--pitch6-primary-channel: #e59a81;
			--pitch6-secondary-note: #bd6345;
			--pitch6-primary-note: #e59a81;
			--pitch7-secondary-channel: #aa592f;
			--pitch7-primary-channel: #FE813E;
			--pitch7-secondary-note: #aa592f;
			--pitch7-primary-note: #FE813E;
			--pitch8-secondary-channel: #b2a171;
			--pitch8-primary-channel: #ffd76d;
			--pitch8-secondary-note: #b2a171;
			--pitch8-primary-note: #ffd76d;
			--pitch9-secondary-channel: #4f6177;
			--pitch9-primary-channel: #798FA7;
			--pitch9-secondary-note: #4f6177;
			--pitch9-primary-note: #798FA7;
			--pitch10-secondary-channel: #165162;
			--pitch10-primary-channel: #107895;
			--pitch10-secondary-note: #165162;
			--pitch10-primary-note: #107895;
			--noise1-secondary-channel: #71617C;
			--noise1-primary-channel: #977da9;
			--noise1-secondary-note: #71617C;
			--noise1-primary-note: #977da9;
			--noise2-secondary-channel: #4a4c5b;
			--noise2-primary-channel: #707591;
			--noise2-secondary-note: #4a4c5b;
			--noise2-primary-note: #707591;
			--noise3-secondary-channel: #817c7b;
			--noise3-primary-channel: #A19D9C;
			--noise3-secondary-note: #817c7b;
			--noise3-primary-note: #A19D9C;
			--noise4-secondary-channel: #ab847b;
			--noise4-primary-channel: #EAAC9D;
			--noise4-secondary-note: #ab847b;
			--noise4-primary-note: #EAAC9D;
			--noise5-secondary-channel: #B49D74;
			--noise5-primary-channel: #dec69b;
			--noise5-secondary-note: #B49D74;
			--noise5-primary-note: #dec69b;
			--mod1-secondary-channel: #722124;
			--mod1-primary-channel: #D13A41;
			--mod1-secondary-note: #722124;
			--mod1-primary-note: #D13A41;
			--mod2-secondary-channel: #213657;
			--mod2-primary-channel: #34558B;
			--mod2-secondary-note: #213657;
			--mod2-primary-note: #34558B;
			--mod3-secondary-channel: #555D46;
			--mod3-primary-channel: #848f6d;
			--mod3-secondary-note: #555D46;
			--mod3-primary-note: #848f6d;
			--mod4-secondary-channel: #71617C;
			--mod4-primary-channel: #a68ab9;
			--mod4-secondary-note: #71617C;
			--mod4-primary-note: #a68ab9;
			--mod-label-primary: #e9e9e9;
			--mod-label-secondary-text: #707070;
			--disabled-note-primary: #959595;
			--disabled-note-secondary: #6e6e6e;
			}`,
        "nebula": `
		:root {
			--page-margin: #040410;
			--editor-background: #150e1f;
			--playhead: rgba(255, 255, 255, 0.9);
			--secondary-text: #8C849A;
			--text-selection: rgba(141,79,201,0.99);
			--box-selection-fill: #311E44;
			--loop-accent: #CC688C;
			--link-accent: #817DC9;
			--ui-widget-background: #44394F;
			--ui-widget-focus: #7A6386;
			--pitch-background: #393e4f40;
			--tonic: #7D5C9EC0;
			--fifth-note: #ab77bd50;
			--white-piano-key: #EEEEEE;
			--black-piano-key: #5F5566;
			--use-color-formula: true;
			--track-editor-bg-pitch: #46374C;
			--track-editor-bg-pitch-dim: #1F1C2850;
			--track-editor-bg-noise: #3D353B;
			--track-editor-bg-noise-dim: #16131550;
			--track-editor-bg-mod: #623F4C;
			--track-editor-bg-mod-dim: #361A2450;
			--multiplicative-mod-slider: #9F6E6A;
			--overwriting-mod-slider: #A664B5;
			--indicator-primary: #CC6B8E;
			--indicator-secondary: #44394F;
			--select2-opt-group: #6A576F;
			--input-box-outline: #222;
			--mute-button-normal: #BF91DC;
			--mute-button-mod: #DC8C9A;
			--mod-label-primary: #3A2840;
			--mod-label-secondary-text: #62485E;
			--mod-label-primary-text: white;
			--pitch-secondary-channel-hue: -96;
			--pitch-secondary-channel-hue-scale: 4.2;
			--pitch-secondary-channel-sat: 50.3;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 40;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: -96;
			--pitch-primary-channel-hue-scale: 4.2;
			--pitch-primary-channel-sat: 70;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 67.5;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: -96;
			--pitch-secondary-note-hue-scale: 4.2;
			--pitch-secondary-note-sat: 70.9;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 25;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: -96;
			--pitch-primary-note-hue-scale: 4.2;
			--pitch-primary-note-sat: 90;
			--pitch-primary-note-sat-scale: 0.05;
			--pitch-primary-note-lum: 85.6;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 16;
			--noise-secondary-channel-hue-scale: -1.33;
			--noise-secondary-channel-sat: 25;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 42;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 16;
			--noise-primary-channel-hue-scale: -1.33;
			--noise-primary-channel-sat: 33;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 63.5;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 12;
			--noise-secondary-note-hue-scale: -1.33;
			--noise-secondary-note-sat: 33.5;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 55;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 12;
			--noise-primary-note-hue-scale: -1.33;
			--noise-primary-note-sat: 46.5;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 74;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 12;
			--mod-secondary-channel-hue-scale: -.75;
			--mod-secondary-channel-sat: 50;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 50;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 12;
			--mod-primary-channel-hue-scale: -.75;
			--mod-primary-channel-sat: 70;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 80;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 12;
			--mod-secondary-note-hue-scale: -.75;
			--mod-secondary-note-sat: 75;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 45;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 12;
			--mod-primary-note-hue-scale: -.75;
			--mod-primary-note-sat: 85;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 85;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary: #aaa;
		}`,
        "roe light": `
		:root {
			--page-margin: #fff5f5;
			--editor-background: #fff5f5;
			--hover-preview: #0e8bf1;
			--playhead: 000;
			--primary-text: #0e8bf1;
			--secondary-text: #f10e0e;
			--inverted-text: white;
			--text-selection: #ff4444fc;
			--box-selection-fill: #ff00004d;
			--loop-accent: #9a75ff;
			--link-accent: #ff7070;
			--ui-widget-background: #bdc9e5;
			--ui-widget-focus: #a3b7e5;
			--pitch-background: #d0c7db;
			--tonic: #bed3e4;
			--fifth-note: #e7c6c6;
			--white-piano-key: #cdcdcd;
			--black-piano-key: #232323;
			--track-editor-bg-pitch: #e5e1ea;
			--track-editor-bg-pitch-dim: #cbc4d4;
			--track-editor-bg-noise: #e0ddee;
			--track-editor-bg-noise-dim: #c1bade;
			--track-editor-bg-mod: #d8e6f3;
			--track-editor-bg-mod-dim: #b1cce7;
			--multiplicative-mod-slider: #8097cb;
			--overwriting-mod-slider: #8097cb;
			--indicator-primary: #FF2A2A;
			--indicator-secondary: #92a6d3;
			--select2-opt-group: #b6c4e2;
			--input-box-outline: #bdc9e5;
			--mute-button-normal: #66baff;
			--mute-button-mod: #1a98ff;
			--pitch1-secondary-channel: #273c90;
			--pitch1-primary-channel: #476BFF;
			--pitch1-secondary-note: #273c90;
			--pitch1-primary-note: #476BFF;
			--pitch2-secondary-channel: #3a3898;
			--pitch2-primary-channel: #625FFB;
			--pitch2-secondary-note: #3a3898;
			--pitch2-primary-note: #625FFB;
			--pitch3-secondary-channel: #542780;
			--pitch3-primary-channel: #9C49EC;
			--pitch3-secondary-note: #542780;
			--pitch3-primary-note: #9C49EC;
			--pitch4-secondary-channel: #84225d;
			--pitch4-primary-channel: #fd3fb1;
			--pitch4-secondary-note: #84225d;
			--pitch4-primary-note: #fd3fb1;
			--pitch5-secondary-channel: #8d2323;
			--pitch5-primary-channel: #ff3f3f;
			--pitch5-secondary-note: #8d2323;
			--pitch5-primary-note: #ff3f3f;
			--pitch6-secondary-channel: #84225d;
			--pitch6-primary-channel: #fd3fb1;
			--pitch6-secondary-note: #84225d;
			--pitch6-primary-note: #fd3fb1;
			--pitch7-secondary-channel: #542780;
			--pitch7-primary-channel: #9C49EC;
			--pitch7-secondary-note: #542780;
			--pitch7-primary-note: #9C49EC;
			--pitch8-secondary-channel: #3a3898;
			--pitch8-primary-channel: #625FFB;
			--pitch8-secondary-note: #3a3898;
			--pitch8-primary-note: #625FFB;
			--pitch9-secondary-channel: #273c90;
			--pitch9-primary-channel: #476BFF;
			--pitch9-secondary-note: #273c90;
			--pitch9-primary-note: #476BFF;
			--pitch10-secondary-channel: #165a93;
			--pitch10-primary-channel: #299EFF;
			--pitch10-secondary-note: #165a93;
			--pitch10-primary-note: #299EFF;
			--noise1-secondary-channel: #336bdb;
			--noise1-primary-channel: #4281FF;
			--noise1-secondary-note: #336bdb;
			--noise1-primary-note: #4281FF;
			--noise2-secondary-channel: #5e38dc;
			--noise2-primary-channel: #7347FF;
			--noise2-secondary-note: #5e38dc;
			--noise2-primary-note: #7347FF;
			--noise3-secondary-channel: #7d3097;
			--noise3-primary-channel: #9F3CBF;
			--noise3-secondary-note: #7d3097;
			--noise3-primary-note: #9F3CBF;
			--noise4-secondary-channel: #ad2559;
			--noise4-primary-channel: #D3326F;
			--noise4-secondary-note: #ad2559;
			--noise4-primary-note: #D3326F;
			--noise5-secondary-channel: #d02525;
			--noise5-primary-channel: #FF2A2A;
			--noise5-secondary-note: #d02525;
			--noise5-primary-note: #FF2A2A;
			--mod1-secondary-channel: #35415a;
			--mod1-primary-channel: #47587a;
			--mod1-secondary-note: #35415a;
			--mod1-primary-note: #47587a;
			--mod2-secondary-channel: #5a5374;
			--mod2-primary-channel: #716791;
			--mod2-secondary-note: #5a5374;
			--mod2-primary-note: #716791;
			--mod3-secondary-channel: #53385c;
			--mod3-primary-channel: #6f4c7b;
			--mod3-secondary-note: #53385c;
			--mod3-primary-note: #6f4c7b;
			--mod4-secondary-channel: #7e4e60;
			--mod4-primary-channel: #9e6279;
			--mod4-secondary-note: #7e4e60;
			--mod4-primary-note: #9e6279;
			--mod-label-primary: #d0c7db;
			--mod-label-secondary-text: #cb3434;
			--disabled-note-primary: #616161;
			--disabled-note-secondary: #474747;
		}
		.promptContainerBG::before {
			box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
		}`,
        "energized": `
		:root {
			--page-margin: #000a08;
			--editor-background: #000a08;
			--hover-preview: #ffffcc;
			--playhead: #ccfff5;
			--secondary-text: #d9d98c;
			--text-selection: #ffff6659;
			--box-selection-fill: #ffffff33;
			--loop-accent: #ffff00;
			--link-accent: #00ffcc;
			--ui-widget-background: #141f1d;
			--ui-widget-focus: #24423d;
			--pitch-background: #001410;
			--tonic: #00241d;
			--fifth-note: #ffff6633;
			--white-piano-key: #66998f;
			--black-piano-key: #141f1d;
			--track-editor-bg-pitch: #66998f40;
			--track-editor-bg-pitch-dim: #293d3940;
			--track-editor-bg-noise: #66998f40;
			--track-editor-bg-noise-dim: #293d3940;
			--track-editor-bg-mod: #99996640;
			--track-editor-bg-mod-dim: #3d3d2940;
			--multiplicative-mod-slider: #ffff00;
			--overwriting-mod-slider: #00ffcc;
			--indicator-primary: #ffff00;
			--indicator-secondary: #141f1d;
			--select2-opt-group: #1b312e;
			--input-box-outline: #141f1d;
			--mute-button-normal: #00ffcc;
			--mute-button-mod: #00997a;
			--pitch1-secondary-channel: #bfbf40;
			--pitch1-primary-channel: #ffff64;
			--pitch1-secondary-note: #bfbf40;
			--pitch1-primary-note: #ffff64;
			--pitch2-secondary-channel: #a2bf40;
			--pitch2-primary-channel: #e0ff7d;
			--pitch2-secondary-note: #a2bf40;
			--pitch2-primary-note: #e0ff7d;
			--pitch3-secondary-channel: #75bf40;
			--pitch3-primary-channel: #c1ff96;
			--pitch3-secondary-note: #75bf40;
			--pitch3-primary-note: #c1ff96;
			--pitch4-secondary-channel: #40bf51;
			--pitch4-primary-channel: #a2ffaf;
			--pitch4-secondary-note: #40bf51;
			--pitch4-primary-note: #a2ffaf;
			--pitch5-secondary-channel: #40bf86;
			--pitch5-primary-channel: #83ffc8;
			--pitch5-secondary-note: #40bf86;
			--pitch5-primary-note: #83ffc8;
			--pitch6-secondary-channel: #40bfa6;
			--pitch6-primary-channel: #64ffe1;
			--pitch6-secondary-note: #40bfa6;
			--pitch6-primary-note: #64ffe1;
			--pitch7-secondary-channel: #40bf86;
			--pitch7-primary-channel: #83ffc8;
			--pitch7-secondary-note: #40bf86;
			--pitch7-primary-note: #83ffc8;
			--pitch8-secondary-channel: #40bf51;
			--pitch8-primary-channel: #a2ffaf;
			--pitch8-secondary-note: #40bf51;
			--pitch8-primary-note: #a2ffaf;
			--pitch9-secondary-channel: #75bf40;
			--pitch9-primary-channel: #c1ff96;
			--pitch9-secondary-note: #75bf40;
			--pitch9-primary-note: #c1ff96;
			--pitch10-secondary-channel: #a2bf40;
			--pitch10-primary-channel: #e0ff7d;
			--pitch10-secondary-note: #a2bf40;
			--pitch10-primary-note: #e0ff7d;
			--noise1-secondary-channel: #a6a659;
			--noise1-primary-channel: #ffffcc;
			--noise1-secondary-note: #a6a659;
			--noise1-primary-note: #ffffcc;
			--noise2-secondary-channel: #94a659;
			--noise2-primary-channel: #f3ffcc;
			--noise2-secondary-note: #94a659;
			--noise2-primary-note: #f3ffcc;
			--noise3-secondary-channel: #79a659;
			--noise3-primary-channel: #e1ffcc;
			--noise3-secondary-note: #79a659;
			--noise3-primary-note: #e1ffcc;
			--noise4-secondary-channel: #94a659;
			--noise4-primary-channel: #f3ffcc;
			--noise4-secondary-note: #94a659;
			--noise4-primary-note: #f3ffcc;
			--noise5-secondary-channel: #a6a659;
			--noise5-primary-channel: #ffffcc;
			--noise5-secondary-note: #a6a659;
			--noise5-primary-note: #ffffcc;
			--mod1-secondary-channel: #a3a329;
			--mod1-primary-channel: #ffff00;
			--mod1-secondary-note: #a3a329;
			--mod1-primary-note: #ffff00;
			--mod2-secondary-channel: #a38529;
			--mod2-primary-channel: #ffbf00;
			--mod2-secondary-note: #a38529;
			--mod2-primary-note: #ffbf00;
			--mod3-secondary-channel: #a36629;
			--mod3-primary-channel: #ff7f00;
			--mod3-secondary-note: #a36629;
			--mod3-primary-note: #ff7f00;
			--mod4-secondary-channel: #a38529;
			--mod4-primary-channel: #ffbf00;
			--mod4-secondary-note: #a38529;
			--mod4-primary-note: #ffbf00;
			--mod-label-primary: #141f1d;
			--mod-label-secondary-text: #d9d98c;
			--mod-label-primary-text: white;
			--disabled-note-primary: #808080;
			--disabled-note-secondary: #666666;
		}`,
        "neapolitan": `:root {
			--page-margin: #120807;
			--editor-background: #120807;
			--hover-preview: #e79a82;
			--playhead: #e79a82;
			--primary-text: #decdbf;
			--secondary-text: #fa99bb;
			--text-selection: #990036;
			--loop-accent: #f6377a;
			--link-accent: #f6377a;
			--ui-widget-background: #24160f;
			--ui-widget-focus: #362217;
			--pitch-background: #1e1106;
			--tonic: #382414;
			--fifth-note: #41240c;
			--white-piano-key: #e1c5b7;
			--black-piano-key: #482c1e;
			--white-piano-key-text: black;
			--black-piano-key-text: white;
			--track-editor-bg-pitch: #4d2a19;
			--track-editor-bg-pitch-dim: #27150c;
			--track-editor-bg-noise: #4d2a19;
			--track-editor-bg-noise-dim: #27150c;
			--track-editor-bg-mod: #4d2a19;
			--track-editor-bg-mod-dim: #27150c;
			--multiplicative-mod-slider: #decdbf;
			--overwriting-mod-slider: #decdbf;
			--indicator-primary: #decdbf;
			--indicator-secondary: #362217;
			--select2-opt-group: #24160f;
			--input-box-outline: #24160f;
			--mute-button-normal: #ff66a1;
			--mute-button-mod: #e61968;
			--pitch1-secondary-channel: #680029;
			--pitch1-primary-channel: #cc0052;
			--pitch1-secondary-note: #660029;
			--pitch1-primary-note: #cc0052;
			--pitch2-secondary-channel: #7e1b43;
			--pitch2-primary-channel: #d32e71;
			--pitch2-secondary-note: #7e1b43;
			--pitch2-primary-note: #d32e71;
			--pitch3-secondary-channel: #aa275e;
			--pitch3-primary-channel: #da5d91;
			--pitch3-secondary-note: #aa275e;
			--pitch3-primary-note: #da5d91;
			--pitch4-secondary-channel: #cc3878;
			--pitch4-primary-channel: #e18bb0;
			--pitch4-secondary-note: #cc3878;
			--pitch4-primary-note: #e18bb0;
			--pitch5-secondary-channel: #d06c9b;
			--pitch5-primary-channel: #e9bad0;
			--pitch5-secondary-note: #d06c9b;
			--pitch5-primary-note: #e9bad0;
			--pitch6-secondary-channel: #c9acc5;
			--pitch6-primary-channel: #f0e8ef;
			--pitch6-secondary-note: #c9acc5;
			--pitch6-primary-note: #f0e8ef;
			--pitch7-secondary-channel: #d06c9b;
			--pitch7-primary-channel: #e9bad0;
			--pitch7-secondary-note: #d06c9b;
			--pitch7-primary-note: #e9bad0;
			--pitch8-secondary-channel: #cc3878;
			--pitch8-primary-channel: #e18bb0;
			--pitch8-secondary-note: #cc3878;
			--pitch8-primary-note: #e18bb0;
			--pitch9-secondary-channel: #aa275e;
			--pitch9-primary-channel: #da5d91;
			--pitch9-secondary-note: #aa275e;
			--pitch9-primary-note: #da5d91;
			--pitch10-secondary-channel: #7e1b43;
			--pitch10-primary-channel: #d32e71;
			--pitch10-secondary-note: #7e1b43;
			--pitch10-primary-note: #d32e71;
			--noise1-secondary-channel: #683a37;
			--noise1-primary-channel: #A85F5A;
			--noise1-secondary-note: #683a37;
			--noise1-primary-note: #A85F5A;
			--noise2-secondary-channel: #7c4a41;
			--noise2-primary-channel: #B47A70;
			--noise2-secondary-note: #7c4a41;
			--noise2-primary-note: #B47A70;
			--noise3-secondary-channel: #935f4d;
			--noise3-primary-channel: #c09587;
			--noise3-secondary-note: #935f4d;
			--noise3-primary-note: #C09587;
			--noise4-secondary-channel: #aa795a;
			--noise4-primary-channel: #cdb09d;
			--noise4-secondary-note: #aa795a;
			--noise4-primary-note: #CDAF9D;
			--noise5-secondary-channel: #bb987c;
			--noise5-primary-channel: #decdbf;
			--noise5-secondary-note: #bb987c;
			--noise5-primary-note: #decdbf;
			--mod1-secondary-channel: #6ca784;
			--mod1-primary-channel: #accdb9;
			--mod1-secondary-note: #6ca784;
			--mod1-primary-note: #accdb9;
			--mod2-secondary-channel: #7daa9f;
			--mod2-primary-channel: #bbd3cd;
			--mod2-secondary-note: #7daa9f;
			--mod2-primary-note: #bbd3cd;
			--mod3-secondary-channel: #70a3a9;
			--mod3-primary-channel: #afcccf;
			--mod3-secondary-note: #70a3a9;
			--mod3-primary-note: #afcccf;
			--mod4-secondary-channel: #5698b8;
			--mod4-primary-channel: #9ec3d6;
			--mod4-secondary-note: #5698b8;
			--mod4-primary-note: #9ec3d6;
			--mod-label-primary: #24160f;
			--mod-label-secondary-text: #E5AFC2;
			--mod-label-primary-text: #decdbf;
			--disabled-note-primary: #bababa;
			--disabled-note-secondary: #878787;
		}`,
        "poly": `:root {
			--page-margin: #000;
			--editor-background: #000;
			--hover-preview: #808080;
			--playhead: #808080;
			--secondary-text: #cccccc;
			--text-selection: #696969;
			--box-selection-fill: #cccccc40;
			--loop-accent: #808080;
			--link-accent: white;
			--ui-widget-background: #232323;
			--ui-widget-focus: #303030;
			--pitch-background: #1a1a1a;
			--tonic: #262626;
			--fifth-note: #0d0d0d;
			--white-piano-key: #808080;
			--black-piano-key: #232323;
			--use-color-formula: true;
			--track-editor-bg-pitch: #262626;
			--track-editor-bg-pitch-dim: #1a1a1a;
			--track-editor-bg-noise: #262626;
			--track-editor-bg-noise-dim: #1a1a1a;
			--track-editor-bg-mod: #262626;
			--track-editor-bg-mod-dim: #1a1a1a;
			--multiplicative-mod-slider: #808080;
			--overwriting-mod-slider: #808080;
			--indicator-primary: #808080;
			--indicator-secondary: #333333;
			--select2-opt-group: #232323;
			--input-box-outline: #222;
			--mute-button-normal: #808080;
			--mute-button-mod: #808080;
			--mod-label-primary: #232323;
			--mod-label-secondary-text: #696969;
			--mod-label-primary-text: #cdcdcd;
			--pitch-secondary-channel-hue: 208;
			--pitch-secondary-channel-hue-scale: 10;
			--pitch-secondary-channel-sat: 100;
			--pitch-secondary-channel-sat-scale: 0;
			--pitch-secondary-channel-lum: 88;
			--pitch-secondary-channel-lum-scale: 0;
			--pitch-primary-channel-hue: 207;
			--pitch-primary-channel-hue-scale: 10;
			--pitch-primary-channel-sat: 100;
			--pitch-primary-channel-sat-scale: 0;
			--pitch-primary-channel-lum: 910;
			--pitch-primary-channel-lum-scale: 0;
			--pitch-secondary-note-hue: 208;
			--pitch-secondary-note-hue-scale: 10;
			--pitch-secondary-note-sat: 100;
			--pitch-secondary-note-sat-scale: 0;
			--pitch-secondary-note-lum: 88;
			--pitch-secondary-note-lum-scale: 0;
			--pitch-primary-note-hue: 208;
			--pitch-primary-note-hue-scale: 10;
			--pitch-primary-note-sat: 100;
			--pitch-primary-note-sat-scale: 0;
			--pitch-primary-note-lum: 910;
			--pitch-primary-note-lum-scale: 0;
			--noise-secondary-channel-hue: 328;
			--noise-secondary-channel-hue-scale: 10;
			--noise-secondary-channel-sat: 100;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 88;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 327;
			--noise-primary-channel-hue-scale: 10;
			--noise-primary-channel-sat: 100;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 910;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 328;
			--noise-secondary-note-hue-scale: 10;
			--noise-secondary-note-sat: 100;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 88;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 327;
			--noise-primary-note-hue-scale: 10;
			--noise-primary-note-sat: 100;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 910;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 87;
			--mod-secondary-channel-hue-scale: 10;
			--mod-secondary-channel-sat: 100;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 88;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 88;
			--mod-primary-channel-hue-scale: 10;
			--mod-primary-channel-sat: 100;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 910;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 87;
			--mod-secondary-note-hue-scale: 10;
			--mod-secondary-note-sat: 100;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 88;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 88;
			--mod-primary-note-hue-scale: 10;
			--mod-primary-note-sat: 100;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 910;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary: #c6c6c6;
			--disabled-note-secondary: #8c8c8c;
		}`,
        "greyscale": `:root {
			--page-margin: #000;
			--editor-background: #000;
			--hover-preview: #808080;
			--playhead: #808080;
			--primary-text: white;
			--secondary-text: #cccccc;
			--inverted-text: black;
			--text-selection: #696969;
			--box-selection-fill: #cccccc40;
			--loop-accent: #808080;
			--link-accent: white;
			--ui-widget-background: #232323;
			--ui-widget-focus: #303030;
			--pitch-background: #1a1a1a;
			--tonic: #262626;
			--fifth-note: #0d0d0d;
			--white-piano-key: #808080;
			--black-piano-key: #232323;
			--use-color-formula: true;
			--track-editor-bg-pitch: #262626;
			--track-editor-bg-pitch-dim: #1a1a1a;
			--track-editor-bg-noise: #262626;
			--track-editor-bg-noise-dim: #1a1a1a;
			--track-editor-bg-mod: #262626;
			--track-editor-bg-mod-dim: #1a1a1a;
			--multiplicative-mod-slider: #808080;
			--overwriting-mod-slider: #808080;
			--indicator-primary: #808080;
			--indicator-secondary: #333333;
			--select2-opt-group: #232323;
			--input-box-outline: #222;
			--mute-button-normal: #808080;
			--mute-button-mod: #808080;
			--mod-label-primary: #232323;
			--mod-label-secondary-text: #696969;
			--mod-label-primary-text: #cdcdcd;
			--pitch-secondary-channel-hue: 0;
			--pitch-secondary-channel-hue-scale: 25;
			--pitch-secondary-channel-sat: 10;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 70;
			--pitch-secondary-channel-lum-scale: 0;
			--pitch-primary-channel-hue: 0;
			--pitch-primary-channel-hue-scale: 25;
			--pitch-primary-channel-sat: 50;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 95;
			--pitch-primary-channel-lum-scale: 0;
			--pitch-secondary-note-hue: 0;
			--pitch-secondary-note-hue-scale: 25;
			--pitch-secondary-note-sat: 10;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 70;
			--pitch-secondary-note-lum-scale: 0;
			--pitch-primary-note-hue: 0;
			--pitch-primary-note-hue-scale: 25;
			--pitch-primary-note-sat: 50;
			--pitch-primary-note-sat-scale: 0.1;
			--pitch-primary-note-lum: 95;
			--pitch-primary-note-lum-scale: 0;
			--noise-secondary-channel-hue: 125;
			--noise-secondary-channel-hue-scale: 50;
			--noise-secondary-channel-sat: 10;
			--noise-secondary-channel-sat-scale: 0.1;
			--noise-secondary-channel-lum: 70;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 125;
			--noise-primary-channel-hue-scale: 50;
			--noise-primary-channel-sat: 50;
			--noise-primary-channel-sat-scale: 0.1;
			--noise-primary-channel-lum: 95;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 125;
			--noise-secondary-note-hue-scale: 50;
			--noise-secondary-note-sat: 10;
			--noise-secondary-note-sat-scale: 0.1;
			--noise-secondary-note-lum: 70;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 125;
			--noise-primary-note-hue-scale: 50;
			--noise-primary-note-sat: 50;
			--noise-primary-note-sat-scale: 0.1;
			--noise-primary-note-lum: 95;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 255;
			--mod-secondary-channel-hue-scale: 75;
			--mod-secondary-channel-sat: 10;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 70;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 255;
			--mod-primary-channel-hue-scale: 75;
			--mod-primary-channel-sat: 50;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 95;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 255;
			--mod-secondary-note-hue-scale: 75;
			--mod-secondary-note-sat: 10;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 70;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 255;
			--mod-primary-note-hue-scale: 75;
			--mod-primary-note-sat: 50;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 95;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary: #c6c6c6;
			--disabled-note-secondary: #8c8c8c;
		}`,
        "blutonium": `:root {
			--page-margin: #02070D;
			--editor-background: #02070D;
			--primary-text: #9bd1ee;
			--secondary-text: #5a6da8;
			--text-selection: rgb(68 68 255 / 99%);
			--box-selection-fill: rgb(0 0 255 / 30%);
			--loop-accent: #024aca;
			--link-accent: #024aca;
			--ui-widget-background: #161c2e;
			--ui-widget-focus: #262c3e;
			--pitch-background: #22272D;
			--tonic: #1b3056;
			--fifth-note: #344051;
			--white-piano-key: #a6c6ed;
			--black-piano-key: #2f4687;
			--track-editor-bg-pitch: #25284c;
			--track-editor-bg-pitch-dim: #211c26;
			--track-editor-bg-noise: #261f42;
			--track-editor-bg-noise-dim: #1a152d;
			--track-editor-bg-mod: #183049;
			--track-editor-bg-mod-dim: #102132;
			--multiplicative-mod-slider: #344a7f;
			--overwriting-mod-slider: #344a7f;
			--indicator-primary: #024aca;
			--indicator-secondary: #00177d;
			--select2-opt-group: #141e34;
			--input-box-outline: #141e34;
			--mute-button-normal: #273b9d;
			--mute-button-mod: #27989d;
			--pitch1-secondary-channel: hsl(200, 100%, 40%);
			--pitch1-primary-channel: #99ddff;
			--pitch1-secondary-note: hsl(200, 100%, 40%);
			--pitch1-primary-note: #99ddff;
			--pitch2-secondary-channel: 	hsl(212, 100%, 34%);
			--pitch2-primary-channel: #5BA8FF;
			--pitch2-secondary-note: hsl(212, 100%, 34%);
			--pitch2-primary-note: #5BA8FF;
			--pitch3-secondary-channel: #024ACA;
			--pitch3-primary-channel: #0A89FF;
			--pitch3-secondary-note: #024ACA;
			--pitch3-primary-note: #0A89FF;
			--pitch4-secondary-channel: #00177D;
			--pitch4-primary-channel: #024ACA;
			--pitch4-secondary-note: #00177D;
			--pitch4-primary-note: #024ACA;
			--pitch5-secondary-channel: #000e4e;
			--pitch5-primary-channel: #0023bf;
			--pitch5-secondary-note: #000e4e;
			--pitch5-primary-note: #0023bf;
			--pitch6-secondary-channel: #8990FE;
			--pitch6-primary-channel: #C2C6FF;
			--pitch6-secondary-note: #8990FE;
			--pitch6-primary-note: #C2C6FF;
			--pitch7-secondary-channel: #5E65D3;
			--pitch7-primary-channel: #8990FE;
			--pitch7-secondary-note: #5E65D3;
			--pitch7-primary-note: #8990FE;
			--pitch8-secondary-channel: #3138A6;
			--pitch8-primary-channel: #5E65D3;
			--pitch8-secondary-note: #3138A6;
			--pitch8-primary-note: #5E65D3;
			--pitch9-secondary-channel: #1B0B7F;
			--pitch9-primary-channel: #3138A6;
			--pitch9-secondary-note: #1B0B7F;
			--pitch9-primary-note: #3138A6;
			--pitch10-secondary-channel: #13015D;
			--pitch10-primary-channel: #1c02bd;
			--pitch10-secondary-note: #13015D;
			--pitch10-primary-note: #1c02bd;
			--noise1-secondary-channel: #A675FE;
			--noise1-primary-channel: #E2C9FF;
			--noise1-secondary-note: #A675FE;
			--noise1-primary-note: #E2C9FF;
			--noise2-secondary-channel: #6A31CA;
			--noise2-primary-channel: #A675FE;
			--noise2-secondary-note: #6A31CA;
			--noise2-primary-note: #A675FE;
			--noise3-secondary-channel: #5A1991;
			--noise3-primary-channel: #6A31CA;
			--noise3-secondary-note: #5A1991;
			--noise3-primary-note: #6A31CA;
			--noise4-secondary-channel: #2f1a68;
			--noise4-primary-channel: #5A1991;
			--noise4-secondary-note: #2f1a68;
			--noise4-primary-note: #5A1991;
			--noise5-secondary-channel: #211640;
			--noise5-primary-channel: #391b8d;
			--noise5-secondary-note: #211640;
			--noise5-primary-note: #391b8d;
			--mod1-secondary-channel: #25E2CD;
			--mod1-primary-channel: #BDFFCA;
			--mod1-secondary-note: #25E2CD;
			--mod1-primary-note: #BDFFCA;
			--mod2-secondary-channel: #0A98AC;
			--mod2-primary-channel: #25E2CD;
			--mod2-secondary-note: #0A98AC;
			--mod2-primary-note: #25E2CC;
			--mod3-secondary-channel: #005280;
			--mod3-primary-channel: #0A98AC;
			--mod3-secondary-note: #005280;
			--mod3-primary-note: #0A98AC;
			--mod4-secondary-channel: #0f3670;
			--mod4-primary-channel: #1369c1;
			--mod4-secondary-note: #0f3670;
			--mod4-primary-note: #1369c1;
			--mod-label-primary: #191d26;
			--mod-label-secondary-text: #024aca;
			--mod-label-primary-text: #ffffffa6;
			--disabled-note-primary: #c9c9c9;
			--disabled-note-secondary: #616161;
	}`,
        "slushie": `
	:root {
		--page-margin: #040814;
		--editor-background: #040814;
		--hover-preview: #c6f7ff;
		--primary-text: #d3f3ff;
		--secondary-text: #6f72b5;
		--inverted-text: black;
		--box-selection-fill: rgb(43 70 171 / 62%);
		--loop-accent: #573ebb;
		--ui-widget-background: #2e2f44;
		--ui-widget-focus: #2b2c46;
		--pitch-background: #353654;
		--tonic: #716fe3;
		--fifth-note: #76469b;
		--white-piano-key: #abbce3;
		--black-piano-key: #2f235e;
		--track-editor-bg-pitch: #3a3b5c;
		--track-editor-bg-pitch-dim: #1f2036;
		--track-editor-bg-noise: #3c3554;
		--track-editor-bg-noise-dim: #1e1834;
		--track-editor-bg-mod: #30335e;
		--track-editor-bg-mod-dim: #161938;
		--multiplicative-mod-slider: #e29cff;
		--overwriting-mod-slider: #495789;
		--indicator-primary: #e1a6ff;
		--indicator-secondary: #415187;
		--select2-opt-group: #22223a;
		--input-box-outline: #2d2648;
		--mute-button-normal: #7aceff;
		--pitch1-secondary-channel: #5f3ea5;
		--pitch1-primary-channel: #c1a4ff;
		--pitch1-secondary-note: #794fd3;
		--pitch1-primary-note: #d8c6ff;
		--pitch2-secondary-channel: #4f44bf;
		--pitch2-primary-channel: #9287ff;
		--pitch2-secondary-note: #5e51d9;
		--pitch2-primary-note: #b6afff;
		--pitch3-secondary-channel: #374eb9;
		--pitch3-primary-channel: #8097ff;
		--pitch3-secondary-note: #445cc9;
		--pitch3-primary-note: #a0b2ff;
		--pitch4-secondary-channel: #2867cf;
		--pitch4-primary-channel: #6fa5ff;
		--pitch4-secondary-note: #2e6ed7;
		--pitch4-primary-note: #a6c7ff;
		--pitch5-secondary-channel: #3175a7;
		--pitch5-primary-channel: #7ec9ff;
		--pitch5-secondary-note: #367eb3;
		--pitch5-primary-note: #9fd7ff;
		--pitch6-secondary-channel: #3993a9;
		--pitch6-primary-channel: #8ce9ff;
		--pitch6-secondary-note: #386da3;
		--pitch6-primary-note: #9eecff;
		--pitch7-secondary-channel: #369d8a;
		--pitch7-primary-channel: #8bfce7;
		--pitch7-secondary-note: #1c93a7;
		--pitch7-primary-note: #abffef;
		--pitch8-secondary-channel: #00A170;
		--pitch8-primary-channel: #50FFC9;
		--pitch8-secondary-note: #00C78A;
		--pitch8-primary-note: #83FFD9;
		--pitch9-secondary-channel: #49b374;
		--pitch9-primary-channel: #8affa9;
		--pitch9-secondary-note: #26815f;
		--pitch9-primary-note: #c8ffde;
		--pitch10-secondary-channel: #58a747;
		--pitch10-primary-channel: #bbffaa;
		--pitch10-secondary-note: #1d7c48;
		--pitch10-primary-note: #c7ffbc;
		--noise1-secondary-channel: #42829b;
		--noise1-primary-channel: #97d3fc;
		--noise1-secondary-note: #3f53b3;
		--noise1-primary-note: #97d3fc;
		--noise2-secondary-channel: #6354bb;
		--noise2-primary-channel: #9a89ff;
		--noise2-secondary-note: #5f4dcd;
		--noise2-primary-note: #c6bcff;
		--noise3-secondary-channel: #704a95;
		--noise3-primary-channel: #c285ff;
		--noise3-secondary-note: #ad5aff;
		--noise3-primary-note: #d3a6ff;
		--noise4-secondary-channel: #a53c65;
		--noise4-primary-channel: #f794bb;
		--noise4-secondary-note: #cb5080;
		--noise4-primary-note: #f794bb;
		--noise5-secondary-channel: #9b2d2d;
		--noise5-primary-channel: #ff7676;
		--noise5-secondary-note: #cb4444;
		--noise5-primary-note: #ff9999;
		--mod1-secondary-channel: #b7613c;
		--mod1-primary-channel: #ff9f76;
		--mod1-secondary-note: #e77e52;
		--mod1-primary-note: #ffb99b;
		--mod2-secondary-channel: #916d34;
		--mod2-primary-channel: #fece80;
		--mod2-secondary-note: #c58b35;
		--mod2-primary-note: #ffdda5;
		--mod3-secondary-channel: #83761a;
		--mod3-primary-channel: #fdf68c;
		--mod3-secondary-note: #c18e00;
		--mod3-primary-note: #fdf68c;
		--mod4-secondary-channel: #a86436;
		--mod4-primary-channel: #c8a825;
		--mod4-secondary-note: #e8ba46;
		--mod4-primary-note: #c8a825;
		--mod-label-primary: #37325e;
		--mod-label-secondary-text: #6e8aa7;
		--mod-label-primary-text: #c1ffff;
}`,
        "ultrabox dark": `
:root {
/*--mod-title: #CCCCCC;*/
--loop-accent: #CCCCCC;
--playhead: #CCCCCC;
/*--primary-text: #CCCCCC;
--hover-preview: #CCCCCC;*/
--link-accent: #FF8EC5;
--indicator-primary: #FF8EC5;
/*--indicator-primary: #CCCCCC;*/
/*--indicator-secondary: #E856B2;*/
--white-piano-key: #CCCCCC;
/*--black-piano-key: #444;*/
--text-selection: #932253;
--oscilloscope-line-L: #CCCCCC;
--oscilloscope-line-R: #932253;
--pitch-channel-limit: 8;
--pitch1-secondary-channel: #A83030;
--pitch1-primary-channel:   #FF7C7C;
--pitch1-secondary-note:    #B51532;
--pitch1-primary-note:      #FFA3A3;

--pitch2-secondary-channel: #C75000;
--pitch2-primary-channel:   #FF9752;
--pitch2-secondary-note:    #FF771C;
--pitch2-primary-note:      #FFCDAB;

--pitch3-secondary-channel: #A1A100;
--pitch3-primary-channel: #FFFF25;
--pitch3-secondary-note: #C7C700;
--pitch3-primary-note: #FFFF92;

--pitch4-secondary-channel: #139620;
--pitch4-primary-channel:   #25ff3a;
--pitch4-secondary-note:    #21FF33;
--pitch4-primary-note:      #C0FFB5;

--pitch5-secondary-channel: #0099A1;
--pitch5-primary-channel:   #25F3FF;
--pitch5-secondary-note:    #00BDC7;
--pitch5-primary-note:      #92F9FF;

--pitch6-secondary-channel: #58599E;
--pitch6-primary-channel:   #5EA3FF;
--pitch6-secondary-note:    #183AC7;
--pitch6-primary-note:      #9EC8FF;

--pitch7-secondary-channel: #6038a5;
--pitch7-primary-channel:   #C760FF;
--pitch7-secondary-note:    #5433A0;
--pitch7-primary-note:      #D99EFF;

--pitch8-secondary-channel: #932253;
--pitch8-primary-channel:   #FF60A5;
--pitch8-secondary-note:    #8E1C4E;
--pitch8-primary-note:      #FF8EC5;

/*--track-editor-bg-mod: #632D45;
--track-editor-bg-mod-dim: #3F1D2C;*/
}`,
        "modbox classic": `
			:root {
				--loop-accent: #9900cc;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 4;
				--pitch1-secondary-note:    #0099a1;
				--pitch1-primary-note:      #25f3ff;
				--pitch2-secondary-channel: #439143;
				--pitch2-primary-channel:   #44ff44;
				--pitch2-secondary-note:    #439143;
				--pitch2-primary-note:      #44ff44;
				--pitch3-secondary-channel: #a1a100;
				--pitch3-primary-channel:   #ffff25;
				--pitch3-secondary-note:    #a1a100;
				--pitch3-primary-note:      #ffff25;
				--pitch4-secondary-channel: #c75000;
				--pitch4-primary-channel:   #ff9752;
				--pitch4-secondary-note:    #c75000;
				--pitch4-primary-note:      #ff9752;
				--pitch5-secondary-note:    #d020d0;
				--pitch5-primary-note:      #ff90ff;
				--pitch6-secondary-channel: #552377;
				--pitch6-primary-channel:   #9f31ea;
				--pitch6-secondary-note:    #552377;
				--pitch6-primary-note:      #9f31ea;
				--pitch7-secondary-channel: #221b89;
				--pitch7-primary-channel:   #2b6aff;
				--pitch7-secondary-note:    #221b89;
				--pitch7-primary-note:      #2b6aff;
				--pitch8-secondary-channel: #00995f;
				--pitch8-primary-channel:   #00ff9f;
				--pitch8-secondary-note:    #00995f;
				--pitch8-primary-note:      #00ff9f;
				--pitch9-secondary-channel: #d6b03e;
				--pitch9-primary-channel:   #ffbf00;
				--pitch9-secondary-note:    #d6b03e;
				--pitch9-primary-note:      #ffbf00;
				--pitch10-secondary-channel:#b25915;
				--pitch10-primary-channel:  #d85d00;
				--pitch10-secondary-note:   #b25915;
				--pitch10-primary-note:     #d85d00;
				--noise1-secondary-channel: #991010;
				--noise1-primary-channel:   #ff1616;
				--noise1-secondary-note:    #991010;
				--noise1-primary-note:      #ff1616;
				--noise2-secondary-channel: #aaaaaa;
				--noise2-primary-channel:   #ffffff;
				--noise2-secondary-note:    #aaaaaa;
				--noise2-primary-note:      #ffffff;
				--noise3-secondary-channel: #5869BD;
				--noise3-primary-channel:   #768dfc;
				--noise3-secondary-note:    #5869BD;
				--noise3-primary-note:      #768dfc;
				--noise4-secondary-channel: #7c9b42;
				--noise4-primary-channel:   #a5ff00;
				--noise4-secondary-note:    #7c9b42;
				--noise4-primary-note:      #a5ff00;
				--noise5-secondary-channel: #7c9b42;
         --mod1-secondary-channel: #0099a1;
				--mod1-primary-channel:   #25f3ff;
				--mod1-secondary-note:    #0099a1;
				--mod1-primary-note:      #25f3ff;
				--mod2-secondary-channel: #439143;
				--mod2-primary-channel:   #44ff44;
				--mod2-secondary-note:    #439143;
				--mod2-primary-note:      #44ff44;
				--mod3-secondary-channel: #a1a100;
				--mod3-primary-channel:   #ffff25;
				--mod3-secondary-note:    #a1a100;
				--mod3-primary-note:      #ffff25;
				--mod4-secondary-channel: #c75000;
				--mod4-primary-channel:   #ff9752;
				--mod4-secondary-note:    #c75000;
				--mod4-primary-note:      #ff9752;
					--text-disabled-icon: ✗ ;
				}
			`,
        "zefbox": `
			:root {
				--loop-accent: #C3593D;
				--pitch1-secondary-channel: #06c400;
				--pitch1-primary-channel:   #08ff00;
				--pitch1-secondary-note:    #06c400;
				--pitch1-primary-note:      #06e000;
				--pitch2-secondary-channel: #00bf97;
				--pitch2-primary-channel:   #00ffcb;
				--pitch2-secondary-note:    #00bf97;
				--pitch2-primary-note:      #00edbc;
				--pitch3-secondary-channel: #b5b000;
				--pitch3-primary-channel:   #fffa00;
				--pitch3-secondary-note:    #b5b000;
				--pitch3-primary-note:      #e0db00;
				--pitch4-secondary-channel: #c90000;
				--pitch4-primary-channel:   #e20000;
				--pitch4-secondary-note:    #c90000;
				--pitch4-primary-note:      #e20000;
				--pitch5-secondary-channel: #d17d12;
				--pitch5-primary-channel:   #ff9e21;
				--pitch5-secondary-note:    #d17d12;
				--pitch5-primary-note:      #ef9017;
				--pitch6-secondary-channel: #d35bc8;
				--pitch6-primary-channel:   #ffa5f7;
				--pitch6-secondary-note:    #d35bc8;
				--pitch6-primary-note:      #fc64ee;
				--pitch7-secondary-channel: #D00000;
				--pitch7-primary-channel:   #FF4444;
				--pitch7-secondary-note:    #D00000;
				--pitch7-primary-note:      #FF4444;
				--pitch8-secondary-channel: #00C700;
				--pitch8-primary-channel:   #A0FFA0;
				--pitch8-secondary-note:    #00C700;
				--pitch8-primary-note:      #A0FFA0;
				--pitch9-secondary-channel: #A88981;
				--pitch9-primary-channel:   #F1C3B7;
				--pitch9-secondary-note:    #A88981;
				--pitch9-primary-note:      #F1C3B7;
				--pitch10-secondary-channel:#0C0A99;
				--pitch10-primary-channel:  #0000EE;
				--pitch10-secondary-note:   #0C0A99;
				--pitch10-primary-note:     #0000EE;
				--noise1-secondary-channel: #ABABAB;
				--noise1-primary-channel:   #D6D6D6;
				--noise1-secondary-note:    #ABABAB;
				--noise1-primary-note:      #D6D6D6;
				--noise2-secondary-channel: #A18F51;
				--noise2-primary-channel:   #F6BB6A;
				--noise2-secondary-note:    #A18F51;
				--noise2-primary-note:      #F6BB6A;
				--noise3-secondary-channel: #5869BD;
				--noise3-primary-channel:   #768DFC;
				--noise3-secondary-note:    #5869BD;
				--noise3-primary-note:      #768DFC;
				--noise4-secondary-channel: #8888D0;
				--noise4-primary-channel:   #D0D0FF;
				--noise4-secondary-note:    #8888D0;
				--noise4-primary-note:      #D0D0FF;
				--noise5-secondary-channel: #B7148E;
				--noise5-primary-channel:   #E819B4;
				--noise5-secondary-note:    #B7148E;
				--noise5-primary-note:      #E819B4;
       --mod1-secondary-channel: #06c400;
				--mod1-primary-channel:   #08ff00;
				--mod1-secondary-note:    #06c400;
				--mod1-primary-note:      #06e000;
				--mod2-secondary-channel: #00bf97;
				--mod2-primary-channel:   #00ffcb;
				--mod2-secondary-note:    #00bf97;
				--mod2-primary-note:      #00edbc;
				--mod3-secondary-channel: #b5b000;
				--mod3-primary-channel:   #fffa00;
				--mod3-secondary-note:    #b5b000;
				--mod3-primary-note:      #e0db00;
				--mod4-secondary-channel: #c90000;
				--mod4-primary-channel:   #e20000;
				--mod4-secondary-note:    #c90000;
				--mod4-primary-note:      #e20000;
				}
			`,
        "sandbox classic": `
			:root {
				--loop-accent: #198195;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 4;
				--pitch1-secondary-channel: #539999;
				--pitch1-primary-channel:   #5EB1B1;
				--pitch1-secondary-note:    #539999;
				--pitch1-primary-note:      #5EB1B1;
				--pitch2-secondary-channel: #95933C;
				--pitch2-primary-channel:   #B0AD44;
				--pitch2-secondary-note:    #95933C;
				--pitch2-primary-note:      #B0AD44;
				--pitch3-secondary-channel: #E75566;
				--pitch3-primary-channel:   #FF9AA6;
				--pitch3-secondary-note:    #E75566;
				--pitch3-primary-note:      #FF9AA6;
				--pitch4-secondary-channel: #8B4343;
				--pitch4-primary-channel:   #FF8844;
				--pitch4-secondary-note:    #8B4343;
				--pitch4-primary-note:      #FF8844;
				--pitch5-secondary-channel: #888888;
				--pitch5-primary-channel:   #BBBBBB;
				--pitch5-secondary-note:    #888888;
				--pitch5-primary-note:      #BBBBBB;
				--pitch6-secondary-channel: #BB6906;
				--pitch6-primary-channel:   #FE8D00;
				--pitch6-secondary-note:    #BB6906;
				--pitch6-primary-note:      #FE8D00;
				--pitch7-secondary-channel: #539999;
				--pitch7-primary-channel:   #5EB1B1;
				--pitch7-secondary-note:    #539999;
				--pitch7-primary-note:      #5EB1B1;
				--pitch8-secondary-channel: #95933C;
				--pitch8-primary-channel:   #B0AD44;
				--pitch8-secondary-note:    #95933C;
				--pitch8-primary-note:      #B0AD44;
				--pitch9-secondary-channel: #E75566;
				--pitch9-primary-channel:   #FF9AA6;
				--pitch9-secondary-note:    #E75566;
				--pitch9-primary-note:      #FF9AA6;
				--pitch10-secondary-channel: #8B4343;
				--pitch10-primary-channel:   #FF8844;
				--pitch10-secondary-note:    #8B4343;
				--pitch10-primary-note:      #FF8844;			
				--noise1-secondary-channel: #ABABAB;
				--noise1-primary-channel:   #D6D6D6;
				--noise1-secondary-note:    #ABABAB;
				--noise1-primary-note:      #D6D6D6;
				--noise2-secondary-channel: #A18F51;
				--noise2-primary-channel:   #F6BB6A;
				--noise2-secondary-note:    #A18F51;
				--noise2-primary-note:      #F6BB6A;
				--noise3-secondary-channel: #5869BD;
				--noise3-primary-channel:   #768DFC;
				--noise3-secondary-note:    #5869BD;
				--noise3-primary-note:      #768DFC;
				--noise4-secondary-channel: #8888D0;
				--noise4-primary-channel:   #D0D0FF;
				--noise4-secondary-note:    #8888D0;
				--noise4-primary-note:      #D0D0FF;
				--noise5-secondary-channel: #A18F51;
				--noise5-primary-channel:   #F6BB6A;
				--noise5-secondary-note:    #A18F51;
				--noise5-primary-note:      #F6BB6A;			
         	--mod1-secondary-channel: #539999;
				--mod1-primary-channel:   #5EB1B1;
				--mod1-secondary-note:    #539999;
				--mod1-primary-note:      #5EB1B1;
				--mod2-secondary-channel: #95933C;
				--mod2-primary-channel:   #B0AD44;
				--mod2-secondary-note:    #95933C;
				--mod2-primary-note:      #B0AD44;
				--mod3-secondary-channel: #E75566;
				--mod3-primary-channel:   #FF9AA6;
				--mod3-secondary-note:    #E75566;
				--mod3-primary-note:      #FF9AA6;
				--mod4-secondary-channel: #8B4343;
				--mod4-primary-channel:   #FF8844;
				--mod4-secondary-note:    #8B4343;
				--mod4-primary-note:      #FF8844;
				}
			`,
        "harrybox": `
			:root {
				--loop-accent: #9900cc;
					--noise-channel-limit: 2;
				--pitch1-secondary-channel: #00ffff;
				--pitch1-primary-channel:   #00ffff;
				--pitch1-secondary-note:    #00ffff;
				--pitch1-primary-note:      #00ffff;
				--pitch2-secondary-channel: #00d8d8;
				--pitch2-primary-channel:   #00d8d8;
				--pitch2-secondary-note:    #00d8d8;
				--pitch2-primary-note:      #00d8d8;
				--pitch3-secondary-channel: #00adad;
				--pitch3-primary-channel:   #00adad;
				--pitch3-secondary-note:    #00adad;
				--pitch3-primary-note:      #00adad;
				-pitch4-secondary-channel: #008c8c;
				--pitch4-primary-channel:   #008c8c;
				--pitch4-secondary-note:    #008c8c;
				--pitch4-primary-note:      #008c8c;
				--pitch5-secondary-channel: #005b5b;
				--pitch5-primary-channel:   #005b5b;
				--pitch5-secondary-note:    #005b5b;
				--pitch5-primary-note:      #005b5b;
				--pitch6-secondary-channel: #003333;
				--pitch6-primary-channel:   #003333;
				--pitch6-secondary-note:    #003333;
				--pitch6-primary-note:      #003333;
				--pitch7-secondary-channel: #00ffff;
				--pitch7-primary-channel:   #00ffff;
				--pitch7-secondary-note:    #00ffff;
				--pitch7-primary-note:      #00ffff;
				--pitch8-secondary-channel: #00ffff;
				--pitch8-primary-channel:   #00ffff;
				--pitch8-secondary-note:    #00ffff;
				--pitch8-primary-note:      #00ffff;
				--pitch9-secondary-channel: #00ffff;
				--pitch9-primary-channel:   #00ffff;
				--pitch9-secondary-note:    #00ffff;
				--pitch9-primary-note:      #00ffff;
				--pitch10-secondary-channel:#00ffff;
				--pitch10-primary-channel:  #00ffff;
				--pitch10-secondary-note:   #00ffff;
				--pitch10-primary-note:     #00ffff;
				--noise1-secondary-channel: #991010;
				--noise1-primary-channel:   #ff1616;
				--noise1-secondary-note:    #991010;
				--noise1-primary-note:      #ff1616;
				--noise2-secondary-channel: #aaaaaa;
				--noise2-primary-channel:   #ffffff;
				--noise2-secondary-note:    #aaaaaa;
				--noise2-primary-note:      #ffffff;
				--noise3-secondary-channel: #991010;
				--noise3-primary-channel:   #ff1616;
				--noise3-secondary-note:    #991010;
				--noise3-primary-note:      #ff1616;
				--noise4-secondary-channel: #aaaaaa;
				--noise4-primary-channel:   #ffffff;
				--noise4-secondary-note:    #aaaaaa;
				--noise4-primary-note:      #ffffff;
				--noise5-secondary-channel: #991010;
				--noise5-primary-channel:   #ff1616;
				--noise5-secondary-note:    #991010;
				--noise5-primary-note:      #ff1616;
         	--mod1-secondary-channel: #00ffff;
				--mod1-primary-channel:   #00ffff;
				--mod1-secondary-note:    #00ffff;
				--mod1-primary-note:      #00ffff;
				--mod2-secondary-channel: #00d8d8;
				--mod2-primary-channel:   #00d8d8;
				--mod2-secondary-note:    #00d8d8;
				--mod2-primary-note:      #00d8d8;
				--mod3-secondary-channel: #00adad;
				--mod3-primary-channel:   #00adad;
				--mod3-secondary-note:    #00adad;
				--mod3-primary-note:      #00adad;
				-mod4-secondary-channel: #008c8c;
				--mod4-primary-channel:   #008c8c;
				--mod4-secondary-note:    #008c8c;
				--mod4-primary-note:      #008c8c;
				}
			`,
        "brucebox": `
		:root {
				font: 16px/2 cursive;
				--page-margin: #4667CE;
				--editor-background: #4667CE;
					--track-editor-bg-pitch-dim: #444;
					--track-editor-bg-noise-dim: #444;
					--pitch-channel-limit: 3;
					--noise-channel-limit: 1;
				--pitch1-secondary-channel: #bda822;
				--pitch1-primary-channel:   #fcdb00;
				--pitch1-secondary-note:    #bda822;
				--pitch1-primary-note:      #fcdb00;
				--pitch2-secondary-channel: #612278;
				--pitch2-primary-channel:   #bb00ff;
				--pitch2-secondary-note:    #612278;
				--pitch2-primary-note:      #bb00ff;
				--pitch3-secondary-channel: #8b4343;
				--pitch3-primary-channel:   #ff8844;
				--pitch3-secondary-note:    #8b4343;
				--pitch3-primary-note:      #ff8844;
				--pitch4-secondary-channel: #bda822;
				--pitch4-primary-channel:   #fcdb00;
				--pitch4-secondary-note:    #bda822;
				--pitch4-primary-note:      #fcdb00;
				--pitch5-secondary-channel: #612278;
				--pitch5-primary-channel:   #bb00ff;
				--pitch5-secondary-note:    #612278;
				--pitch5-primary-note:      #bb00ff;
				--pitch6-secondary-channel: #8b4343;
				--pitch6-primary-channel:   #ff8844;
				--pitch6-secondary-note:    #8b4343;
				--pitch6-primary-note:      #ff8844;
				--pitch7-secondary-channel: #bda822;
				--pitch7-primary-channel:   #fcdb00;
				--pitch7-secondary-note:    #bda822;
				--pitch7-primary-note:      #fcdb00;
				--pitch8-secondary-channel: #612278;
				--pitch8-primary-channel:   #bb00ff;
				--pitch8-secondary-note:    #612278;
				--pitch8-primary-note:      #bb00ff;
				--pitch9-secondary-channel: #8b4343;
				--pitch9-primary-channel:   #ff8844;
				--pitch9-secondary-note:    #8b4343;
				--pitch9-primary-note:      #ff8844;
				--pitch10-secondary-channel: #bda822;
				--pitch10-primary-channel:   #fcdb00;
				--pitch10-secondary-note:    #bda822;
				--pitch10-primary-note:      #fcdb00;
				--noise1-secondary-channel: #991010;
				}

				.trackContainer .noSelection {
				background: black !important;
				}

				span input, 
				div.harmonics svg,
				div.spectrum svg,
				div.filterEditor svg,
				div.fadeInOut svg,
				div.loopEditor svg,
				svg#firstImage,
				div.trackContainer div.noSelection
				{
					background: black !important;
				}

				input, textarea {
					background-color: black !important;
				}

				#text-content > section > h1 {
					color: white;
				}

			`,
        "shitbox 2.0": `
			:root {
			--page-margin: maroon;
					--playhead: firebrick;
					--primary-text: silver;
				--text-selection: rgba(139,69,19,0.99);
					--box-selection-fill: rgba(220,20,60,0.2);
					--loop-accent: #841;
					--link-accent: #841;
					--ui-widget-background: #800;
					--ui-widget-focus: #a00;
					--pitch-background: #700;
					--tonic: #522;
					--fifth-note: #f75;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 3;
				--pitch1-secondary-channel: #7e4a35;
					--pitch1-primary-channel:   #c27251;
					--pitch1-secondary-note:    #7e4a35;
					--pitch1-primary-note:      #f09571;
					--pitch2-secondary-channel: #998a5c;
					--pitch2-primary-channel:   #d9c27c;
					--pitch2-secondary-note:    #998a5c;
					--pitch2-primary-note:      #fae196;
					--pitch3-secondary-channel: #9c927c;
					--pitch3-primary-channel:   #dbceb0;
					--pitch3-secondary-note:    #9c927c;
					--pitch3-primary-note:      #eddebb;
					--pitch4-secondary-channel: #838060;
					--pitch4-primary-channel:   #ccc795;
					--pitch4-secondary-note:    #838060;
					--pitch4-primary-note:      #f2ecb1;
					--pitch5-secondary-channel: #8b6f47;
					--pitch5-primary-channel:   #d1a76b;
					--pitch5-secondary-note:    #8b6f47;
					--pitch5-primary-note:      #ffcc82;
					--pitch6-secondary-channel: #a96e5b;
					--pitch6-primary-channel:   #e3967d;
					--pitch6-secondary-note:    #a96e5b;
					--pitch6-primary-note:      #ffa68a;
						--pitch7-secondary-channel: #7e4a35;
					--pitch7-primary-channel:   #c27251;
					--pitch7-secondary-note:    #7e4a35;
					--pitch7-primary-note:      #f09571;
					--pitch8-secondary-channel: #998a5c;
					--pitch8-primary-channel:   #d9c27c;
					--pitch8-secondary-note:    #998a5c;
					--pitch8-primary-note:      #fae196;
					--pitch9-secondary-channel: #9c927c;
					--pitch9-primary-channel:   #dbceb0;
					--pitch9-secondary-note:    #9c927c;
					--pitch9-primary-note:      #eddebb;
					--pitch10-secondary-channel: #838060;
					--pitch10-primary-channel:   #ccc795;
					--pitch10-secondary-note:    #838060;
					--pitch10-primary-note:      #f2ecb1;
					--noise4-secondary-channel: #6f6f6f;
					--noise4-primary-channel:   #aaaaaa;
					--noise4-secondary-note:    #a7a7a7;
					--noise4-primary-note:      #e0e0e0;
					--noise5-secondary-channel: #996633;
					--noise5-primary-channel:   #ddaa77;
					--noise5-secondary-note:    #cc9966;
					--noise5-primary-note:      #f0d0bb;
         --mod1-secondary-channel: #7e4a35;
					--mod1-primary-channel:   #c27251;
					--mod1-secondary-note:    #7e4a35;
					--mod1-primary-note:      #f09571;
					--mod2-secondary-channel: #998a5c;
					--mod2-primary-channel:   #d9c27c;
					--mod2-secondary-note:    #998a5c;
					--mod2-primary-note:      #fae196;
					--mod3-secondary-channel: #9c927c;
					--mod3-primary-channel:   #dbceb0;
					--mod3-secondary-note:    #9c927c;
					--mod3-primary-note:      #eddebb;
					--mod4-secondary-channel: #838060;
					--mod4-primary-channel:   #ccc795;
					--mod4-secondary-note:    #838060;
					--mod4-primary-note:      #f2ecb1;
					--note-flash: firebrick;
  					--note-flash-secondary: firebrick;
				}
			`,
        "shitbox 3.0": `
			
			:root {
				font: 20px/2 monospace;
				--page-margin: #252525;
				--editor-background: #252525;
				--primary-text: #C8C8C8;
				--link-accent: #945800;
					--track-editor-bg-pitch-dim: #444;
					--track-editor-bg-noise-dim: #444;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 3;
					--text-disabled-icon: ✗ ;
				}

				.beepboxEditor input[type="range"]::-moz-range-thumb {
					width: 8px !important;
				  }

				button.playButton {
					width: 80px;
				}
				button.prevBarButton {
					width: 40px;
					left:-5px;
				}
				button.nextBarButton {
					width: 40px;
				}

				.trackContainer .noSelection {
				background: black !important;
				}

				span input, 
				div.harmonics svg,
				div.spectrum svg,
				div.filterEditor svg,
				div.fadeInOut svg,
				div.loopEditor svg,
				svg#firstImage 
				{
					background: black !important;
				}

				.beepboxEditor {
					line-height: 1.25;
				}

				#text-content {
					font-size: 32px;
					line-height: 40px;
				}

				#text-content > section > h1 {
					color: #C8C8C8;
					}
			`,
        "nerdbox": `
			:root {
					--pitch-channel-limit: 9;
					--noise-channel-limit: 3;
				--pitch1-secondary-channel: #139620;
				--pitch1-primary-channel:   #25ff3a;
				--pitch1-secondary-note:    #139620;
				--pitch1-primary-note:      #25ff3a;
				--pitch2-secondary-channel: #109986;
				--pitch2-primary-channel:   #1cffe0;
				--pitch2-secondary-note:    #109986;
				--pitch2-primary-note:      #1cffe0;
				--pitch3-secondary-channel: #127296;
				--pitch3-primary-channel:   #21c3ff;
				--pitch3-secondary-note:    #127296;
				--pitch3-primary-note:      #21c3ff;
				--pitch4-secondary-channel: #6038a5;
				--pitch4-primary-channel:   #9456ff;
				--pitch4-secondary-note:    #6038a5;
				--pitch4-primary-note:      #ff35e0;
				--pitch5-secondary-channel: #a52491;
				--pitch5-primary-channel:   #ff35e0;
				--pitch5-secondary-note:    #a52491;
				--pitch5-primary-note:      #af3221;
				--pitch6-secondary-channel: #af3221;
				--pitch6-primary-channel:   #ff4a32;
				--pitch6-secondary-note:    #af3221;
				--pitch6-primary-note:      #ff4a32;
				--pitch7-secondary-channel: #ad6e0f;
				--pitch7-primary-channel:   #ffa216;
				--pitch7-secondary-note:    #ad6e0f;
				--pitch7-primary-note:      #ffa216;
				--pitch8-secondary-channel: #ad6e0f;
				--pitch8-primary-channel:   #ffa216;
				--pitch8-secondary-note:    #ad6e0f;
				--pitch8-primary-note:      #ffa216;
				--pitch9-secondary-channel: #a7b512;
				--pitch9-primary-channel:   #ebff19;
				--pitch9-secondary-note:    #a7b512;
				--pitch9-primary-note:      #ebff19;
				--pitch10-secondary-channel:#70ad1b;
				--pitch10-primary-channel:  #a4ff26;
				--pitch10-secondary-note:   #70ad1b;
				--pitch10-primary-note:     #a4ff26;
				--noise1-secondary-channel: #68706f;
				--noise1-primary-channel:   #a6b2b1;
				--noise1-secondary-note:    #68706f;
				--noise1-primary-note:      #a6b2b1;
				--noise2-secondary-channel: #665c64;
				--noise2-primary-channel:   #a396a1;
				--noise2-secondary-note:    #665c64;
				--noise2-primary-note:      #a396a1;
				--noise3-secondary-channel: #60605a;
				--noise3-primary-channel:   #afaea3;
				--noise3-secondary-note:    #60605a;
				--noise3-primary-note:      #afaea3;
			--noise4-secondary-channel: #665c64;
			--noise4-primary-channel:   #a396a1;
				--noise4-secondary-note:    #665c64;
				--noise4-primary-note:      #a396a1;
				--noise5-secondary-channel: #60605a;
				--noise5-primary-channel:   #afaea3;
				--noise5-secondary-note:    #60605a;
				--noise5-primary-note:      #afaea3;
         --mod1-secondary-channel: #139620;
				--mod1-primary-channel:   #25ff3a;
				--mod1-secondary-note:    #139620;
				--mod1-primary-note:      #25ff3a;
				--mod2-secondary-channel: #109986;
				--mod2-primary-channel:   #1cffe0;
				--mod2-secondary-note:    #109986;
				--mod2-primary-note:      #1cffe0;
				--mod3-secondary-channel: #127296;
				--mod3-primary-channel:   #21c3ff;
				--mod3-secondary-note:    #127296;
				--mod3-primary-note:      #21c3ff;
				--mod4-secondary-channel: #6038a5;
				--mod4-primary-channel:   #9456ff;
				--mod4-secondary-note:    #6038a5;
				--mod4-primary-note:      #ff35e0;
				}
			`,
        "nepbox": `
			:root {
				--page-margin: #000;
				--editor-background: #060606;
				--hover-preview: #fff;
				--playhead: rgb(0, 242, 255);
				--primary-text: #00fff5;
				--secondary-text: #a82f2f;
				--inverted-text: #000;
				--text-selection: rgba(98, 46, 164, .99);
				--box-selection-fill: #b74a4a;
				--loop-accent: #7744FF;
				--link-accent: #ff00e1;
				--ui-widget-background: #484848;
				--ui-widget-focus: #3e3e3e;
				--pitch-background: #0a2d44;
				--tonic: #9150ff;
				--fifth-note: #900;
				--white-piano-key: #353535;
				--black-piano-key: #fff;
				--white-piano-key-text: #fff;
				--black-piano-key-text: #000;
				--track-editor-bg-pitch: #424242;
				--track-editor-bg-pitch-dim: #000;
				--track-editor-bg-noise: #424242;
				--track-editor-bg-noise-dim: #000;
				--track-editor-bg-mod: #3c3c3c;
				--track-editor-bg-mod-dim: #000;
				--multiplicative-mod-slider: #fff;
				--overwriting-mod-slider: #9d9d9d;
				--indicator-primary: #f00;
				--indicator-secondary: #919191;
				--select2-opt-group: #5d576f;
				--input-box-outline: #626262;
				--mute-button-normal: #9a00ff;
				--mute-button-mod: #00fff7;
				--mod-label-primary: #2b2b2b;
				--pitch-channel-limit: 4;
				--noise-channel-limit: 2;

				--pitch1-secondary-channel: #c13cbf;
				--pitch1-primary-channel: #f75dff;
				--pitch1-secondary-note: #b930a2;
				--pitch1-primary-note: #fca5ff;
				--pitch2-secondary-channel: #800000;
				--pitch2-primary-channel: #f00;
				--pitch2-secondary-note: #8c2121;
				--pitch2-primary-note: #ff5252;
				--pitch3-secondary-channel: #004bb3;
				--pitch3-primary-channel: #1792ff;
				--pitch3-secondary-note: #005cb3;
				--pitch3-primary-note: #00ffe9;
				--pitch4-secondary-channel: #a48800;
				--pitch4-primary-channel: #fb0;
				--pitch4-secondary-note: #9c4100;
				--pitch4-primary-note: #ffd84e;
				--noise1-secondary-channel: #868686;
				--noise1-primary-channel: #fff;
				--noise1-secondary-note: #868686;
				--noise1-primary-note: #fff;
				--noise2-secondary-channel: #805300;
				--noise2-primary-channel: #ff8c00;
				--noise2-secondary-note: #6a3500;
				--noise2-primary-note: #a85400;
				--mod1-secondary-channel: #6c0000;
				--mod1-primary-channel: #ff3e3e;
				--mod1-secondary-note: #6c0000;
				--mod1-primary-note: #ff3e3e;
				--mod2-secondary-channel: #d25a00;
				--mod2-primary-channel: #fdff00;
				--mod2-secondary-note: #d25a00;
				--mod2-primary-note: #fdff00;
				--mod3-secondary-channel: #046000;
				--mod3-primary-channel: #23ff1b;
				--mod3-secondary-note: #046000;
				--mod3-primary-note: #23ff1b;
				--mod4-secondary-channel: #3b2bae;
				--mod4-primary-channel: #0c79ff;
				--mod4-secondary-note: #3b2bae;
				--mod4-primary-note: #0c79ff;
				--disabled-note-secondary: #696969;
				}
			`,
        "cardboardbox classic": `
				:root {
					--page-margin: #0f0700;
--editor-background: #0f0700;
--hover-preview: #75461d;
--playhead: #75461d;
--primary-text: #ddd;
--secondary-text: #8e695b;
--text-selection: #75461d;
--box-selection-fill: rgba(117, 70, 29,0.5);
--loop-accent: #75461d;
--link-accent: #75461d;
--ui-widget-background: #574a3e;
--ui-widget-focus: #756453;
--pitch-background: #361900;
--tonic: #fdba9a;
--fifth-note: #7f78d2;
--pitch1-secondary-channel: #798566;
--pitch1-primary-channel: #9dab86;
--pitch1-secondary-note: #798566;
--pitch1-primary-note: #9dab86;
--pitch2-secondary-channel: #a6733d;
--pitch2-primary-channel: #e6a157;
--pitch2-secondary-note: #a6733d;
--pitch2-primary-note: #e6a157;
--pitch3-secondary-channel: #874c27;
--pitch3-primary-channel: #eb8242;
--pitch3-secondary-note: #874c27;
--pitch3-primary-note: #eb8242;
--pitch4-secondary-channel: #395866;
--pitch4-primary-channel: #537d91;
--pitch4-secondary-note: #395866;
--pitch4-primary-note: #537d91;
--pitch5-secondary-channel: #779992;
--pitch5-primary-channel: #a4d1c8;
--pitch5-secondary-note: #779992;
--pitch5-primary-note: #a4d1c8;
--pitch7-secondary-channel: #300707;
--pitch7-primary-channel: #560d0d;
--pitch7-secondary-note: #300707;
--pitch7-primary-note: #560d0d;
--pitch8-secondary-channel: #486312;
--pitch8-primary-channel: #76a21e;
--pitch8-secondary-note: #486312;
--pitch8-primary-note: #76a21e;
--pitch9-secondary-channel: #4a1242;
--pitch9-primary-channel: #721b65;
--pitch9-secondary-note: #4a1242;
--pitch9-primary-note: #721b65;
--pitch10-secondary-channel: #7a312d;
--pitch10-primary-channel: #f8615a;
--pitch10-secondary-note: #7a312d;
--pitch10-primary-note: #f8615a;
--noise1-secondary-channel: #5f6582;
--noise1-primary-channel: #a6b1e1;
--noise1-secondary-note: #5f6582;
--noise1-primary-note: #a6b1e1;
--noise4-secondary-channel: #6B3E8E;
--noise5-secondary-channel: #996633;
--noise5-primary-channel: #ddaa77;
--noise5-secondary-note: #cc9966;
--noise5-primary-note: #f0d0bb;
--mod1-secondary-channel: #339955;
				}
			`,
        "blubox classic": `
			:root {
				--page-margin: #040410;
					--editor-background: #040410;
					--secondary-text: #84859a;
					--box-selection-fill: #044b94;
					--link-accent: #024ACA;
					--ui-widget-background: #393e4f;
					--ui-widget-focus: #6d6886;
					--pitch-background: #393e4f;
					--tonic: #725491;
					--fifth-note: #54547a;
					--track-editor-bg-pitch: #393e4f;
					--track-editor-bg-pitch-dim: #1c1d28;
					--track-editor-bg-noise: #3d3535;
					--track-editor-bg-noise-dim: #161313;
					--track-editor-bg-mod: #283560;
					--track-editor-bg-mod-dim: #0a101f;
					--multiplicative-mod-slider: #606c9f;
					--overwriting-mod-slider: #6850b5;
					--indicator-primary: #9c64f7;
					--indicator-secondary: #393e4f;
					--select2-opt-group: #5d576f;
					--input-box-outline: #222;
					--mute-button-normal: #886eae;
					--pitch1-secondary-channel: #0A89FF;
					--pitch1-primary-channel:   #024ACA;
					--pitch1-secondary-note:    #0A89FF;
					--pitch1-primary-note:      #024ACA;
					--pitch2-secondary-channel: #0A89FF;
					--pitch2-primary-channel:   #024ACA;
					--pitch2-secondary-note:    #0A89FF;
					--pitch2-primary-note:      #024ACA;
					--pitch3-secondary-channel: #0A89FF;
					--pitch3-primary-channel:   #024ACA;
					--pitch3-secondary-note:    #0A89FF;
					--pitch3-primary-note:      #024ACA;
					--pitch4-secondary-channel: #0A89FF;
					--pitch4-primary-channel:   #024ACA;
					--pitch4-secondary-note:    #0A89FF;
					--pitch4-primary-note:      #024ACA;
					--pitch5-secondary-channel: #0A89FF;
					--pitch5-primary-channel:   #024ACA;
					--pitch5-secondary-note:    #0A89FF;
					--pitch5-primary-note:      #024ACA;
					--pitch6-secondary-channel: #0A89FF;
					--pitch6-primary-channel:   #024ACA;
					--pitch6-secondary-note:    #0A89FF;
					--pitch6-primary-note:      #024ACA;
					--pitch7-secondary-channel: #0A89FF;
					--pitch7-primary-channel:   #024ACA;
					--pitch7-secondary-note:	  #0A89FF;
					--pitch7-primary-note:			#024ACA;
					--pitch8-secondary-channel: #0A89FF;
					--pitch8-primary-channel:   #024ACA;
					--pitch8-secondary-note:    #0A89FF;
					--pitch8-primary-note:      #024ACA;
					--pitch9-secondary-channel: #0A89FF;
					--pitch9-primary-channel:   #024ACA;
					--pitch9-secondary-note:    #0A89FF;
					--pitch9-primary-note:			#024ACA;
					--pitch10-secondary-channel:#0A89FF;
					--pitch10-primary-channel:  #024ACA;
					--pitch10-secondary-note:   #0A89FF;
					--pitch10-primary-note:     #024ACA;
					--noise1-secondary-channel: #0A89FF;
					--noise1-primary-channel:   #024ACA;
					--noise1-secondary-note:    #0A89FF;
					--noise1-primary-note:      #024ACA;
					--noise2-secondary-channel: #0A89FF;
					--noise2-primary-channel:   #024ACA;
					--noise2-secondary-note:    #0A89FF;
					--noise2-primary-note:      #024ACA;
					--noise3-secondary-channel: #0A89FF;
					--noise3-primary-channel:   #024ACA;
					--noise3-secondary-note:    #0A89FF;
					--noise3-primary-note:      #024ACA;
					--noise4-secondary-channel: #0A89FF;
					--noise4-primary-channel:   #024ACA;
					--noise4-secondary-note:    #0A89FF;
					--noise4-primary-note:      #024ACA;
					--mod1-secondary-channel:   #0A89FF;
					--mod1-primary-channel:     #024ACA;
					--mod1-secondary-note:      #0A89FF;
					--mod1-primary-note:        #024ACA;
					--mod2-secondary-channel:   #0A89FF;
					--mod2-primary-channel:     #024ACA;
					--mod2-secondary-note:      #0A89FF;
					--mod2-primary-note:        #024ACA;
					--mod3-secondary-channel:   #0A89FF;
					--mod3-primary-channel:     #024ACA;
					--mod3-secondary-note:      #0A89FF;
					--mod3-primary-note:			  #024ACA;
					--mod4-secondary-channel:   #0A89FF;
					--mod4-primary-channel:     #024ACA;
					--mod4-secondary-note:      #0A89FF;
					--mod4-primary-note:        #024ACA;
					--mod-label-primary:        #282840;
					--mod-label-secondary-text: rgb(87, 86, 120);
					--mod-label-primary-text:   white;
				}
			`,
        "dogebox classic": `
				:root {
			--page-margin: #0d0063;
			--editor-background: #0D0063;
			--pitch-background: #322c59;
			--tonic: #1c1933;
			--fifth-note: #7b74ad;
			--pitch-channel-limit: 6;
			--noise-channel-limit: 3;
			--pitch1-secondary-channel: #c7ac00;
			--pitch1-primary-channel: #fcf403;
			--pitch1-secondary-note: #c7c700;
			--pitch1-primary-note: #fcf403;
			--pitch2-secondary-channel: #9400b5;
			--pitch2-primary-channel: #ff00ee;
			--pitch2-secondary-note: #9400b5;
			--pitch2-primary-note: #ff00ee;
			--pitch3-secondary-channel: #b37466;
			--pitch3-primary-channel: #ffc6a1;
			--pitch3-secondary-note: #b37466;
			--pitch3-primary-note: #ffc6a1;
			--pitch7-secondary-channel: #c7ac00;
			--pitch7-primary-channel: #fcf403;
			--pitch7-secondary-note: #c7c700;
			--pitch7-primary-note: #fcf403;
			--pitch8-secondary-channel: #9400b5;
			--pitch8-primary-channel: #ff00ee;
			--pitch8-secondary-note: #9400b5;
			--pitch8-primary-note: #ff00ee;
			--pitch9-secondary-channel: #b37466;
			--pitch9-primary-channel: #ffc6a1;
			--pitch9-secondary-note: #b37466;
			--pitch9-primary-note: #ffc6a1;
			--pitch10-secondary-channel: #00a100;
			--pitch10-primary-channel: #50ff50;
			--pitch10-secondary-note: #00c700;
			--pitch10-primary-note: #a0ffa0;
			--noise1-secondary-channel: #95acad;
			--noise1-primary-channel: #cee9eb;
			--noise1-secondary-note: #95acad;
			--noise1-primary-note: #cee9eb;
			--noise4-secondary-channel: #7c9b42;
			--noise4-primary-channel:   #a5ff00;
			--noise4-secondary-note:    #7c9b42;
			--noise4-primary-note:      #a5ff00;
			--noise5-secondary-channel: #7c9b42;
      	 	--mod1-secondary-channel: #c7ac00;
			--mod1-primary-channel: #fcf403;
			--mod1-secondary-note: #c7c700;
			--mod1-primary-note: #fcf403;
			--mod2-secondary-channel: #9400b5;
			--mod2-primary-channel: #ff00ee;
			--mod2-secondary-note: #9400b5;
			--mod2-primary-note: #ff00ee;
			--mod3-secondary-channel: #b37466;
			--mod3-primary-channel: #ffc6a1;
			--mod3-secondary-note: #b37466;
			--mod3-primary-note: #ffc6a1;
			--mod4-secondary-channel: #00a100;
			--mod4-primary-channel: #50ff50;
			--mod4-secondary-note: #00c700;
			--mod4-primary-note: #a0ffa0;
				}
			`,
        "dogebox dark": `
				:root {
					--page-margin: #0d0063;
					--editor-background: #0D0063;
					--pitch-background: #322c59;
					--tonic: #1c1933;
					--fifth-note: #7b74ad;
					--pitch1-secondary-channel: #c7ac00;
					--pitch1-primary-channel:   #fcf403;
					--pitch1-secondary-note:    #c7c700;
					--pitch1-primary-note:      #fcf403;
					--pitch2-secondary-channel: #9400b5;
					--pitch2-primary-channel:   #ff00ee;
					--pitch2-secondary-note:    #9400b5;
					--pitch2-primary-note:      #ff00ee;
					--pitch3-secondary-channel: #b37466;
					--pitch3-primary-channel:   #ffc6a1;
					--pitch3-secondary-note:    #b37466;
					--pitch3-primary-note:      #ffc6a1;
					--noise1-secondary-channel: #95acad;
					--noise1-primary-channel:   #cee9eb;
					--noise1-secondary-note:    #95acad;
					--noise1-primary-note:      #cee9eb;
				}
			`,
        "todbox dark mode": `
			:root {
				-webkit-text-stroke-width: 0.5px;
					--hover-preview: #999999;
					--playhead: #999999;
					--primary-text: #999999;
					--secondary-text: #444444;
				--text-selection: #999999;
					--box-selection-fill: #999999;
					--loop-accent: #999999;
					--link-accent: #999999;
					--ui-widget-background: #222222;
					--ui-widget-focus: #444444;
				--pitch-background: #101010;
					--tonic: #404040;
					--fifth-note: #202020;
					--white-piano-key: #999999;
					--black-piano-key: #101010;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 3;
					--pitch1-secondary-channel: #004444;
					--pitch1-primary-channel:   #009999;
					--pitch1-secondary-note:    #004444;
					--pitch1-primary-note:      #009999;
					--pitch2-secondary-channel: #444400;
					--pitch2-primary-channel:   #999900;
					--pitch2-secondary-note:    #444400;
					--pitch2-primary-note:      #999900;
					--pitch3-secondary-channel: #443300;
					--pitch3-primary-channel:   #996600;
					--pitch3-secondary-note:    #443300;
					--pitch3-primary-note:      #996600;
					--pitch4-secondary-channel: #004400;
					--pitch4-primary-channel:   #009900;
					--pitch4-secondary-note:    #004400;
					--pitch4-primary-note:      #009900;
					--pitch5-secondary-channel: #440044;
					--pitch5-primary-channel:   #990099;
					--pitch5-secondary-note:    #440044;
					--pitch5-primary-note:      #990099;
					--pitch6-secondary-channel: #333344;
					--pitch6-primary-channel:   #666699;
					--pitch6-secondary-note:    #333344;
					--pitch6-primary-note:      #666699;
					--pitch7-secondary-channel: #444400;
					--pitch7-primary-channel:   #999900;
					--pitch7-secondary-note:    #444400;
					--pitch7-primary-note:      #999900;
					--pitch8-secondary-channel: #824E54;
					--pitch8-primary-channel:   #C4757E;
					--pitch8-secondary-note:    #824E54;
					--pitch8-primary-note:      #C4757E;
					--pitch9-secondary-channel: #006342;
					--pitch9-primary-channel:   #008E5F;
					--pitch9-secondary-note:    #006342;
					--pitch9-primary-note:      #008E5F;
					--pitch10-secondary-channel: #561291;
					--pitch10-primary-channel:   #7819C1;
					--pitch10-secondary-note:    #561291;
					--pitch10-primary-note:      #7819C1;
					--noise1-secondary-channel: #444444;
					--noise1-primary-channel:   #999999;
					--noise1-secondary-note:    #444444;
					--noise1-primary-note:      #999999;
					--noise2-secondary-channel: #443311;
					--noise2-primary-channel:   #996633;
					--noise2-secondary-note:    #443311;
					--noise2-primary-note:      #996633;
					--noise3-secondary-channel: #113344;
					--noise3-primary-channel:   #336699;
					--noise3-secondary-note:    #113344;
					--noise3-primary-note:      #336699;
					--noise4-secondary-channel: #444444;
					--noise4-primary-channel:   #999999;
					--noise4-secondary-note:    #444444;
					--noise4-primary-note:      #999999;
					--noise5-secondary-channel: #443311;
					--noise5-primary-channel:   #996633;
					--noise5-secondary-note:    #443311;
					--noise5-primary-note:      #996633;
          --mod1-secondary-channel: #004444;
					--mod1-primary-channel:   #009999;
					--mod1-secondary-note:    #004444;
					--mod1-primary-note:      #009999;
					--mod2-secondary-channel: #444400;
					--mod2-primary-channel:   #999900;
					--mod2-secondary-note:    #444400;
					--mod2-primary-note:      #999900;
					--mod3-secondary-channel: #443300;
					--mod3-primary-channel:   #996600;
					--mod3-secondary-note:    #443300;
					--mod3-primary-note:      #996600;
					--mod4-secondary-channel: #004400;
					--mod4-primary-channel:   #009900;
					--mod4-secondary-note:    #004400;
					--mod4-primary-note:      #009900;
				}
				.beepboxEditor button, .beepboxEditor select {
					box-shadow: inset 0 0 0 1px var(--secondary-text);
				}
			`,
        "mainbox 1.0": `
			:root {
				--loop-accent: #2F1C40;
				--link-accent: #543873;
				--ui-widget-background: #2F1C40;
				--ui-widget-focus: #543873;
				--pitch-background: #2F1C40;
				--tonic: #42286D;
				--fifth-note: #37416B;
				--white-piano-key: #156CB6;
				--black-piano-key: #130D14;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 3;
					--pitch1-secondary-channel: #156C99;
					--pitch1-primary-channel:   #00CFDF;
					--pitch1-secondary-note:    #0080A8;
					--pitch1-primary-note:      #009FC6;
					--pitch2-secondary-channel: #AD923A;
					--pitch2-primary-channel:   #FFD552;
					--pitch2-secondary-note:    #C49736;
					--pitch2-primary-note:      #EFC742;
					--pitch3-secondary-channel: #7A401E;
					--pitch3-primary-channel:   #C14E30;
					--pitch3-secondary-note:    #89381B;
					--pitch3-primary-note:      #E15427;
					--pitch4-secondary-channel: #0B6030;
					--pitch4-primary-channel:   #00915C;
					--pitch4-secondary-note:    #004337;
					--pitch4-primary-note:      #00915E;
					--pitch5-secondary-channel: #543873;
					--pitch5-primary-channel:   #695B95;
					--pitch5-secondary-note:    #8188BE;
					--pitch5-primary-note:      #848ED8;
					--pitch6-secondary-channel: #585882;
					--pitch6-primary-channel:   #5A72DD;
					--pitch7-secondary-channel: #7D7C2E;
					--pitch7-primary-channel:   #B0C952;
					--pitch7-secondary-note:    #7D7C2E;
					--pitch7-primary-note:      #B0C952;
					--pitch8-secondary-channel: #7F426A;
					--pitch8-primary-channel:   #B75297;
					--pitch8-secondary-note:    #7F426A;
					--pitch8-primary-note:      #B75297;
					--pitch9-secondary-channel: #2A6B65;
					--pitch9-primary-channel:   #3BA590;
					--pitch9-secondary-note:    #2A6B65;
					--pitch9-primary-note:      #3BA590;
					--pitch10-secondary-channel: #713EA0;
					--pitch10-primary-channel:   #925EC9;
					--pitch10-secondary-note:    #713EA0;
					--pitch10-primary-note:      #925EC9;
					--noise1-secondary-channel: #6C6C8E;
					--noise1-primary-channel:   #8A7F96;
					--noise1-secondary-note:    #A1A3B7;
					--noise1-primary-note:      #DDBADD;
					--noise2-secondary-channel: #865E40;
					--noise2-secondary-note:    #C7B47A;
					--noise2-primary-note:      #CFC587;
					--noise3-secondary-channel: #7E7068;
					--noise3-primary-channel:   #B19998;
					--noise3-secondary-note:    #BAA6BC;
					--noise3-primary-note:      #EDDCEC;
          --mod1-secondary-channel: #156C99;
					--mod1-primary-channel:   #00CFDF;
					--mod1-secondary-note:    #0080A8;
					--mod1-primary-note:      #009FC6;
					--mod2-secondary-channel: #AD923A;
					--mod2-primary-channel:   #FFD552;
					--mod2-secondary-note:    #C49736;
					--mod2-primary-note:      #EFC742;
					--mod3-secondary-channel: #7A401E;
					--mod3-primary-channel:   #C14E30;
					--mod3-secondary-note:    #89381B;
					--mod3-primary-note:      #E15427;
					--mod4-secondary-channel: #0B6030;
					--mod4-primary-channel:   #00915C;
					--mod4-secondary-note:    #004337;
					--mod4-primary-note:      #00915E;
				}
			`,
        "fogbox": `
			:root {
				--page-margin: #252525;
				--editor-background: #252525;
				--hover-preview: white;
				--playhead: white;
				--primary-text: white;
				--secondary-text: #999;
				--inverted-text: black;
				--text-selection: rgba(119,68,255,0.99);
				--box-selection-fill: rgba(255,255,255,0.2);
				--loop-accent: #74f;
				--link-accent: #98f;
				--ui-widget-background: #444;
				--ui-widget-focus: #777;
				--pitch-background: #444;
				--tonic: #864;
				--fifth-note: #468;
				--white-piano-key: #bbb;
				--black-piano-key: #444;
				--white-piano-key-text: #131200;
				--black-piano-key-text: #fff;
					--use-color-formula: false;
					--track-editor-bg-pitch: #444;
					--track-editor-bg-pitch-dim: #333;
					--track-editor-bg-noise: #444;
					--track-editor-bg-noise-dim: #333;
					--track-editor-bg-mod: #234;
					--track-editor-bg-mod-dim: #123;
					--multiplicative-mod-slider: #456;
					--overwriting-mod-slider: #654;
					--indicator-primary: #74f;
					--indicator-secondary: #444;
					--select2-opt-group: #585858;
					--input-box-outline: #333;
					--mute-button-normal: #ffa033;
					--mute-button-mod: #9a6bff;
				--pitch1-secondary-channel: #0099A1;
				--pitch1-primary-channel:   #25F3FF;
				--pitch1-secondary-note:    #00BDC7;
				--pitch1-primary-note:      #92F9FF;
				--pitch2-secondary-channel: #A1A100;
				--pitch2-primary-channel:   #FFFF25;
				--pitch2-secondary-note:    #C7C700;
				--pitch2-primary-note:      #FFFF92;
				--pitch3-secondary-channel: #C75000;
				--pitch3-primary-channel:   #FF9752;
				--pitch3-secondary-note:    #FF771C;
				--pitch3-primary-note:      #FFCDAB;
				--pitch4-secondary-channel: #00A100;
				--pitch4-primary-channel:   #50FF50;
				--pitch4-secondary-note:    #00C700;
				--pitch4-primary-note:      #A0FFA0;
				--pitch5-secondary-channel: #D020D0;
				--pitch5-primary-channel:   #FF90FF;
				--pitch5-secondary-note:    #E040E0;
				--pitch5-primary-note:      #FFC0FF;
				--pitch6-secondary-channel: #7777B0;
				--pitch6-primary-channel:   #A0A0FF;
				--pitch6-secondary-note:    #8888D0;
				--pitch6-primary-note:      #D0D0FF;
				--pitch7-secondary-channel: #8AA100;
				--pitch7-primary-channel:   #DEFF25;
				--pitch7-secondary-note:    #AAC700;
				--pitch7-primary-note:      #E6FF92;
				--pitch8-secondary-channel: #DF0019;
				--pitch8-primary-channel:   #FF98A4;
				--pitch8-secondary-note:    #FF4E63;
				--pitch8-primary-note:      #FFB2BB;
				--pitch9-secondary-channel: #00A170;
				--pitch9-primary-channel:   #50FFC9;
				--pitch9-secondary-note:    #00C78A;
				--pitch9-primary-note:      #83FFD9;
				--pitch10-secondary-channel:#A11FFF;
				--pitch10-primary-channel:  #CE8BFF;
				--pitch10-secondary-note:   #B757FF;
				--pitch10-primary-note:     #DFACFF;
				--noise1-secondary-channel: #6F6F6F;
				--noise1-primary-channel:   #AAAAAA;
				--noise1-secondary-note:    #A7A7A7;
				--noise1-primary-note:      #E0E0E0;
				--noise2-secondary-channel: #996633;
				--noise2-primary-channel:   #DDAA77;
				--noise2-secondary-note:    #CC9966;
				--noise2-primary-note:      #F0D0BB;
				--noise3-secondary-channel: #4A6D8F;
				--noise3-primary-channel:   #77AADD;
				--noise3-secondary-note:    #6F9FCF;
				--noise3-primary-note:      #BBD7FF;
				--noise4-secondary-channel: #7A4F9A;
				--noise4-primary-channel:   #AF82D2;
				--noise4-secondary-note:    #9E71C1;
				--noise4-primary-note:      #D4C1EA;
				--noise5-secondary-channel: #607837;
				--noise5-primary-channel:   #A2BB77;
				--noise5-secondary-note:    #91AA66;
				--noise5-primary-note:      #C5E2B2;
          --mod1-secondary-channel:   #339955;
					--mod1-primary-channel:     #77fc55;
					--mod1-secondary-note:      #77ff8a;
					--mod1-primary-note:        #cdffee;
					--mod2-secondary-channel:   #993355;
					--mod2-primary-channel:     #f04960;
					--mod2-secondary-note:      #f057a0;
					--mod2-primary-note:        #ffb8de;
					--mod3-secondary-channel:   #553399;
					--mod3-primary-channel:     #8855fc;
					--mod3-secondary-note:      #aa64ff;
					--mod3-primary-note:	    #f8ddff;
					--mod4-secondary-channel:   #a86436;
					--mod4-primary-channel:     #c8a825;
					--mod4-secondary-note:      #e8ba46;
					--mod4-primary-note:        #fff6d3;
					--mod-label-primary:        #999;
					--mod-label-secondary-text: #333;
					--mod-label-primary-text:   black;
					--disabled-note-primary:    #999;
					--disabled-note-secondary:  #666;
				}
			`,
        "foxbox": `
			:root {
				--page-margin: #ADD8E6;
				}
			`,
        "wackybox": `
			
			:root {
				--page-margin: #050000;
				--editor-background: #050000;
					--pitch-channel-limit: 6;
					--noise-channel-limit: 3;
				}

				* {
					cursor: url("theme_resources/wackybox_cursor.png"), auto !important;
				}

			`,
        "microbox": `
				:root {
					--page-margin: #000000;
					--editor-background: #000000;
					--playhead: rgba(255, 255, 255, 0.9);
					--secondary-text: #93B6AD;
					--text-selection: rgba(47,255,250,0.99);
					--box-selection-fill: #03B068;
					--loop-accent: #FF0061;
					--link-accent: #FFC800;
					--ui-widget-background: #38554E;
					--ui-widget-focus: #2A7E69;
					--pitch-background: #281F23;
					--tonic: #004634;
					--fifth-note: #463400;
					--white-piano-key: #edc;
					--black-piano-key: #456;
					--use-color-formula: true;
					--track-editor-bg-pitch: #333333;
					--track-editor-bg-pitch-dim: #000000;
					--track-editor-bg-noise: #463400;
					--track-editor-bg-noise-dim: #000000;
					--track-editor-bg-mod: #004634;
					--track-editor-bg-mod-dim: #000000;
					--multiplicative-mod-slider: #FFC800;
					--overwriting-mod-slider: #00ffc0;
					--indicator-primary: #00ffc0;
					--indicator-secondary: #333333;
					--select2-opt-group: #2B2B2B;
					--input-box-outline: #69BFC6;
					--mute-button-normal: #00ffc0;
					--mute-button-mod: #FFC800;
					--mod-label-primary: #38554E;
					--mod-label-secondary-text: rgb(0, 43, 45);
					--mod-label-primary-text: white;
					--pitch-secondary-channel-hue: 0;
					--pitch-secondary-channel-hue-scale: 6.1;
					--pitch-secondary-channel-sat: 83.3;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 40;
					--pitch-secondary-channel-lum-scale: 0.05;
					--pitch-primary-channel-hue: 0;
					--pitch-primary-channel-hue-scale: 6.1;
					--pitch-primary-channel-sat: 100;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 67.5;
					--pitch-primary-channel-lum-scale: 0.05;
					--pitch-secondary-note-hue: 0;
					--pitch-secondary-note-hue-scale: 6.1;
					--pitch-secondary-note-sat: 93.9;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 25;
					--pitch-secondary-note-lum-scale: 0.05;
					--pitch-primary-note-hue: 0;
					--pitch-primary-note-hue-scale: 6.1;
					--pitch-primary-note-sat: 100;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 85.6;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 0;
					--noise-secondary-channel-hue-scale: 2;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 42;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 0;
					--noise-primary-channel-hue-scale: 2;
					--noise-primary-channel-sat: 33;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 63.5;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 0;
					--noise-secondary-note-hue-scale: 2;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 55;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 0;
					--noise-primary-note-hue-scale: 2;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 74;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 192;
					--mod-secondary-channel-hue-scale: 1.5;
					--mod-secondary-channel-sat: 88;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 192;
					--mod-primary-channel-hue-scale: 1.5;
					--mod-primary-channel-sat: 96;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 192;
					--mod-secondary-note-hue-scale: 1.5;
					--mod-secondary-note-sat: 92;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 45;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 192;
					--mod-primary-note-hue-scale: 1.5;
					--mod-primary-note-sat: 96;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 85;
					--mod-primary-note-lum-scale: 0;
				}
			`,
        "paandorasbox": `
			:root {
			 --page-margin: #200000;
			  --editor-background: #200000;
			  --text-selection: #FF5100;
			  --loop-accent: #FF5100;
			  --link-accent: #0F0;
			  --ui-widget-background: #562334;
			  --ui-widget-focus: #6D1B36;
			  --pitch-background: #6D1B36;
			  --tonic: #FF5100;
			  --fifth-note: #00B6FF;
			  --track-editor-bg-pitch: #380C14;
			  --track-editor-bg-pitch-dim: #200000;
			  --track-editor-bg-noise: #233323;
			  --track-editor-bg-noise-dim: #101A0F;
			  --track-editor-bg-mod: #234C82;
			  --track-editor-bg-mod-dim: #0D1D33;
			  --indicator-primary: #FF5100;
			  --pitch1-secondary-channel: #00B200;
			  --pitch1-primary-channel: #0F0;
			  --pitch1-secondary-note: #00B200;
			  --pitch1-primary-note: #0F0;
			  --pitch2-secondary-channel: #00B282;
			  --pitch2-primary-channel: #00FFBF;
			  --pitch2-secondary-note: #00B282;
			  --pitch2-primary-note: #00FFBF;
			  --pitch3-secondary-channel: #00B2B2;
			  --pitch3-primary-channel: #0FF;
			  --pitch3-secondary-note: #00B2B2;
			  --pitch3-primary-note: #0FF;
			  --pitch4-secondary-channel: #2623B2;
			  --pitch4-primary-channel: #3631FF;
			  --pitch4-secondary-note: #2623B2;
			  --pitch4-primary-note: #3631FF;
			  --pitch5-secondary-channel: #7700B2;
			  --pitch5-primary-channel: #A0F;
			  --pitch5-secondary-note: #7700B2;
			  --pitch5-primary-note: #A0F;
			  --pitch6-secondary-channel: #B200B2;
			  --pitch6-primary-channel: #F0F;
			  --pitch6-secondary-note: #B200B2;
			  --pitch6-primary-note: #F0F;
			  --pitch7-secondary-channel: #B20000;
			  --pitch7-primary-channel: #F00;
			  --pitch7-secondary-note: #B20000;
			  --pitch7-primary-note: #F00;
			  --pitch8-secondary-channel: #00B200;
			  --pitch8-primary-channel: #0F0;
			  --pitch8-secondary-note: #00B200;
			  --pitch8-primary-note: #0F0;
			  --pitch9-secondary-channel: #00B282;
			  --pitch9-primary-channel: #0FF;
			  --pitch9-secondary-note: #00B282;
			  --pitch9-primary-note: #0FF;
			  --pitch10-secondary-channel: #0071B2;
			  --pitch10-primary-channel: #009EFF;
			  --pitch10-secondary-note: #0071B2;
			  --pitch10-primary-note: #009EFF;
			  --noise1-secondary-channel: #32B221;
			  --noise1-primary-channel: #44FF2F;
			  --noise1-secondary-note: #32B221;
			  --noise1-primary-note: #44FF2F;
			  --noise2-secondary-channel: #216FB2;
			  --noise2-primary-channel: #2F9DFF;
			  --noise2-secondary-note: #216FB2;
			  --noise2-primary-note: #2F9DFF;
			  --noise3-secondary-channel: #2623B2;
			  --noise3-primary-channel: #3631FF;
			  --noise3-secondary-note: #2623B2;
			  --noise3-primary-note: #3631FF;
			  --noise4-secondary-channel: #7223B2;
			  --noise4-primary-channel: #A531FF;
			  --noise4-secondary-note: #7223B2;
			  --noise4-primary-note: #A531FF;
			  --noise5-secondary-channel: #B2235A;
			  --noise5-primary-channel: #FF317E;
			  --noise5-secondary-note: #B2235A;
			  --noise5-primary-note: #FF317E;
			  --mod1-secondary-channel: #17B274;
			  --mod1-primary-channel: #21FFA8;
			  --mod1-secondary-note: #17B274;
			  --mod1-primary-note: #21FFA8;
			  --mod2-secondary-channel: #1783B2;
			  --mod2-primary-channel: #1FBAFF;
			  --mod2-secondary-note: #1783B2;
			  --mod2-primary-note: #1FBAFF;
			  --mod4-secondary-channel: #B20E6B;
			  --mod4-primary-channel: #FF1291;
			  --mod4-secondary-note: #B20E6B;
			  --mod4-primary-note: #FF1291;
			  --mod-label-primary: #994038;
			  --mod-label-secondary-text: #331512;
			  --mod-label-primary-text: #331512;
			  --disabled-note-primary: #994038;
			  --disabled-note-secondary: #331512;
			}
			`,
        "midbox": `:root {
			--page-margin: #010a1e;
			--editor-background: #010a1e;
			--hover-preview: #dfe9fe;
			--playhead: #e7f5f6;
			--primary-text: #f0fdff;
			--secondary-text: #c4c7d7;
			--inverted-text: #0f0623;
			--text-selection: #3f0ab4;
			--box-selection-fill: #32afb3;
			--loop-accent: #1719ff;
			--link-accent: #83a6ed;
			--ui-widget-background: #222856;
			--ui-widget-focus: #21417c;
			--pitch-background: #10264a;
			--tonic: #0797ce;
			--fifth-note: #3e2fb5;
			--white-piano-key: #ebf3f4;
			--black-piano-key: #253353;
			--white-piano-key-text: black;
			--black-piano-key-text: white;
			--oscilloscope-line-L: #72dcfc;
			--oscilloscope-line-R: #304eff;
			--mod-title: #1b2fff;
			--use-color-formula: true;
			--track-editor-bg-pitch: #183b65; 
			--track-editor-bg-pitch-dim: #1f2c3d;
			--track-editor-bg-noise: #2e196d;
			--track-editor-bg-noise-dim: #212038;
			--track-editor-bg-mod: #066433;
			--track-editor-bg-mod-dim: #152b1f;
			--multiplicative-mod-slider: #1242a4;
			--overwriting-mod-slider: #2218db;
			--indicator-primary: #1698d3;
			--indicator-secondary: #1b478e;
			--select2-opt-group: #312f6d;
			--input-box-outline: #788b96;
			--mute-button-normal: #1d34f2;
			--mute-button-mod: #06bad6;
			--mod-label-primary: #14383f;
			--mod-label-secondary-text: #1d7080;
			--mod-label-primary-text: #b7e9f2;
			--pitch-secondary-channel-hue: 190;
			--pitch-secondary-channel-hue-scale: 2.5;
			--pitch-secondary-channel-sat: 80;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 50;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: 190;
			--pitch-primary-channel-hue-scale: 2.5;
			--pitch-primary-channel-sat: 100;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 76.5;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: 190;
			--pitch-secondary-note-hue-scale: 2.5;
			--pitch-secondary-note-sat: 90;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 30;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: 190;
			--pitch-primary-note-hue-scale: 2.5;
			--pitch-primary-note-sat: 100;
			--pitch-primary-note-sat-scale: 0.05;
			--pitch-primary-note-lum: 85;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 200;
			--noise-secondary-channel-hue-scale: 2.5;
			--noise-secondary-channel-sat: 25;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 42;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 200;
			--noise-primary-channel-hue-scale: 2.5;
			--noise-primary-channel-sat: 33;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 63.5;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 200;
			--noise-secondary-note-hue-scale: 2.5;
			--noise-secondary-note-sat: 33.5;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 55;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 200;
			--noise-primary-note-hue-scale: 2.5;
			--noise-primary-note-sat: 46.5;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 74;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 140;
			--mod-secondary-channel-hue-scale: 1.5;
			--mod-secondary-channel-sat: 90;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 55;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 140;
			--mod-primary-channel-hue-scale: 1.5;
			--mod-primary-channel-sat: 100;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 85;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 140;
			--mod-secondary-note-hue-scale: 1.5;
			--mod-secondary-note-sat: 95;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 50;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 140;
			--mod-primary-note-hue-scale: 1.5;
			--mod-primary-note-sat: 100;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 90;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary:    #53527b;
			--disabled-note-secondary:  #1c1b30;
		}
		`,
  "dogebox2": `
			:root {
				--page-margin: #000015;
				--editor-background: #000015;
				--hover-preview: #00ffff;
				--playhead: #00ffff;
				--text-selection: rgba(255, 127, 80, 0.99);
				--box-selection-fill: rgba(255, 255, 255, 0.2);
				--loop-accent: #ff00ff;
				--link-accent: #00ffff;
				--ui-widget-background: #222222;
				--ui-widget-focus: #444444;
				--pitch-background: #222222;
				--tonic: #ab382c;
				--fifth-note: #2a76a8;
				--white-piano-key: #ffffff;
				--black-piano-key: #222222;
				--white-piano-key-text: #000000;
				--track-editor-bg-pitch: #222222;
				--track-editor-bg-pitch-dim: #111111;
				--track-editor-bg-noise: #222222;
				--track-editor-bg-noise-dim: #111111;
				--track-editor-bg-mod: #333333;
				--track-editor-bg-mod-dim: #111111;
				--multiplicative-mod-slider: #666666;
				--overwriting-mod-slider: #666666;
				--indicator-primary: #ff00ff;
				--indicator-secondary: #00ffff;
				--select2-opt-group: #333333;
				--input-box-outline: #444444;
				--mute-button-normal: #ff00ff;
				--mute-button-mod: #00ffff;
				--mod-label-primary: #282840;
				--mod-label-secondary-text: rgb(87, 86, 120);
				--mod-label-primary-text: white;
				--pitch1-secondary-channel: #bd9909;
				--pitch1-primary-channel: #fbff8e;
				--pitch1-secondary-note: #c79d3a;
				--pitch1-primary-note: #fdffb2;
				--pitch2-secondary-channel: #b86e0d;
				--pitch2-primary-channel: #ffb28e;
				--pitch2-secondary-note: #ba643a;
				--pitch2-primary-note: #fbac92;
				--pitch3-secondary-channel: #a81b08;
				--pitch3-primary-channel: #f56c67;
				--pitch3-secondary-note: #94352b;
				--pitch3-primary-note: #f56147;
				--pitch4-secondary-channel: #2a7722;
				--pitch4-primary-channel: #6ebf5e;
				--pitch4-secondary-note: #1c5c18;
				--pitch4-primary-note: #88cf82;
				--pitch5-secondary-channel: #8c8b3c;
				--pitch5-primary-channel: #c3c168;
				--pitch5-secondary-note: #747330;
				--pitch5-primary-note: #d4d394;
				--pitch6-secondary-channel: #3f9577;
				--pitch6-primary-channel: #6fc4b4;
				--pitch6-secondary-note: #2c6a5c;
				--pitch6-primary-note: #8fdad0;
				--pitch7-secondary-channel: #204a80;
				--pitch7-primary-channel: #6d9fc2;
				--pitch7-secondary-note: #132f5a;
				--pitch7-primary-note: #9dbed8;
				--pitch8-secondary-channel: #a531ad;
				--pitch8-primary-channel: #db68e3;
				--pitch8-secondary-note: #8d2f94;
				--pitch8-primary-note: #e66cbf;
				--pitch9-secondary-channel: #03a1a1;
				--pitch9-primary-channel: #52fffb;
				--pitch9-secondary-note: #34baba;
				--pitch9-primary-note: #60fbfb;
				--pitch10-secondary-channel: #4208a1;
				--pitch10-primary-channel: #9282ff;
				--pitch10-secondary-note: #5735b5;
				--pitch10-primary-note: #ab52fb;
				--noise1-secondary-channel: #2a5555;
				--noise1-primary-channel: #4c7878;
				--noise1-secondary-note: #6e9a9a;
				--noise1-primary-note: #90bcbc;
				--noise2-secondary-channel: #553355;
				--noise2-primary-channel: #775577;
				--noise2-secondary-note: #997799;
				--noise2-primary-note: #bbaa99;
				--noise3-secondary-channel: #2a6622;
				--noise3-primary-channel: #4c8844;
				--noise3-secondary-note: #6eaa66;
				--noise3-primary-note: #90cc88;
				--noise4-secondary-channel: #664400;
				--noise4-primary-channel: #886600;
				--noise4-secondary-note: #aa8800;
				--noise4-primary-note: #cccc00;
				--noise5-secondary-channel: #006633;
				--noise5-primary-channel: #008855;
				--noise5-secondary-note: #00aa77;
				--noise5-primary-note: #00cc99;
				--mod1-secondary-channel: #fe00ff;
				--mod1-primary-channel: #ff72ff;
				--mod1-secondary-note: #ff92ff;
				--mod1-primary-note: #ffb2fb;
				--mod2-secondary-channel: #00fe00;
				--mod2-primary-channel: #8eff8e;
				--mod2-secondary-note: #92ff92;
				--mod2-primary-note: #b2ffb2;
				--mod3-secondary-channel: #feff00;
				--mod3-primary-channel: #fffb8e;
				--mod3-secondary-note: #fffd92;
				--mod3-primary-note: #fffe92;
				--mod4-secondary-channel: #00fffe;
				--mod4-primary-channel: #82fffb;
				--mod4-secondary-note: #92ffff;
				--mod4-primary-note: #b2fffb;
				--disabled-note-primary: #c6c6c6;
				--disabled-note-secondary: #8c8c8c;
				--note-flash: #ffffff;
				--note-flash-secondary: #ffffff77;
				}`,
        "abyssbox classic": `
				:root {		
				--page-margin: #1e0915; 		
				--editor-background: #1e0915; 		
				--playhead: rgba(255, 255, 255, 0.9); 		
				--secondary-text: #ffcedd; 		
				--box-selection-fill: #1e0915; 		
				--loop-accent: #873a51; 		
				--link-accent: #df88ff; 		
				--ui-widget-background: #581b3e; 		
				--ui-widget-focus: #762b4c; 		
				--pitch-background: #381d24; 		
				--tonic: #873a51; 		
				--fifth-note: #75001e; 		
				--white-piano-key: #cca5c7; 		
				--black-piano-key: #402f2f;
				--use-color-formula: true; 		
				--track-editor-bg-pitch: #571c40; 		
				--track-editor-bg-pitch-dim: #290d0d; 		
				--track-editor-bg-noise: #571131; 		
				--track-editor-bg-noise-dim: #330a28; 		
				--track-editor-bg-mod: #54083c; 		
				--track-editor-bg-mod-dim: #360426; 		
				--multiplicative-mod-slider: #9f6082; 		
				--overwriting-mod-slider: #9e3470; 		
				--indicator-primary: #b3498f; 		
				--indicator-secondary: #541d40; 		
				--select2-opt-group: #4f191e; 		
				--input-box-outline: #18041a; 		
				--mute-button-normal: #dd5d94;	 		
				--mute-button-mod: #ba364c; 		
				--mod-label-primary: #541625; 		
				--mod-label-secondary-text: rgb(120, 87, 86); 
				--mod-label-primary-text: gray; 
			
				--pitch-secondary-channel-hue: -80; 		
				--pitch-secondary-channel-hue-scale 0; 		
				--pitch-secondary-channel-sat: 43; 		
				--pitch-secondary-channel-sat-scale: 0.1; 		
				--pitch-secondary-channel-lum: 40; 		
				--pitch-secondary-channel-lum-scale: 0.05; 
			
				--pitch-primary-channel-hue: -53; 		
				--pitch-primary-channel-hue-scale: 6.1; 		
				--pitch-primary-channel-sat: 75; 		
				--pitch-primary-channel-sat-scale: 0.1; 		
				--pitch-primary-channel-lum: 67.5; 		
				--pitch-primary-channel-lum-scale: 0.05; 	
		
				--pitch-secondary-note-hue: -34; 		
				--pitch-secondary-note-hue-scale: 6.1; 		
				--pitch-secondary-note-sat: 93.9; 		
				--pitch-secondary-note-sat-scale: 0.1; 		
				--pitch-secondary-note-lum: 25; 		
				--pitch-secondary-note-lum-scale: 0.05; 
			
				--pitch-primary-note-hue: -53; 		
				--pitch-primary-note-hue-scale: 6.1; 		
				--pitch-primary-note-sat: 100; 		
				--pitch-primary-note-sat-scale: 0.05; 		
				--pitch-primary-note-lum: 85.6; 		
				--pitch-primary-note-lum-scale: 0.025; 
			
				--noise-secondary-channel-hue: 0; 		
				--noise-secondary-channel-hue-scale: 2; 		
				--noise-secondary-channel-sat: 65; 		
				--noise-secondary-channel-sat-scale: 0; 		
				--noise-secondary-channel-lum: 42; 		
				--noise-secondary-channel-lum-scale: 0; 
			
				--noise-primary-channel-hue: 0; 		
				--noise-primary-channel-hue-scale: 1; 		
				--noise-primary-channel-sat: 100; 		
				--noise-primary-channel-sat-scale: 1; 		
				--noise-primary-channel-lum: 63.5; 		
				--noise-primary-channel-lum-scale: 0; 
			
				--noise-secondary-note-hue: 24; 		
				--noise-secondary-note-hue-scale: 2; 		
				--noise-secondary-note-sat: 100; 		
				--noise-secondary-note-sat-scale: 0; 		
				--noise-secondary-note-lum: 35; 		
				--noise-secondary-note-lum-scale: 0; 	
		
				--noise-primary-note-hue: 24; 		
				--noise-primary-note-hue-scale: 2; 		
				--noise-primary-note-sat: 100; 		
				--noise-primary-note-sat-scale: 1; 		
				--noise-primary-note-lum: 60; 		
				--noise-primary-note-lum-scale: 1; 	
		
				--mod-secondary-channel-hue: 55; 		
				--mod-secondary-channel-hue-scale: 1.5; 		
				--mod-secondary-channel-sat: 100; 		
				--mod-secondary-channel-sat-scale: 0; 		
				--mod-secondary-channel-lum: 20; 		
				--mod-secondary-channel-lum-scale: 0; 
			
				--mod-primary-channel-hue: 55; 		
				--mod-primary-channel-hue-scale: 1.5; 		
				--mod-primary-channel-sat: 96; 		
				--mod-primary-channel-sat-scale: 0; 		
				--mod-primary-channel-lum: 50; 		
				--mod-primary-channel-lum-scale: 0; 
			
				--mod-secondary-note-hue: 55; 		
				--mod-secondary-note-hue-scale: 1.5; 		
				--mod-secondary-note-sat: 92; 		
				--mod-secondary-note-sat-scale: 0; 		
				--mod-secondary-note-lum: 45; 		
				--mod-secondary-note-lum-scale: 0; 
			
				--mod-primary-note-hue: 55; 		
				--mod-primary-note-hue-scale: 1.5; 		
				--mod-primary-note-sat: 96; 		
				--mod-primary-note-sat-scale: 0; 		
				--mod-primary-note-lum: 85; 		
				--mod-primary-note-lum-scale: 0; 	
	
				--note-flash: #ffffff;
				--note-flash-secondary: #ffffff77;
				
				--oscilloscope-line-R: var(--ui-widget-background);
				--oscilloscope-line-L: var(--secondary-text);
				--text-spacing-icon: > ;
				--scrollbar-color: #bf2c5d;
				
				--file-page-symbol: url("theme_resources/icon-file.png");
				--edit-pencil-symbol: url("theme_resources/icon-edit.png");
				--preferences-gear-symbol: url("theme_resources/icon-preferences.png");
				--instrument-copy-symbol: url("theme_resources/icon-copy.png");
				--instrument-paste-symbol: url("theme_resources/icon-paste.png");
				--play-symbol: url("theme_resources/icon-play.png");
				--pause-symbol: url("theme_resources/icon-pause.png");
				--record-symbol: url("theme_resources/icon-record.png");
				--stop-symbol: url("theme_resources/icon-stop.png");
				--prev-bar-symbol: url("theme_resources/icon-prev.png");
				--next-bar-symbol: url("theme_resources/icon-next.png");
				--muted-symbol: url("theme_resources/icon-speakerMuted.png");
				--unmuted-symbol: url("theme_resources/icon-speaker.png");
				--volume-symbol: url("theme_resources/icon-speaker.png");
				--zoom-in-symbol: url("theme_resources/icon-zoomIn.png");
				--zoom-out-symbol: url("theme_resources/icon-zoomOut.png");
				--export-symbol: url("theme_resources/icon-export.png");
					}
			* {
			cursor: url("theme_resources/abyssbox_cursor.png"), auto;
			}
			
				@font-face {
			   font-family: "AbyssType";
			   src:
				url("theme_resources/abysstype.otf") format("opentype") tech(color-COLRv1),
				}
	
				/* sets background image */
				body {
				background-image: url("theme_resources/stripesbg.gif") !important;
				background-position: center;
				background-repeat: repeat;
	
				image-rendering: -moz-crisp-edges !important;         /* Firefox */
				image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
				image-rendering: -o-crisp-edges !important;            /* Opera */
				image-rendering: pixelated !important;                 /* Future browsers */
				image-rendering: optimizeSpeed !important;             /* IE */
					}
	
				#text-content {
						border-image-source: url("theme_resources/abyssbox_border.png");
						border-image-slice: 4 fill; 
					   border-image-width: 8px; 
					border-image-repeat: stretch; 
						padding: 12px; 
	
						image-rendering: -moz-crisp-edges !important;         /* Firefox */
						image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
						image-rendering: -o-crisp-edges !important;            /* Opera */
						image-rendering: pixelated !important;                 /* Future browsers */
						image-rendering: optimizeSpeed !important;             /* IE */
					}
				#beepboxEditorContainer {
						border-image-source: url("theme_resources/abyssbox_border.png");
						border-image-slice: 4 fill; 
					   	border-image-width: 8px; 
						border-image-repeat: stretch;
						padding: 12px;
	     user-select:none;
						image-rendering: -moz-crisp-edges !important;         /* Firefox */
						image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
						image-rendering: -o-crisp-edges !important;            /* Opera */
						image-rendering: pixelated !important;                 /* Future browsers */
						image-rendering: optimizeSpeed !important;             /* IE */ 
					}
				.beepboxEditor button,
				button.playButton,
				button.pauseButton, 
				button.recordButton, 
				button.stopButton,
				button.nextBarButton, 
				button.prevBarButton, 
				button.copyButton, 
				button.pasteButton, 
				button.exportInstrumentButton, 
				button.importInstrumentButton, 
				.beepboxEditor select, 
				.beepboxEditor .select2-selection__rendered {
						border-image-source: url("theme_resources/abyssbox_border.png") !important;
						border-image-slice: 4 fill !important; 
					   border-image-width: 4px !important; 
					border-image-repeat: stretch !important;
						padding: 4px !important; 
	
						image-rendering: -moz-crisp-edges !important;         /* Firefox */
						image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
						image-rendering: -o-crisp-edges !important;            /* Opera */
						image-rendering: pixelated !important;                 /* Future browsers */
						image-rendering: optimizeSpeed !important;             /* IE */
	
						cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
					}
	
				div.selectRow button:not(.copyButton,.pasteButton,.exportInstrumentButton,.importInstrumentButton) {
					--ui-widget-background: #1e0915 !important;
					border-image-source:none !important;
				}
	
					select.trackSelectBox {
						border-image: none !important;
					}
					
				@font-face {
			   font-family: "AbyssType_small";
			   src:
				url("theme_resources/abysstype_small.otf") format("opentype") tech(color-COLRv1),
				}
	
				html {
					font-family: 'AbyssType';
				}
	
				div.channelBoxLabel {
					font-family: 'AbyssType_small' !important;
				}
	
				.beepboxEditor input[type="range"]::-webkit-slider-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-ms-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-moz-range-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="text"],
				.beepboxEditor input[type="number"]
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
	
				div.selectRow span {
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
	
				`,
        "abyssbox light": `
			:root { 		
				--page-margin: #e0adbc; 		
				--editor-background: #e0adbc; 		
				--playhead: rgba(255, 255, 255, 0.9); 		
				--primary-text: #6110d9; 		
				--secondary-text: #cc1338;	
				--inverted-text:  #e8bcc9;	 		
				--box-selection-fill: #bf2c5d; 		
				--loop-accent: #8c346a; 		
				--link-accent: #8c346a; 		
				--ui-widget-background: #f5e9f0;		
				--ui-widget-focus: #f5e9f0; 		
				--pitch-background: #eddadf; 		
				--tonic: #f5f0f1; 		
				--fifth-note: #ffb5c9; 		
				--white-piano-key: #cca5c7; 		
				--black-piano-key: #402f2f;
				--use-color-formula: true; 		
				--track-editor-bg-pitch: #edbecc; 		
				--track-editor-bg-pitch-dim: #e0adbc; 		
				--track-editor-bg-noise: #edbecc; 		
				--track-editor-bg-noise-dim: #e0adbc; 		
				--track-editor-bg-mod: #edbecc; 		
				--track-editor-bg-mod-dim: #e0adbc; 		
				--multiplicative-mod-slider: #9f6082; 		
				--overwriting-mod-slider: #9e3470; 		
				--indicator-primary: #b3498f; 		
				--indicator-secondary: #541d40; 		
				--select2-opt-group: #4f191e; 		
				--input-box-outline: #18041a; 		
				--mute-button-normal: #dd5d94;	 		
				--mute-button-mod: #ba364c; 		
				--mod-label-primary: #541625; 		
				--mod-label-secondary-text: rgb(120, 87, 86); 
				--mod-label-primary-text: gray;
				--mod-title: #cc1338; 
			
				--pitch-secondary-channel-hue: -80; 		
				--pitch-secondary-channel-hue-scale 0; 		
				--pitch-secondary-channel-sat: 255; 		
				--pitch-secondary-channel-sat-scale: 0.1; 		
				--pitch-secondary-channel-lum: 30; 		
				--pitch-secondary-channel-lum-scale: 0.05; 
			
				--pitch-primary-channel-hue: -53; 		
				--pitch-primary-channel-hue-scale: 6.1; 		
				--pitch-primary-channel-sat: 255; 		
				--pitch-primary-channel-sat-scale: 0.1; 		
				--pitch-primary-channel-lum: 60; 		
				--pitch-primary-channel-lum-scale: 0.05; 	
		
				--pitch-secondary-note-hue: -34; 		
				--pitch-secondary-note-hue-scale: 6.1; 		
				--pitch-secondary-note-sat: 255; 		
				--pitch-secondary-note-sat-scale: 0.1; 		
				--pitch-secondary-note-lum: 30; 		
				--pitch-secondary-note-lum-scale: 0.05; 
			
				--pitch-primary-note-hue: -53; 		
				--pitch-primary-note-hue-scale: 6.1; 		
				--pitch-primary-note-sat: 255; 		
				--pitch-primary-note-sat-scale: 0.05; 		
				--pitch-primary-note-lum: 60; 		
				--pitch-primary-note-lum-scale: 0.025; 
			
				--noise-secondary-channel-hue: 0; 		
				--noise-secondary-channel-hue-scale: 2; 		
				--noise-secondary-channel-sat: 255; 		
				--noise-secondary-channel-sat-scale: 0; 		
				--noise-secondary-channel-lum: 30; 		
				--noise-secondary-channel-lum-scale: 0; 
			
				--noise-primary-channel-hue: 0; 		
				--noise-primary-channel-hue-scale: 1; 		
				--noise-primary-channel-sat: 255; 		
				--noise-primary-channel-sat-scale: 1; 		
				--noise-primary-channel-lum: 60; 		
				--noise-primary-channel-lum-scale: 0; 
			
				--noise-secondary-note-hue: 24; 		
				--noise-secondary-note-hue-scale: 2; 		
				--noise-secondary-note-sat: 255; 		
				--noise-secondary-note-sat-scale: 0; 		
				--noise-secondary-note-lum: 30; 		
				--noise-secondary-note-lum-scale: 0; 	
		
				--noise-primary-note-hue: 24; 		
				--noise-primary-note-hue-scale: 2; 		
				--noise-primary-note-sat: 255; 		
				--noise-primary-note-sat-scale: 1; 		
				--noise-primary-note-lum: 60; 		
				--noise-primary-note-lum-scale: 1; 	
		
				--mod-secondary-channel-hue: 55; 		
				--mod-secondary-channel-hue-scale: 1.5; 		
				--mod-secondary-channel-sat: 255; 		
				--mod-secondary-channel-sat-scale: 0; 		
				--mod-secondary-channel-lum: 30; 		
				--mod-secondary-channel-lum-scale: 0; 
			
				--mod-primary-channel-hue: 55; 		
				--mod-primary-channel-hue-scale: 1.5; 		
				--mod-primary-channel-sat: 255; 		
				--mod-primary-channel-sat-scale: 0; 		
				--mod-primary-channel-lum: 60; 		
				--mod-primary-channel-lum-scale: 0; 
			
				--mod-secondary-note-hue: 55; 		
				--mod-secondary-note-hue-scale: 1.5; 		
				--mod-secondary-note-sat: 255; 		
				--mod-secondary-note-sat-scale: 0; 		
				--mod-secondary-note-lum: 30; 		
				--mod-secondary-note-lum-scale: 0; 
			
				--mod-primary-note-hue: 55; 		
				--mod-primary-note-hue-scale: 1.5; 		
				--mod-primary-note-sat: 255; 		
				--mod-primary-note-sat-scale: 0; 		
				--mod-primary-note-lum: 60; 		
				--mod-primary-note-lum-scale: 0; 

				--note-flash: #ffffff;
				--note-flash-secondary: #ffffff77;

				--oscilloscope-line-R: var(--ui-widget-background);
				--oscilloscope-line-L: var(--secondary-text);
				--text-spacing-icon: > ;
				--scrollbar-color: #bf2c5d;

				--file-page-symbol: url("theme_resources/icon-file.png");
				--edit-pencil-symbol: url("theme_resources/icon-edit.png");
				--preferences-gear-symbol: url("theme_resources/icon-preferences.png");
				--instrument-copy-symbol: url("theme_resources/icon-copy.png");
				--instrument-paste-symbol: url("theme_resources/icon-paste.png");
				--play-symbol: url("theme_resources/icon-play.png");
				--pause-symbol: url("theme_resources/icon-pause.png");
				--record-symbol: url("theme_resources/icon-record.png");
				--stop-symbol: url("theme_resources/icon-stop.png");
				--prev-bar-symbol: url("theme_resources/icon-prev.png");
				--next-bar-symbol: url("theme_resources/icon-next.png");
				--muted-symbol: url("theme_resources/icon-speakerMuted.png");
				--unmuted-symbol: url("theme_resources/icon-speaker.png");
				--volume-symbol: url("theme_resources/icon-speaker.png");
				--zoom-in-symbol: url("theme_resources/icon-zoomIn.png");
				--zoom-out-symbol: url("theme_resources/icon-zoomOut.png");
				--export-symbol: url("theme_resources/icon-export.png");
			}
					/* sets background image */
					body {
					background-image: url("theme_resources/stripesbg_light.gif") !important;
					background-position: center;
					background-repeat: repeat;
		
					image-rendering: -moz-crisp-edges !important;         /* Firefox */
					image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
					image-rendering: -o-crisp-edges !important;            /* Opera */
					image-rendering: pixelated !important;                 /* Future browsers */
					image-rendering: optimizeSpeed !important;             /* IE */
						}		
				#text-content {
						border-image-source: url("theme_resources/abyssbox_border_light.png");
						border-image-slice: 4 fill; 
					   border-image-width: 8px; 
					border-image-repeat: stretch; 
						padding: 12px; 
	
						image-rendering: -moz-crisp-edges !important;         /* Firefox */
						image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
						image-rendering: -o-crisp-edges !important;            /* Opera */
						image-rendering: pixelated !important;                 /* Future browsers */
						image-rendering: optimizeSpeed !important;             /* IE */
					}
				#beepboxEditorContainer {
						border-image-source: url("theme_resources/abyssbox_border_light.png");
						border-image-slice: 4 fill; 
					   border-image-width: 8px; 
					border-image-repeat: stretch;
						padding: 12px;
	
						image-rendering: -moz-crisp-edges !important;         /* Firefox */
						image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
						image-rendering: -o-crisp-edges !important;            /* Opera */
						image-rendering: pixelated !important;                 /* Future browsers */
						image-rendering: optimizeSpeed !important;             /* IE */ 
					}
					.beepboxEditor button,
					button.playButton,
					button.pauseButton, 
					button.recordButton, 
					button.stopButton,
					button.nextBarButton, 
					button.prevBarButton, 
					button.copyButton, 
					button.pasteButton, 
					button.exportInstrumentButton, 
					button.importInstrumentButton, 
					.beepboxEditor select, 
					.beepboxEditor .select2-selection__rendered {
							border-image-source: url("theme_resources/abyssbox_border_light.png") !important;
							border-image-slice: 4 fill !important; 
						   border-image-width: 4px !important; 
						border-image-repeat: stretch !important;
							padding: 4px !important; 
		
							image-rendering: -moz-crisp-edges !important;         /* Firefox */
							image-rendering: -webkit-optimize-contrast !important; /* Webkit (Chrome/Safari) */
							image-rendering: -o-crisp-edges !important;            /* Opera */
							image-rendering: pixelated !important;                 /* Future browsers */
							image-rendering: optimizeSpeed !important;             /* IE */
		
							cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
						}
		
					div.selectRow button:not(.copyButton,.pasteButton,.exportInstrumentButton,.importInstrumentButton) {
						--ui-widget-background: var(--editor-background) !important;
						border-image-source:none !important;
					}
	
					select.trackSelectBox {
						border-image: none !important;
					}
	
			/* sets cursor */ 
			* {
			cursor: url("theme_resources/abyssbox_cursor.png"), auto !important;
			}
				@font-face {
			   font-family: "AbyssType";
			   src:
				url("theme_resources/abysstype.otf") format("opentype") tech(color-COLRv1),
				}
	
				@font-face {
			   font-family: "AbyssType_small";
			   src:
				url("theme_resources/abysstype_small.otf") format("opentype") tech(color-COLRv1),
				}
	
				html {
				font-family: 'AbyssType';
				}
				div.channelBoxLabel {
					font-family: 'AbyssType_small' !important;
				}
	
				.beepboxEditor input[type="range"]::-webkit-slider-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-webkit-slider-runnable-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-webkit-slider-runnable-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-ms-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-ms-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-thumb
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]::-moz-range-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="range"]:focus::-moz-range-track
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="text"],
				.beepboxEditor input[type="number"]
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
				 
				.beepboxEditor input[type="checkbox"]:checked:after
				{
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
	
				div.selectRow span {
					cursor: url("theme_resources/abyssbox_cursor_hand.png"), pointer !important;
				}
	
				`,
        "slarmoosbox": `
		:root {
			--page-margin: #14051a;
			--editor-background: #14051a;
			--playhead: rgba(255, 255, 255, 0.9);
			--primary-text: #71eee5;
			--secondary-text: #3abbb2;
			--inverted-text: #13695e;
			--box-selection-fill: #36c71c;
			--loop-accent: #36c71c;
			--link-accent: white;
			--ui-widget-background: #183d05;
			--ui-widget-focus: #247d0d;
			--pitch-background: #2e0e51;
			--tonic: #247d0d;
			--fifth-note: #3abbb2;
			--white-piano-key: #ffffff;
			--black-piano-key: #061705;
			--white-piano-key-text: #061705;
			--use-color-formula: true;
			--track-editor-bg-pitch: #09382b;
			--track-editor-bg-pitch-dim: #14051a;
			--track-editor-bg-noise: #40400b;
			--track-editor-bg-noise-dim: #14051a;
			--track-editor-bg-mod: #0a2c08;
			--track-editor-bg-mod-dim: #14051a;
			--multiplicative-mod-slider: #3abb22;
			--overwriting-mod-slider: #71eee5;
			--indicator-primary: #a773e5;
			--indicator-secondary: #4c1c89;
			--select2-opt-group: #183d05;
			--input-box-outline: #18040a;
			--mute-button-normal: #36c71c;
			--mute-button-mod: #a773e5;
			--mod-label-primary: #a773e5;
			--mod-label-secondary-text: #6b29bf;
			--mod-label-primary-text: #14051a;
			--mod-title: #247d1d;
			--pitch-secondary-channel-hue: 100;
			--pitch-secondary-channel-hue-scale: 6.1;
			--pitch-secondary-channel-sat: 100.0;
			--pitch-secondary-channel-sat-scale: 0.15;
			--pitch-secondary-channel-lum: 60.0;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: 100;
			--pitch-primary-channel-hue-scale: 6.1;
			--pitch-primary-channel-sat: 100;
			--pitch-primary-channel-sat-scale: 0.15;
			--pitch-primary-channel-lum: 75.0;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: 100;
			--pitch-secondary-note-hue-scale: 6.1;
			--pitch-secondary-note-sat: 95.0;
			--pitch-secondary-note-sat-scale: 0.15;
			--pitch-secondary-note-lum: 40;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: 100;
			--pitch-primary-note-hue-scale: 6.1;
			--pitch-primary-note-sat: 100;
			--pitch-primary-note-sat-scale: 0.15;
			--pitch-primary-note-lum: 85.6;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 65;
			--noise-secondary-channel-hue-scale: 2;
			--noise-secondary-channel-sat: 55;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 42;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 65;
			--noise-primary-channel-hue-scale: 2;
			--noise-primary-channel-sat: 66;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 63.5;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 65;
			--noise-secondary-note-hue-scale: 2;
			--noise-secondary-note-sat: 66;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 55;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 65;
			--noise-primary-note-hue-scale: 2;
			--noise-primary-note-sat: 70;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 74;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 192;
			--mod-secondary-channel-hue-scale: 1.5;
			--mod-secondary-channel-sat: 88;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 50;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 192;
			--mod-primary-channel-hue-scale: 1.5;
			--mod-primary-channel-sat: 96;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 80;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 192;
			--mod-secondary-note-hue-scale: 1.5;
			--mod-secondary-note-sat: 92;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 45;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 192;
			--mod-primary-note-hue-scale: 1.5;
			--mod-primary-note-sat: 96;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 85;
			--mod-primary-note-lum-scale: 0;
			--oscilloscope-line-R: white;
			--oscilloscope-line-L: var(--secondary-text);
		}`,
        "voxonium": `:root {
			--page-margin: #02070D;
			--editor-background: #02070D;
			--hover-preview: white;
			--playhead: white;
			--primary-text: #9bd1ee;
			--secondary-text: #5a6da8;
			--inverted-text: black;
			--text-selection: rgb(68 68 255 / 99%);
			--box-selection-fill: rgb(0 0 255 / 30%);
			--loop-accent: #024aca;
			--link-accent: #024aca;
			--ui-widget-background: #161c2e;
			--ui-widget-focus: #262c3e;
			--pitch-background: #22272D;
			--tonic: #1b3056;
			--fifth-note: #344051;
			--white-piano-key: #a6c6ed;
			--black-piano-key: #2f4687;
			--use-color-formula: false;
			--track-editor-bg-pitch: #25284c;
			--track-editor-bg-pitch-dim: #211c26;
			--track-editor-bg-noise: #261f42;
			--track-editor-bg-noise-dim: #1a152d;
			--track-editor-bg-mod: #183049;
			--track-editor-bg-mod-dim: #102132;
			--multiplicative-mod-slider: #344a7f;
			--overwriting-mod-slider: #344a7f;
			--indicator-primary: #024aca;
			--indicator-secondary: #00177d;
			--select2-opt-group: #141e34;
			--input-box-outline: #141e34;
			--mute-button-normal: #273b9d;
			--mute-button-mod: #27989d;
			--pitch1-secondary-channel: hsl(200, 100%, 40%);
			--pitch1-primary-channel: #6ecfff;
			--pitch1-secondary-note: hsl(200, 100%, 40%);
			--pitch1-primary-note: #6ecfff;
			--pitch2-secondary-channel: 	hsl(212, 100%, 34%);
			--pitch2-primary-channel: #5BA8FF;
			--pitch2-secondary-note: hsl(212, 100%, 34%);
			--pitch2-primary-note: #5BA8FF;
			--pitch3-secondary-channel: #024ACA;
			--pitch3-primary-channel: #0A89FF;
			--pitch3-secondary-note: #024ACA;
			--pitch3-primary-note: #0A89FF;
			--pitch4-secondary-channel: #00177D;
			--pitch4-primary-channel: #024ACA;
			--pitch4-secondary-note: #00177D;
			--pitch4-primary-note: #024ACA;
			--pitch5-secondary-channel: #000e4e;
			--pitch5-primary-channel: #0023bf;
			--pitch5-secondary-note: #000e4e;
			--pitch5-primary-note: #0023bf;
			--pitch6-secondary-channel: #8990FE;
			--pitch6-primary-channel: #C2C6FF;
			--pitch6-secondary-note: #8990FE;
			--pitch6-primary-note: #C2C6FF;
			--pitch7-secondary-channel: #5E65D3;
			--pitch7-primary-channel: #8990FE;
			--pitch7-secondary-note: #5E65D3;
			--pitch7-primary-note: #8990FE;
			--pitch8-secondary-channel: #3138A6;
			--pitch8-primary-channel: #5E65D3;
			--pitch8-secondary-note: #3138A6;
			--pitch8-primary-note: #5E65D3;
			--pitch9-secondary-channel: #1B0B7F;
			--pitch9-primary-channel: #3138A6;
			--pitch9-secondary-note: #1B0B7F;
			--pitch9-primary-note: #3138A6;
			--pitch10-secondary-channel: #13015D;
			--pitch10-primary-channel: #1c02bd;
			--pitch10-secondary-note: #13015D;
			--pitch10-primary-note: #1c02bd;
			--noise1-secondary-channel: #A675FE;
			--noise1-primary-channel: #E2C9FF;
			--noise1-secondary-note: #A675FE;
			--noise1-primary-note: #E2C9FF;
			--noise2-secondary-channel: #6A31CA;
			--noise2-primary-channel: #A675FE;
			--noise2-secondary-note: #6A31CA;
			--noise2-primary-note: #A675FE;
			--noise3-secondary-channel: #5A1991;
			--noise3-primary-channel: #6A31CA;
			--noise3-secondary-note: #5A1991;
			--noise3-primary-note: #6A31CA;
			--noise4-secondary-channel: #2f1a68;
			--noise4-primary-channel: #5A1991;
			--noise4-secondary-note: #2f1a68;
			--noise4-primary-note: #5A1991;
			--noise5-secondary-channel: #211640;
			--noise5-primary-channel: #391b8d;
			--noise5-secondary-note: #211640;
			--noise5-primary-note: #391b8d;
			--mod1-secondary-channel: #25E2CD;
			--mod1-primary-channel: #BDFFCA;
			--mod1-secondary-note: #25E2CD;
			--mod1-primary-note: #BDFFCA;
			--mod2-secondary-channel: #0A98AC;
			--mod2-primary-channel: #25E2CD;
			--mod2-secondary-note: #0A98AC;
			--mod2-primary-note: #25E2CC;
			--mod3-secondary-channel: #005280;
			--mod3-primary-channel: #0A98AC;
			--mod3-secondary-note: #005280;
			--mod3-primary-note: #0A98AC;
			--mod4-secondary-channel: #0f3670;
			--mod4-primary-channel: #1369c1;
			--mod4-secondary-note: #0f3670;
			--mod4-primary-note: #1369c1;
			--mod-label-primary: #191d26;
			--mod-label-secondary-text: #024aca;
			--mod-label-primary-text: #ffffffa6;
			--disabled-note-primary: #c9c9c9;
			--disabled-note-secondary: #616161;
	}`,
        "axobox": `
		:root {
			--page-margin: #000e1c;
			--editor-background: #000e1c;
			--playhead: rgba(255, 255, 255, 0.9);
			--secondary-text: #84859a;
			--box-selection-fill: #044b94;
			--ui-widget-background: #2a3045;
			--ui-widget-focus: #4f4a68;
			--pitch-background: #3c5773;
			--tonic: #453e80;
			--fifth-note: #545498;
			--white-piano-key: #eee;
			--black-piano-key: #666;
			--use-color-formula: true;
			--track-editor-bg-pitch: #393e4f;
			--track-editor-bg-pitch-dim: #1c1d28;
			--track-editor-bg-noise: #3d3535;
			--track-editor-bg-noise-dim: #161313;
			--track-editor-bg-mod: #283560;
			--track-editor-bg-mod-dim: #0a101f;
			--multiplicative-mod-slider: #606c9f;
			--overwriting-mod-slider: #6850b5;
			--indicator-primary: #1E90FF;
			--indicator-secondary: #1560BD;
			--select2-opt-group: #3f3951;
			--input-box-outline: #222;
			--mute-button-normal: #dda85d;
			--mute-button-mod: #886eae;
			--mod-label-primary: #282840;
			--mod-label-secondary-text: rgb(87, 86, 120);
			--mod-label-primary-text: white;
			--pitch-secondary-channel-hue: 210;
			--pitch-secondary-channel-hue-scale: 6.5;
			--pitch-secondary-channel-sat: 100;
			--pitch-secondary-channel-sat-scale: 0.1;
			--pitch-secondary-channel-lum: 50;
			--pitch-secondary-channel-lum-scale: 0.05;
			--pitch-primary-channel-hue: 205;
			--pitch-primary-channel-hue-scale: 6.5;
			--pitch-primary-channel-sat: 39;
			--pitch-primary-channel-sat-scale: 0.1;
			--pitch-primary-channel-lum: 60;
			--pitch-primary-channel-lum-scale: 0.05;
			--pitch-secondary-note-hue: 225;
			--pitch-secondary-note-hue-scale: 6.5;
			--pitch-secondary-note-sat: 55;
			--pitch-secondary-note-sat-scale: 0.1;
			--pitch-secondary-note-lum: 37;
			--pitch-secondary-note-lum-scale: 0.05;
			--pitch-primary-note-hue: 204;
			--pitch-primary-note-hue-scale: 6.5;
			--pitch-primary-note-sat: 100;
			--pitch-primary-note-sat-scale: 0.05;
			--pitch-primary-note-lum: 37;
			--pitch-primary-note-lum-scale: 0.025;
			--noise-secondary-channel-hue: 138;
			--noise-secondary-channel-hue-scale: 2;
			--noise-secondary-channel-sat: 97;
			--noise-secondary-channel-sat-scale: 0;
			--noise-secondary-channel-lum: 38;
			--noise-secondary-channel-lum-scale: 0;
			--noise-primary-channel-hue: 74;
			--noise-primary-channel-hue-scale: 2;
			--noise-primary-channel-sat: 100;
			--noise-primary-channel-sat-scale: 0;
			--noise-primary-channel-lum: 36;
			--noise-primary-channel-lum-scale: 0;
			--noise-secondary-note-hue: 175;
			--noise-secondary-note-hue-scale: 2;
			--noise-secondary-note-sat: 98;
			--noise-secondary-note-sat-scale: 0;
			--noise-secondary-note-lum: 24;
			--noise-secondary-note-lum-scale: 0;
			--noise-primary-note-hue: 149;
			--noise-primary-note-hue-scale: 2;
			--noise-primary-note-sat: 100;
			--noise-primary-note-sat-scale: 0;
			--noise-primary-note-lum: 32;
			--noise-primary-note-lum-scale: 0;
			--mod-secondary-channel-hue: 44;
			--mod-secondary-channel-hue-scale: 1.5;
			--mod-secondary-channel-sat: 100;
			--mod-secondary-channel-sat-scale: 0;
			--mod-secondary-channel-lum: 50;
			--mod-secondary-channel-lum-scale: 0;
			--mod-primary-channel-hue: 45;
			--mod-primary-channel-hue-scale: 1.5;
			--mod-primary-channel-sat: 90;
			--mod-primary-channel-sat-scale: 0;
			--mod-primary-channel-lum: 57;
			--mod-primary-channel-lum-scale: 0;
			--mod-secondary-note-hue: 33;
			--mod-secondary-note-hue-scale: 1.5;
			--mod-secondary-note-sat: 100;
			--mod-secondary-note-sat-scale: 0;
			--mod-secondary-note-lum: 47;
			--mod-secondary-note-lum-scale: 0;
			--mod-primary-note-hue: 45;
			--mod-primary-note-hue-scale: 1.5;
			--mod-primary-note-sat: 100;
			--mod-primary-note-sat-scale: 0;
			--mod-primary-note-lum: 60;
			--mod-primary-note-lum-scale: 0;
			--disabled-note-primary:    #9187d1;
			--disabled-note-secondary:  #6a67ac;
		}`,
        "lemmbox dark": `
		:root {
			--page-margin: #020009;
			--editor-background: #020009;
			--secondary-text: white;
			--text-selection: #c2a855;
			--loop-accent: #fff570;
			--link-accent: #fff570;
			--ui-widget-background: #191721;
			--ui-widget-focus: #2d293b;
			--pitch-background: #44444A;
			--tonic: #c2a855;
			--white-piano-key-text: #131200;
			--black-piano-key-text: #fff;
			--use-color-formula: false;
			--pitch-channel-limit: 10;
			--track-editor-bg-pitch: #444;
			--track-editor-bg-pitch-dim: #333;
			--track-editor-bg-noise: #444;
			--track-editor-bg-noise-dim: #333;
			--track-editor-bg-mod: #234;
			--track-editor-bg-mod-dim: #123;
			--multiplicative-mod-slider: #456;
			--overwriting-mod-slider: #654;
			--indicator-primary: #6a38ff;
			--indicator-secondary: #444;
			--select2-opt-group: #585858;
			--input-box-outline: #403b4f;
			--mute-button-normal: #ffa033;
			--mute-button-mod: #8066cc;

			--pitch1-secondary-channel: #e64951;
			--pitch1-primary-channel: #f0565e;
			--pitch1-secondary-note: #f34149;
			--pitch1-primary-note: #f99ca9;

			--pitch2-secondary-channel: #de6f2f;
			--pitch2-primary-channel: #f18e55;
			--pitch2-secondary-note: #ef7d3b;
			--pitch2-primary-note: #f6ad92;

			--pitch3-secondary-channel: #e1d30e;
			--pitch3-primary-channel: #faec29;
			--pitch3-secondary-note: #d9cd23;
			--pitch3-primary-note: #fff570;

			--pitch4-secondary-channel: #78c25a;
			--pitch4-primary-channel: #85d947;
			--pitch4-secondary-note: #8de02d;
			--pitch4-primary-note: #bdff70;

			--pitch5-secondary-channel: #2190eb;
			--pitch5-primary-channel: #45a5f5;
			--pitch5-secondary-note: #399bea;
			--pitch5-primary-note: #70bfff;

			--pitch6-secondary-channel: #7e3af2;
			--pitch6-primary-channel: #8b4df7;
			--pitch6-secondary-note: #752fed;
			--pitch6-primary-note: #965cfa;

			--pitch7-secondary-channel: #7e05f7;
			--pitch7-primary-channel: #922df7;
			--pitch7-secondary-note: #7c29cf;
			--pitch7-primary-note: #9443e6;

			--pitch8-secondary-channel: #94249e;
			--pitch8-primary-channel: #cf2cde;
			--pitch8-secondary-note: #b326bf;
			--pitch8-primary-note: #c53fd1;

			--pitch9-secondary-channel: #c42f6b;
			--pitch9-primary-channel: #fc5d9d;
			--pitch9-secondary-note: #cf3b77;
			--pitch9-primary-note: #e36f9e;

			--pitch10-secondary-channel: #d53c5e;
			--pitch10-primary-channel: #f65a7e;
			--pitch10-secondary-note: #e13e60;
			--pitch10-primary-note: #ed8090;

			--mod1-secondary-channel: #339955;
			--mod1-primary-channel: #77fc55;
			--mod1-secondary-note: #77ff8a;
			--mod1-primary-note: #cdffee;

			--mod2-secondary-channel: #993355;
			--mod2-primary-channel: #f04960;
			--mod2-secondary-note: #f057a0;
			--mod2-primary-note: #ffb8de;

			--mod3-secondary-channel: #553399;
			--mod3-primary-channel: #8855fc;
			--mod3-secondary-note: #aa64ff;
			--mod3-primary-note: #f8ddff;

			--mod4-secondary-channel: #a86436;
			--mod4-primary-channel: #c8a825;
			--mod4-secondary-note: #e8ba46;
			--mod4-primary-note: #fff6d3;

			--mod-label-primary: #999;
			--mod-label-secondary-text: #333;
			--mod-label-primary-text: black;
			--disabled-note-primary: #999;
			--disabled-note-secondary: #666;

			--pitch1-background: #777;
		}`,
        "azur lane": `
		:root {
			--page-margin: #19337e;
			--editor-background: #000333cf;
			--playhead: rgba(255, 255, 255, 0.9);
			--primary-text: #9af9ff;
			--secondary-text: #4072dd;
			--box-selection-fill: #044b94;
			--loop-accent: #950d0d;
			--link-accent: #0072ff;
			--ui-widget-background: #255bb3;
			--ui-widget-focus: #757575;
			--pitch-background: #20468b73;
			--tonic: #c9c9c9;
			--fifth-note: #731d1d;
			--white-piano-key: #eee;
			--black-piano-key: #000;
			--track-editor-bg-pitch: #535a73;
			--track-editor-bg-pitch-dim: #353643;
			--track-editor-bg-noise: #770000;
			--track-editor-bg-noise-dim: #430000;
			--track-editor-bg-mod: #5d1d06;
			--track-editor-bg-mod-dim: #270000;
			--multiplicative-mod-slider: #bb0000;
			--overwriting-mod-slider: #ad0000;
			--indicator-primary: #9c64f7;
			--indicator-secondary: #393e4f;
			--select2-opt-group: #5d576f;
			--input-box-outline: #002957;
			--mute-button-normal: #ffffff;
			--mute-button-mod: #4f4f4f;
			--mod-label-primary: #531313;
			--pitch1-secondary-channel: #80858d;
		  --pitch1-primary-channel: #f2f7ff;
		  --pitch1-secondary-note: #80858d;
		  --pitch1-primary-note: #f2f7ff;
		  --pitch2-secondary-channel: #7392ad;
		  --pitch2-primary-channel: #a8d6ff;
		  --pitch2-secondary-note: #7392ad;
		  --pitch2-primary-note: #a8d6ff;
		  --pitch3-secondary-channel: #4b7eaa;
		  --pitch3-primary-channel: #71bdff;
		  --pitch3-secondary-note: #4b7eaa;
		  --pitch3-primary-note: #71bdff;
		  --pitch4-secondary-channel: #3594b1;
		  --pitch4-primary-channel: #48d4ff;
		  --pitch4-secondary-note: #3594b1;
		  --pitch4-primary-note: #48d4ff;
		  --pitch5-secondary-channel: #1b98b1;
		  --pitch5-primary-channel: #30f1ff;
		  --pitch5-secondary-note: #1b98b1;
		  --pitch5-primary-note: #30f1ff;
		  --pitch6-secondary-channel: #9e0000;
		  --pitch6-primary-channel: #db0000;
		  --pitch6-secondary-note: #9e0000;
		  --pitch6-primary-note: #db0000;
		  --pitch7-secondary-channel: #7c1717;
		  --pitch7-primary-channel: #9e0000;
		  --pitch7-secondary-note: #7c1717;
		  --pitch7-primary-note: #9e0000;
		  --pitch8-secondary-channel: #5c1f1f;
		  --pitch8-primary-channel: #7c1717;
		  --pitch8-secondary-note: #5c1f1f;
		  --pitch8-primary-note: #7c1717;
		  --pitch9-secondary-channel: #3e2020;
		  --pitch9-primary-channel: #5c1f1f;
		  --pitch9-secondary-note: #3e2020;
		  --pitch9-primary-note: #5c1f1f;
		  --pitch10-secondary-channel: #2f1c1c;
		  --pitch10-primary-channel: #5c1f1f;
		  --pitch10-secondary-note: #2f1c1c;
		  --pitch10-primary-note: #5c1f1f;
		  --noise1-secondary-channel: #828282;
		  --noise1-primary-channel: #cacaca;
		  --noise1-secondary-note: #828282;
		  --noise1-primary-note: #cacaca;
		  --noise2-secondary-channel: #2f8baf;
		  --noise2-primary-channel: #3de2ff;
		  --noise2-secondary-note: #2f8baf;
		  --noise2-primary-note: #3de2ff;
		  --noise3-secondary-channel: #6f50b1;
		  --noise3-primary-channel: #8567ff;
		  --noise3-secondary-note: #6f50b1;
		  --noise3-primary-note: #8567ff;
		  --noise4-secondary-channel: #d38900;
		  --noise4-primary-channel: #ffb500;
		  --noise4-secondary-note: #d38900;
		  --noise4-primary-note: #ffb500;
		  --noise5-secondary-channel: #af0008;
		  --noise5-primary-channel: #00d70e;
		  --noise5-secondary-note: #29b700;
		  --noise5-primary-note: #00f7ff;
		  --mod1-secondary-channel: #9d5bb9;
		  --mod1-primary-channel: #e16bff;
		  --mod1-secondary-note: #3a3ea4;
		  --mod1-primary-note: #fff;
		  --mod2-secondary-channel: #3a8d58;
		  --mod2-primary-channel: #42ffff;
		  --mod2-secondary-note: #3a8d58;
		  --mod2-primary-note: #42ffff;
		  --mod3-secondary-channel: #af6c00;
		  --mod3-primary-channel: #fa0;
		  --mod3-secondary-note: #0001a2;
		  --mod3-primary-note: #970000;
		  --mod4-secondary-channel: #d3d3d3;
		  --mod4-primary-channel: #759bff;
		  --mod4-secondary-note: #a00000;
		  --mod4-primary-note: #fff;
		  --disabled-note-primary: #3a3a3a;
		  --disabled-note-secondary: #000;
			}
		* {
		cursor: url("theme_resources/AzurLaneThemeMouse.png"), auto !important;
		}
		/* sets background image */
		body {
 background-image: url("./UltraBoxAzurLaneThemeMemoryTaskBackground.png") !important;
 background-size: cover;
 background-position: center;
 background-repeat: no-repeat;
}
			/* make editor background transparent */
		#beepboxEditorContainer, .beepboxEditor, #text-content {
		background: #0400257d !important;
		}
			#text-content > section > h1 > font {
		display: none;
		}
		#text-content > section > h1 {
		margin: auto;
		content: url("./UltraBoxALThemeLogo.png");
		}
		.promptContainerBG::before {
			box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
		}
		}`,
    "matrix": `
 .fbox {
 color: #38554E;
 }
 html{
 color: #111;
	background-color: #000;
	font-family: 'Fire Code', monospace;

}
 :root {
 --page-margin: #000000;
 --editor-background: #000000;
 --playhead: rgba(0, 255, 22, 0.44);
 --secondary-text: #7EFF80;
 --text-selection: rgba(0, 255, 75, 0.99);
 --box-selection-fill: #3CB003;
 --loop-accent: #008A3B;
 --link-accent: #006918;
 --ui-widget-background: #1A291F;
 --ui-widget-focus: #191F1E;
 --pitch-background: #000000;
 --tonic: #0C4F0C;
 --fifth-note: #0B1F0F;
 --white-piano-key: #edc;
 --black-piano-key: #456;
 --use-color-formula: true;
 --track-editor-bg-pitch: #333333;
 --track-editor-bg-pitch-dim: #000000;
 --track-editor-bg-noise: #463400;
 --track-editor-bg-noise-dim: #000000;
 --track-editor-bg-mod: #004634;
 --track-editor-bg-mod-dim: #000000;
 --multiplicative-mod-slider: #FFC800;
 --overwriting-mod-slider: #17FF00;
 --indicator-primary: #1EFF00;
 --indicator-secondary: #000000;
 --select2-opt-group: #2B2B2B;
 --input-box-outline: #00FF2F;
 --mute-button-normal: #00FF06;
 --mute-button-mod: #00FF0D;
 --mod-label-primary: #38554E;
 --mod-label-secondary-text: rgb(0, 43, 45);
 --mod-label-primary-text: white;
 --pitch-secondary-channel-hue: 100;
 --pitch-secondary-channel-hue-scale: 0;
 --pitch-secondary-channel-sat: 83.3;
 --pitch-secondary-channel-sat-scale: 0.1;
 --pitch-secondary-channel-lum: 40;
 --pitch-secondary-channel-lum-scale: 0.05;
 --pitch-primary-channel-hue: 100;
 --pitch-primary-channel-hue-scale: 0;
 --pitch-primary-channel-sat: 100;
 --pitch-primary-channel-sat-scale: 0.1;
 --pitch-primary-channel-lum: 67.5;
 --pitch-primary-channel-lum-scale: 0.05;
 --pitch-secondary-note-hue: 100;
 --pitch-secondary-note-hue-scale: 0;
 --pitch-secondary-note-sat: 93.9;
 --pitch-secondary-note-sat-scale: 0.1;
 --pitch-secondary-note-lum: 25;
 --pitch-secondary-note-lum-scale: 0.05;
 --pitch-primary-note-hue: 100;
 --pitch-primary-note-hue-scale: 0;
 --pitch-primary-note-sat: 100;
 --pitch-primary-note-sat-scale: 0.05;
 --pitch-primary-note-lum: 85.6;
 --pitch-primary-note-lum-scale: 0.025;
 
 
 --noise-secondary-channel-hue: 100;
 --noise-secondary-channel-hue-scale: 0;
 --noise-secondary-channel-sat: 25;
 --noise-secondary-channel-sat-scale: 0;
 --noise-secondary-channel-lum: 42;
 --noise-secondary-channel-lum-scale: 0;
 --noise-primary-channel-hue: 100;
 --noise-primary-channel-hue-scale: 0;
 --noise-primary-channel-sat: 33;
 --noise-primary-channel-sat-scale: 0;
 --noise-primary-channel-lum: 63.5;
 --noise-primary-channel-lum-scale: 0;
 --noise-secondary-note-hue: 100;
 --noise-secondary-note-hue-scale: 0;
 --noise-secondary-note-sat: 33.5;
 --noise-secondary-note-sat-scale: 0;
 --noise-secondary-note-lum: 55;
 --noise-secondary-note-lum-scale: 0;
 --noise-primary-note-hue: 100;
 --noise-primary-note-hue-scale: 0;
 --noise-primary-note-sat: 46.5;
 --noise-primary-note-sat-scale: 0;
 --noise-primary-note-lum: 74;
 --noise-primary-note-lum-scale: 0;
 --mod-secondary-channel-hue: 350;
 --mod-secondary-channel-hue-scale: 0;
 --mod-secondary-channel-sat: 88;
 --mod-secondary-channel-sat-scale: 0;
 --mod-secondary-channel-lum: 50;
 --mod-secondary-channel-lum-scale: 0;
 --mod-primary-channel-hue: 350;
 --mod-primary-channel-hue-scale: 0;
 --mod-primary-channel-sat: 96;
 --mod-primary-channel-sat-scale: 0;
 --mod-primary-channel-lum: 80;
 --mod-primary-channel-lum-scale: 0;
 --mod-secondary-note-hue: 350;
 --mod-secondary-note-hue-scale: 0;
 --mod-secondary-note-sat: 92;
 --mod-secondary-note-sat-scale: 0;
 --mod-secondary-note-lum: 45;
 --mod-secondary-note-lum-scale: 0;
 --mod-primary-note-hue: 350;
 --mod-primary-note-hue-scale: 0;
 --mod-primary-note-sat: 96;
 --mod-primary-note-sat-scale: 0;
 --mod-primary-note-lum: 85;
 --mod-primary-note-lum-scale: 0; 
 }
			`,
			
"typebox": `
.fbox {
	color: #3178c6;
}
html{
 color: #3178c6;
	background-color: #1e1e1e;
	font-family: 'Fira Code', monospace;

}
:root {
	--page-margin: #1e1e1e;
	--editor-background: #1b1b1b;
	--playhead: rgba(255, 255, 255, 0.9);
	--secondary-text: #9cdcfe;
	--text-selection: rgba(0, 122, 204, 0.3);
	--box-selection-fill: #007acc;
	--loop-accent: #dcdcaa;
	--link-accent: #ce9178;
	--ui-widget-background: #252526;
	--ui-widget-focus: #007acc;
	--pitch-background: #202020;
	--tonic: #569cd6;
	--fifth-note: #dcdcaa;
	--white-piano-key: #f3f3f3;
	--black-piano-key: #3c3c3c;
	--use-color-formula: true;
	--track-editor-bg-pitch: #2d2d30;
	--track-editor-bg-pitch-dim: #1e1e1e;
	--track-editor-bg-noise: #373737;
	--track-editor-bg-noise-dim: #1a1a1a;
	--track-editor-bg-mod: #004f88;
	--track-editor-bg-mod-dim: #002b4d;
	--multiplicative-mod-slider: #ce9178;
	--overwriting-mod-slider: #c586c0;
	--indicator-primary: #d7ba7d;
	--indicator-secondary: #808080;
	--select2-opt-group: #2b2b2b;
	--input-box-outline: #3794ff;
	--mute-button-normal: #c586c0;
	--mute-button-mod: #569cd6;
	--mod-label-primary: #1e1e1e;
	--mod-label-secondary-text: #d4d4d4;
	--mod-label-primary-text: #ffffff;

	--pitch-primary-channel-hue: 212;
	--pitch-primary-channel-hue-scale: 0;
	--pitch-primary-channel-sat: 100;
	--pitch-primary-channel-sat-scale: 0.1;
	--pitch-primary-channel-lum: 67.5;
	--pitch-primary-channel-lum-scale: 0.05;

	--pitch-secondary-channel-hue: 212;
	--pitch-secondary-channel-hue-scale: 0;
	--pitch-secondary-channel-sat: 90.3;
	--pitch-secondary-channel-sat-scale: 0.1;
	--pitch-secondary-channel-lum: 70;
	--pitch-secondary-channel-lum-scale: 0.05;

	--pitch-primary-note-hue: 212;
	--pitch-primary-note-hue-scale:0;
	--pitch-primary-note-sat: 100;
	--pitch-primary-note-sat-scale: 0.05;
	--pitch-primary-note-lum: 85.6;
	--pitch-primary-note-lum-scale: 0.025;

	--pitch-secondary-note-hue: 212;
	--pitch-secondary-note-hue-scale: 0;
	--pitch-secondary-note-sat: 93.9;
	--pitch-secondary-note-sat-scale: 0.1;
	--pitch-secondary-note-lum: 70;
	--pitch-secondary-note-lum-scale: 0.05;

	--noise-primary-channel-hue: 45;
	--noise-primary-channel-hue-scale: 2;
	--noise-primary-channel-sat: 33;
	--noise-primary-channel-sat-scale: 0;
	--noise-primary-channel-lum: 70;
	--noise-primary-channel-lum-scale: 0;

	--noise-secondary-channel-hue: 45;
	--noise-secondary-channel-hue-scale: 2;
	--noise-secondary-channel-sat: 25;
	--noise-secondary-channel-sat-scale: 0;
	--noise-secondary-channel-lum: 70;
	--noise-secondary-channel-lum-scale: 0;

	--noise-primary-note-hue: 45;
	--noise-primary-note-hue-scale: 2;
	--noise-primary-note-sat: 46.5;
	--noise-primary-note-sat-scale: 0;
	--noise-primary-note-lum: 70;
	--noise-primary-note-lum-scale: 0;

	--noise-secondary-note-hue: 45;
	--noise-secondary-note-hue-scale: 2;
	--noise-secondary-note-sat: 33.5;
	--noise-secondary-note-sat-scale: 0;
	--noise-secondary-note-lum: 70;
	--noise-secondary-note-lum-scale: 0;

	--mod-primary-channel-hue: 280;
	--mod-primary-channel-hue-scale: 1.5;
	--mod-primary-channel-sat: 96;
	--mod-primary-channel-sat-scale: 0;
	--mod-primary-channel-lum: 70;
	--mod-primary-channel-lum-scale: 0;

	--mod-secondary-channel-hue: 280;
	--mod-secondary-channel-hue-scale: 1.5;
	--mod-secondary-channel-sat: 88;
	--mod-secondary-channel-sat-scale: 0;
	--mod-secondary-channel-lum: 70;
	--mod-secondary-channel-lum-scale: 0;

	--mod-primary-note-hue: 280;
	--mod-primary-note-hue-scale: 1.5;
	--mod-primary-note-sat: 96;
	--mod-primary-note-sat-scale: 0;
	--mod-primary-note-lum: 70;
	--mod-primary-note-lum-scale: 0;

	--mod-secondary-note-hue: 280;
	--mod-secondary-note-hue-scale: 1.5;
	--mod-secondary-note-sat: 92;
	--mod-secondary-note-sat-scale: 0;
	--mod-secondary-note-lum: 70;
	--mod-secondary-note-lum-scale: 0;
}
`,

			
			
"copperblue": `
.fbox {
	color: #A3C8BD;
}
	:root {
		--page-margin: #0a1a17;
		--editor-background: #081412;
		--playhead: rgba(255, 255, 255, 0.9);
		--secondary-text: #A3C8BD;
		--text-selection: rgba(60,255,200,0.4);
		--box-selection-fill: #2C8C78;
		--loop-accent: #00ffc0;
		--link-accent: #FFC800;
		--ui-widget-background: #38554E;
		--ui-widget-focus: #2A7E69;
		--pitch-background: #1D2E2A;
		--tonic: #2A7E69;
		--fifth-note: #406B5D;
		--white-piano-key: #e4f1ee;
		--black-piano-key: #3a5b53;
		--use-color-formula: true;
		--track-editor-bg-pitch: #2A3E3A;
		--track-editor-bg-pitch-dim: #13211f;
		--track-editor-bg-noise: #375E52;
		--track-editor-bg-noise-dim: #0e1a18;
		--track-editor-bg-mod: #1F4A40;
		--track-editor-bg-mod-dim: #0c1b17;
		--multiplicative-mod-slider: #ffcc66;
		--overwriting-mod-slider: #5ce0c0;
		--indicator-primary: #00ffd0;
		--indicator-secondary: #2C8C78;
		--select2-opt-group: #2f4a45;
		--input-box-outline: #6ADACB;
		--mute-button-normal: #00ffc0;
		--mute-button-mod: #ffcc66;
		--mod-label-primary: #38554E;
		--mod-label-secondary-text: #082825;
		--mod-label-primary-text: #ffffff;
		--pitch-secondary-channel-hue: 160;
		--pitch-secondary-channel-hue-scale: 5.8;
		--pitch-secondary-channel-sat: 75;
		--pitch-secondary-channel-sat-scale: 0.08;
		--pitch-secondary-channel-lum: 42;
		--pitch-secondary-channel-lum-scale: 0.04;
		--pitch-primary-channel-hue: 160;
		--pitch-primary-channel-hue-scale: 5.8;
		--pitch-primary-channel-sat: 95;
		--pitch-primary-channel-sat-scale: 0.1;
		--pitch-primary-channel-lum: 67;
		--pitch-primary-channel-lum-scale: 0.05;
		--pitch-secondary-note-hue: 160;
		--pitch-secondary-note-hue-scale: 5.8;
		--pitch-secondary-note-sat: 88;
		--pitch-secondary-note-sat-scale: 0.1;
		--pitch-secondary-note-lum: 28;
		--pitch-secondary-note-lum-scale: 0.05;
		--pitch-primary-note-hue: 160;
		--pitch-primary-note-hue-scale: 5.8;
		--pitch-primary-note-sat: 98;
		--pitch-primary-note-sat-scale: 0.05;
		--pitch-primary-note-lum: 82;
		--pitch-primary-note-lum-scale: 0.025;
		--noise-secondary-channel-hue: 170;
		--noise-secondary-channel-hue-scale: 1.5;
		--noise-secondary-channel-sat: 40;
		--noise-secondary-channel-sat-scale: 0;
		--noise-secondary-channel-lum: 42;
		--noise-secondary-channel-lum-scale: 0;
		--noise-primary-channel-hue: 170;
		--noise-primary-channel-hue-scale: 1.5;
		--noise-primary-channel-sat: 52;
		--noise-primary-channel-sat-scale: 0;
		--noise-primary-channel-lum: 68;
		--noise-primary-channel-lum-scale: 0;
		--mod-secondary-channel-hue: 180;
		--mod-secondary-channel-hue-scale: 1.5;
		--mod-secondary-channel-sat: 88;
		--mod-secondary-channel-sat-scale: 0;
		--mod-secondary-channel-lum: 50;
		--mod-secondary-channel-lum-scale: 0;
		--mod-primary-channel-hue: 180;
		--mod-primary-channel-hue-scale: 1.5;
		--mod-primary-channel-sat: 96;
		--mod-primary-channel-sat-scale: 0;
		--mod-primary-channel-lum: 80;
		--mod-primary-channel-lum-scale: 0;
		--mod-secondary-note-hue: 180;
		--mod-secondary-note-hue-scale: 1.5;
		--mod-secondary-note-sat: 92;
		--mod-secondary-note-sat-scale: 0;
		--mod-secondary-note-lum: 45;
		--mod-secondary-note-lum-scale: 0;
		--mod-primary-note-hue: 180;
		--mod-primary-note-hue-scale: 1.5;
		--mod-primary-note-sat: 96;
		--mod-primary-note-sat-scale: 0;
		--mod-primary-note-lum: 85;
		--mod-primary-note-lum-scale: 0;
	}
`,

"copper": `
	:root {
		--page-margin: #1a0f08;
		--editor-background: #120a05;
		--playhead: rgba(255, 224, 192, 0.9);
		--secondary-text: #cfa67a;
		--text-selection: rgba(255, 128, 64, 0.5);
		--box-selection-fill: #804d1f;
		--loop-accent: #ff914d;
		--link-accent: #ffc66e;
		--ui-widget-background: #3a2414;
		--ui-widget-focus: #c4732b;
		--pitch-background: #1e120a;
		--tonic: #5e2f10;
		--fifth-note: #473019;
		--white-piano-key: #fbe5cc;
		--black-piano-key: #7a4a22;
		--use-color-formula: true;
		--track-editor-bg-pitch: #332319;
		--track-editor-bg-pitch-dim: #1c120c;
		--track-editor-bg-noise: #5b3213;
		--track-editor-bg-noise-dim: #26160a;
		--track-editor-bg-mod: #3b1f0d;
		--track-editor-bg-mod-dim: #140a04;
		--multiplicative-mod-slider: #ffc66e;
		--overwriting-mod-slider: #ff914d;
		--indicator-primary: #ffc66e;
		--indicator-secondary: #3a2414;
		--select2-opt-group: #2d1b12;
		--input-box-outline: #c68449;
		--mute-button-normal: #ffc66e;
		--mute-button-mod: #ff914d;
		--mod-label-primary: #5e3b20;
		--mod-label-secondary-text: #1e1008;
		--mod-label-primary-text: #fff5e6;
		--pitch-secondary-channel-hue: 25;
		--pitch-secondary-channel-hue-scale: 4;
		--pitch-secondary-channel-sat: 80;
		--pitch-secondary-channel-sat-scale: 0.1;
		--pitch-secondary-channel-lum: 30;
		--pitch-secondary-channel-lum-scale: 0.05;
		--pitch-primary-channel-hue: 25;
		--pitch-primary-channel-hue-scale: 4;
		--pitch-primary-channel-sat: 100;
		--pitch-primary-channel-sat-scale: 0.1;
		--pitch-primary-channel-lum: 60;
		--pitch-primary-channel-lum-scale: 0.05;
		--pitch-secondary-note-hue: 25;
		--pitch-secondary-note-hue-scale: 4;
		--pitch-secondary-note-sat: 95;
		--pitch-secondary-note-sat-scale: 0.1;
		--pitch-secondary-note-lum: 25;
		--pitch-secondary-note-lum-scale: 0.05;
		--pitch-primary-note-hue: 25;
		--pitch-primary-note-hue-scale: 4;
		--pitch-primary-note-sat: 100;
		--pitch-primary-note-sat-scale: 0.05;
		--pitch-primary-note-lum: 80;
		--pitch-primary-note-lum-scale: 0.025;
		--noise-secondary-channel-hue: 30;
		--noise-secondary-channel-hue-scale: 1.5;
		--noise-secondary-channel-sat: 45;
		--noise-secondary-channel-sat-scale: 0;
		--noise-secondary-channel-lum: 40;
		--noise-secondary-channel-lum-scale: 0;
		--noise-primary-channel-hue: 30;
		--noise-primary-channel-hue-scale: 1.5;
		--noise-primary-channel-sat: 60;
		--noise-primary-channel-sat-scale: 0;
		--noise-primary-channel-lum: 65;
		--noise-primary-channel-lum-scale: 0;
		--noise-secondary-note-hue: 30;
		--noise-secondary-note-hue-scale: 1.5;
		--noise-secondary-note-sat: 60;
		--noise-secondary-note-sat-scale: 0;
		--noise-secondary-note-lum: 55;
		--noise-secondary-note-lum-scale: 0;
		--noise-primary-note-hue: 30;
		--noise-primary-note-hue-scale: 1.5;
		--noise-primary-note-sat: 70;
		--noise-primary-note-sat-scale: 0;
		--noise-primary-note-lum: 75;
		--noise-primary-note-lum-scale: 0;
		--mod-secondary-channel-hue: 30;
		--mod-secondary-channel-hue-scale: 1;
		--mod-secondary-channel-sat: 85;
		--mod-secondary-channel-sat-scale: 0;
		--mod-secondary-channel-lum: 45;
		--mod-secondary-channel-lum-scale: 0;
		--mod-primary-channel-hue: 30;
		--mod-primary-channel-hue-scale: 1;
		--mod-primary-channel-sat: 95;
		--mod-primary-channel-sat-scale: 0;
		--mod-primary-channel-lum: 75;
		--mod-primary-channel-lum-scale: 0;
		--mod-secondary-note-hue: 30;
		--mod-secondary-note-hue-scale: 1;
		--mod-secondary-note-sat: 85;
		--mod-secondary-note-sat-scale: 0;
		--mod-secondary-note-lum: 45;
		--mod-secondary-note-lum-scale: 0;
		--mod-primary-note-hue: 30;
		--mod-primary-note-hue-scale: 1;
		--mod-primary-note-sat: 95;
		--mod-primary-note-sat-scale: 0;
		--mod-primary-note-lum: 80;
		--mod-primary-note-lum-scale: 0;
	}
`,
"Paper": `
.fbox {
  color: #111111;
}
:root {
  -webkit-text-stroke-width: 0.3px;
  --page-margin: #EAEAEA;
  --editor-background: #EAEAEA;
  --hover-preview: #FFFFFF;
  --playhead: #EAEAEA;
  --primary-text: #000000;
  --secondary-text: #000000;
  --inverted-text: #FFFFFF;
  --text-selection: #000000;
  --box-selection-fill: #353535;
  --loop-accent: #606060;
  --link-accent: #C1C1C1;
  --ui-widget-background: #E4E4E4;
  --ui-widget-focus: #8B8B8B;
  --pitch-background: #FAFAFA;
  --tonic: #E8E8E8;
  --fifth-note: #434343;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #FFFFFF;
  --white-piano-key: #FFFFFF;
  --black-piano-key: #000000;
  --use-color-formula: false;
  --track-editor-bg-pitch: #CCCCCC;
  --track-editor-bg-pitch-dim: #3D3D3D;
  --track-editor-bg-noise: #D4D4D4;
  --track-editor-bg-noise-dim: #1F1F1F;
  --track-editor-bg-mod: #717171;
  --track-editor-bg-mod-dim: #CECECE;
  --multiplicative-mod-slider: #4F4F4F;
  --overwriting-mod-slider: #434343;
  --indicator-primary: #373737;
  --indicator-secondary: #0D0D0D;
  --select2-opt-group: #C6C6C6;
  --input-box-outline: #000000;
  --mute-button-normal: #0A0A0A;
  --mute-button-mod: #040404;
  
  /* pitch */
  --pitch1-primary-channel: #000000;
  --pitch1-secondary-channel: #484848;
  --pitch1-primary-note: #000000;
  --pitch1-secondary-note: #484848;
  
  --pitch2-primary-channel: #000000;
  --pitch2-secondary-channel: #484848;
  --pitch2-primary-note: #000000;
  --pitch2-secondary-note: #484848;
  
  --pitch3-primary-channel: #000000;
  --pitch3-secondary-channel: #484848;
  --pitch3-primary-note: #000000;
  --pitch3-secondary-note: #484848;
  
  --pitch4-primary-channel: #000000;
  --pitch4-secondary-channel: #484848;
  --pitch4-primary-note: #000000;
  --pitch4-secondary-note: #484848;
  
  --pitch5-primary-channel: #000000;
  --pitch5-secondary-channel: #484848;
  --pitch5-primary-note: #000000;
  --pitch5-secondary-note: #484848;
  
  --pitch6-primary-channel: #000000;
  --pitch6-secondary-channel: #484848;
  --pitch6-primary-note: #000000;
  --pitch6-secondary-note: #484848;
  
  --pitch7-primary-channel: #000000;
  --pitch7-secondary-channel: #484848;
  --pitch7-primary-note: #000000;
  --pitch7-secondary-note: #484848;
  
  --pitch8-primary-channel: #000000;
  --pitch8-secondary-channel: #484848;
  --pitch8-primary-note: #000000;
  --pitch8-secondary-note: #484848;
  
  --pitch9-primary-channel: #000000;
  --pitch9-secondary-channel: #484848;
  --pitch9-primary-note: #000000;
  --pitch9-secondary-note: #484848;
  
  --pitch10-primary-channel: #000000;
  --pitch10-secondary-channel: #484848;
  --pitch10-primary-note: #000000;
  --pitch10-secondary-note: #484848;
  
  /* noise */
  --noise1-primary-channel: #000000;
  --noise1-secondary-channel: #484848;
  --noise1-primary-note: #000000;
  --noise1-secondary-note: #484848;
  
  --noise2-primary-channel: #000000;
  --noise2-secondary-channel: #484848;
  --noise2-primary-note: #000000;
  --noise2-secondary-note: #484848;
  
  --noise3-primary-channel: #000000;
  --noise3-secondary-channel: #484848;
  --noise3-primary-note: #000000;
  --noise3-secondary-note: #484848;
  
  --noise4-primary-channel: #000000;
  --noise4-secondary-channel: #484848;
  --noise4-primary-note: #000000;
  --noise4-secondary-note: #484848;
  
  --noise5-primary-channel: #000000;
  --noise5-secondary-channel: #484848;
  --noise5-primary-note: #000000;
  --noise5-secondary-note: #484848;
  
  /* mod */
  --mod1-primary-channel: #000000;
  --mod1-secondary-channel: #484848;
  --mod1-primary-note: #000000;
  --mod1-secondary-note: #484848;
  
  --mod2-primary-channel: #000000;
  --mod2-secondary-channel: #484848;
  --mod2-primary-note: #000000;
  --mod2-secondary-note: #484848;
  
  --mod3-primary-channel: #000000;
  --mod3-secondary-channel: #484848;
  --mod3-primary-note: #000000;
  --mod3-secondary-note: #484848;
  
  --mod4-primary-channel: #000000;
  --mod4-secondary-channel: #484848;
  --mod4-primary-note: #000000;
  --mod4-secondary-note: #484848;
  
  --mod-label-primary: #000000;
  --mod-label-secondary-text: #484848;
  --mod-label-primary-text: #000000;
  
  --disabled-note-primary: #484848;
  --disabled-note-secondary: #1A0E08;
}
.beepboxEditor button, .beepboxEditor select {
  box-shadow: inset 0 0 0 1px var(--secondary-text);
  opacity:0.4;
}

.select2-selection__rendered {
  box-shadow: inset 0 0 0 1px var(--secondary-text);
  opacity:0.4;
}
`,


"Halloween": `
:root {
  --page-margin: #402020;
  --editor-background: #0A0404;
  --hover-preview: #FFA74F;
  --playhead: #FF4F00;
  --primary-text: #FFDDBB;
  --secondary-text: #FFB878;
  --inverted-text: #120808;
  --text-selection: #803300;
  --box-selection-fill: #5A1C00;
  --loop-accent: #FF7518;
  --link-accent: #FF934F;
  --ui-widget-background: #2B0D0D;
  --ui-widget-focus: #FF6018;
  --pitch-background: #1A0B0B;
  --tonic: #FF8C00;
  --fifth-note: #CC6600;
  --white-piano-key-color: #100000;
  --black-piano-key-color: #FFB878;
  --white-piano-key: #803300;
  --black-piano-key: #220000;
  --use-color-formula: false;
  --track-editor-bg-pitch: #3A1A1A;
  --track-editor-bg-pitch-dim: #2A1212;
  --track-editor-bg-noise: #3C2A1A;
  --track-editor-bg-noise-dim: #2E1C0F;
  --track-editor-bg-mod: #4A1E1E;
  --track-editor-bg-mod-dim: #311818;
  --multiplicative-mod-slider: #FF9944;
  --overwriting-mod-slider: #CC7733;
  --indicator-primary: #FFBB66;
  --indicator-secondary: #D67A2E;
  --select2-opt-group: #803300;
  --input-box-outline: #B84F0D;
  --mute-button-normal: #FFBB88;
  --mute-button-mod: #FFCCAA;

  /* pitch */
  --pitch1-primary-channel: #FF5C5C;
  --pitch1-secondary-channel: #B22222;
  --pitch1-primary-note: #FFA0A0;
  --pitch1-secondary-note: #7A1A1A;

  --pitch2-primary-channel: #FF9933;
  --pitch2-secondary-channel: #CC6600;
  --pitch2-primary-note: #FFD4A3;
  --pitch2-secondary-note: #8A4B00;

  --pitch3-primary-channel: #FFE066;
  --pitch3-secondary-channel: #E6B800;
  --pitch3-primary-note: #FFF2B3;
  --pitch3-secondary-note: #A68200;

  --pitch4-primary-channel: #A3FF57;
  --pitch4-secondary-channel: #6ABB2F;
  --pitch4-primary-note: #D0FFAA;
  --pitch4-secondary-note: #467C1D;

  --pitch5-primary-channel: #4FFFCF;
  --pitch5-secondary-channel: #2FBBA5;
  --pitch5-primary-note: #AAFFF3;
  --pitch5-secondary-note: #1D7C6B;

  --pitch6-primary-channel: #4F9BFF;
  --pitch6-secondary-channel: #2F6ABB;
  --pitch6-primary-note: #A3D0FF;
  --pitch6-secondary-note: #1D467C;

  --pitch7-primary-channel: #AE57FF;
  --pitch7-secondary-channel: #722FBB;
  --pitch7-primary-note: #D7AAFF;
  --pitch7-secondary-note: #4F1D7C;

  --pitch8-primary-channel: #FF57D8;
  --pitch8-secondary-channel: #BB2F9D;
  --pitch8-primary-note: #FFAADF;
  --pitch8-secondary-note: #7C1D61;

  --pitch9-primary-channel: #FF6A8A;
  --pitch9-secondary-channel: #BB3F5E;
  --pitch9-primary-note: #FFB3C6;
  --pitch9-secondary-note: #7A2D41;

  --pitch10-primary-channel: #FFB347;
  --pitch10-secondary-channel: #CC7722;
  --pitch10-primary-note: #FFD9A3;
  --pitch10-secondary-note: #8A571D;

  /* noise */
  --noise1-primary-channel: #FF6A00;
  --noise1-secondary-channel: #B34700;
  --noise1-primary-note: #FFA366;
  --noise1-secondary-note: #803300;

  --noise2-primary-channel: #FF9933;
  --noise2-secondary-channel: #B36200;
  --noise2-primary-note: #FFD8A3;
  --noise2-secondary-note: #814B00;

  --noise3-primary-channel: #FFDA00;
  --noise3-secondary-channel: #C6AA00;
  --noise3-primary-note: #FFF6B3;
  --noise3-secondary-note: #A69200;

  --noise4-primary-channel: #8AFF00;
  --noise4-secondary-channel: #5EBB00;
  --noise4-primary-note: #C6FFA3;
  --noise4-secondary-note: #478000;

  --noise5-primary-channel: #FF44AA;
  --noise5-secondary-channel: #BB2F78;
  --noise5-primary-note: #FFAAD8;
  --noise5-secondary-note: #7C1D52;

  /* mod */
  --mod1-primary-channel: #FF8040;
  --mod1-secondary-channel: #B34F00;
  --mod1-primary-note: #FFC699;
  --mod1-secondary-note: #8A3D00;

  --mod2-primary-channel: #FFCC00;
  --mod2-secondary-channel: #B39C00;
  --mod2-primary-note: #FFEB99;
  --mod2-secondary-note: #8A7000;

  --mod3-primary-channel: #6AFF69;
  --mod3-secondary-channel: #3FBB3F;
  --mod3-primary-note: #B3FFB3;
  --mod3-secondary-note: #297C29;

  --mod4-primary-channel: #B266FF;
  --mod4-secondary-channel: #7F3DBB;
  --mod4-primary-note: #DAB3FF;
  --mod4-secondary-note: #55297C;

  --mod-label-primary: #FFD6AA;
  --mod-label-secondary-text: #1A0A00;
  --mod-label-primary-text: #773C00;
  --disabled-note-primary: #2C1A10;
  --disabled-note-secondary: #1A0E08;
}
`,

"FioletPower": `
:root {
  --page-margin: #5C2E7E;
  --editor-background: #12051C;
  --hover-preview: #B967FF;
  --playhead: #FF5CE8;
  --primary-text: #EBD0FF;
  --secondary-text: #C9A5F8;
  --inverted-text: #180C2C;
  --text-selection: #824C9F;
  --box-selection-fill: #672C91;
  --loop-accent: #A14DD3;
  --link-accent: #B25CFF;
  --ui-widget-background: #2D103F;
  --ui-widget-focus: #B45AFF;
  --pitch-background: #1D0B2A;
  --tonic: #9D4FE9;
  --fifth-note: #823CC8;
  --white-piano-key-color: #0B0012;
  --black-piano-key-color: #F5E6FF;
  --white-piano-key: #4A2A6D;
  --black-piano-key: #12051C;
  --use-color-formula: false;
  --track-editor-bg-pitch: #32114D;
  --track-editor-bg-pitch-dim: #2B0D42;
  --track-editor-bg-noise: #3B1657;
  --track-editor-bg-noise-dim: #2E0D44;
  --track-editor-bg-mod: #462063;
  --track-editor-bg-mod-dim: #2A0F38;
  --multiplicative-mod-slider: #C678F7;
  --overwriting-mod-slider: #AC4AE0;
  --indicator-primary: #D68BFF;
  --indicator-secondary: #9B4CD6;
  --select2-opt-group: #822EA9;
  --input-box-outline: #A446D1;
  --mute-button-normal: #D3B8F1;
  --mute-button-mod: #E6C7FF;

  /* pitch */
  --pitch1-primary-channel: #9B30FF;
  --pitch1-secondary-channel: #7B25D1;
  --pitch1-primary-note: #C285FF;
  --pitch1-secondary-note: #692A9C;

  --pitch2-primary-channel: #C24DFF;
  --pitch2-secondary-channel: #9D30D1;
  --pitch2-primary-note: #E89BFF;
  --pitch2-secondary-note: #7A2C9C;

  --pitch3-primary-channel: #F76AFF;
  --pitch3-secondary-channel: #D34ED1;
  --pitch3-primary-note: #FFB3FF;
  --pitch3-secondary-note: #A144A0;

  --pitch4-primary-channel: #FF79C6;
  --pitch4-secondary-channel: #D743A3;
  --pitch4-primary-note: #FFB2E8;
  --pitch4-secondary-note: #8C3C70;

  --pitch5-primary-channel: #FF79A8;
  --pitch5-secondary-channel: #D74285;
  --pitch5-primary-note: #FFB0D5;
  --pitch5-secondary-note: #7A2C55;

  --pitch6-primary-channel: #8C6AFF;
  --pitch6-secondary-channel: #6549D1;
  --pitch6-primary-note: #BDAAFF;
  --pitch6-secondary-note: #4A2C9C;

  --pitch7-primary-channel: #6A7EFF;
  --pitch7-secondary-channel: #495FD1;
  --pitch7-primary-note: #AABEFF;
  --pitch7-secondary-note: #2C3E9C;

  --pitch8-primary-channel: #5C9BFF;
  --pitch8-secondary-channel: #3C7AD1;
  --pitch8-primary-note: #90BFFF;
  --pitch8-secondary-note: #2A549C;

  --pitch9-primary-channel: #79FFF5;
  --pitch9-secondary-channel: #4DCCC1;
  --pitch9-primary-note: #AAFFFA;
  --pitch9-secondary-note: #44A29D;

  --pitch10-primary-channel: #99FFCC;
  --pitch10-secondary-channel: #66DDAA;
  --pitch10-primary-note: #BBFFDD;
  --pitch10-secondary-note: #44A477;

  /* noise */
  --noise1-primary-channel: #C25CD3;
  --noise1-secondary-channel: #9B3C9C;
  --noise1-primary-note: #E897FF;
  --noise1-secondary-note: #7A2A6A;

  --noise2-primary-channel: #9C5CF0;
  --noise2-secondary-channel: #6A3CA3;
  --noise2-primary-note: #C797FF;
  --noise2-secondary-note: #502A7A;

  --noise3-primary-channel: #C05CFF;
  --noise3-secondary-channel: #8D3CA3;
  --noise3-primary-note: #DBA0FF;
  --noise3-secondary-note: #6A2A7A;

  --noise4-primary-channel: #8C5CF0;
  --noise4-secondary-channel: #623CA3;
  --noise4-primary-note: #B897FF;
  --noise4-secondary-note: #452A7A;

  --noise5-primary-channel: #6A4CFF;
  --noise5-secondary-channel: #4D39D1;
  --noise5-primary-note: #9C8CFF;
  --noise5-secondary-note: #3C2C9C;

  /* mod */
  --mod1-primary-channel: #C867FF;
  --mod1-secondary-channel: #A044C6;
  --mod1-primary-note: #E4B2FF;
  --mod1-secondary-note: #823C9C;

  --mod2-primary-channel: #A267FF;
  --mod2-secondary-channel: #7B44C6;
  --mod2-primary-note: #CBB2FF;
  --mod2-secondary-note: #5F3C9C;

  --mod3-primary-channel: #67A0FF;
  --mod3-secondary-channel: #4481C6;
  --mod3-primary-note: #B2CEFF;
  --mod3-secondary-note: #3C589C;

  --mod4-primary-channel: #67FFD5;
  --mod4-secondary-channel: #44C6A3;
  --mod4-primary-note: #B2FFEB;
  --mod4-secondary-note: #3C9C80;

  --mod-label-primary: #F2E0FF;
  --mod-label-secondary-text: #14091E;
  --mod-label-primary-text: #D6A9FF;
  --disabled-note-primary: #201424;
  --disabled-note-secondary: #0A060C;
}
`,

    	
"DreamyPink": `
:root {
  --page-margin: #ffe0f0;
  --editor-background: #fff8fa;
  --hover-preview: #ffcce5;
  --playhead: #ff99cc;
  --primary-text: #704070;
  --secondary-text: #a06699;
  --inverted-text: #fff5f9;
  --text-selection: #ffd9ec;
  --box-selection-fill: #aae6f2;
  --loop-accent: #ffb3d9;
  --link-accent: #ff80bf;
  --ui-widget-background: #ffb3d9;
  --ui-widget-focus: #ffb3d9;
  --pitch-background: #fff0f5;
  --tonic: #ff99cc;
  --fifth-note: #ffb3d9;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #ffecf5;
  --black-piano-key: #d9aacc;
  --use-color-formula: false;
  --track-editor-bg-pitch: #ffe6f2;
  --track-editor-bg-pitch-dim: #f5d1e6;
  --track-editor-bg-noise: #fce0ec;
  --track-editor-bg-noise-dim: #f0c5db;
  --track-editor-bg-mod: #f8d3e2;
  --track-editor-bg-mod-dim: #eebad1;
  --multiplicative-mod-slider: #ffaad4;
  --overwriting-mod-slider: #ff99cc;
  --indicator-primary: #ff66b2;
  --indicator-secondary: #ff85c1;
  --select2-opt-group: #ff99cc;
  --input-box-outline: #ff80bf;
  --mute-button-normal: #ffd9ec;
  --mute-button-mod: #ffe0f0;

  /* pitch */
  --pitch1-primary-channel: #ffb3c6;
  --pitch1-secondary-channel: #ffa3b6;
  --pitch1-primary-note: #ffe6ec;
  --pitch1-secondary-note: #ffccd9;

  --pitch2-primary-channel: #ffdfb3;
  --pitch2-secondary-channel: #ffd699;
  --pitch2-primary-note: #fff2e6;
  --pitch2-secondary-note: #ffe0cc;

  --pitch3-primary-channel: #d0ffcc;
  --pitch3-secondary-channel: #b2ffb2;
  --pitch3-primary-note: #f0fff0;
  --pitch3-secondary-note: #ccffcc;

  --pitch4-primary-channel: #ccf2ff;
  --pitch4-secondary-channel: #b3ecff;
  --pitch4-primary-note: #e6faff;
  --pitch4-secondary-note: #cceeff;

  --pitch5-primary-channel: #d9ccff;
  --pitch5-secondary-channel: #c2b3ff;
  --pitch5-primary-note: #f0e6ff;
  --pitch5-secondary-note: #dccfff;

  --pitch6-primary-channel: #ffcce6;
  --pitch6-secondary-channel: #ffb3d9;
  --pitch6-primary-note: #ffe6f2;
  --pitch6-secondary-note: #ffccdf;

  --pitch7-primary-channel: #ffffcc;
  --pitch7-secondary-channel: #ffffb3;
  --pitch7-primary-note: #ffffe6;
  --pitch7-secondary-note: #ffffcc;

  --pitch8-primary-channel: #e6f9ff;
  --pitch8-secondary-channel: #ccf2ff;
  --pitch8-primary-note: #f2fcff;
  --pitch8-secondary-note: #d6f8ff;

  --pitch9-primary-channel: #ffe6cc;
  --pitch9-secondary-channel: #ffd1b3;
  --pitch9-primary-note: #fff2e6;
  --pitch9-secondary-note: #ffe6cc;

  --pitch10-primary-channel: #ffc2e2;
  --pitch10-secondary-channel: #ffaad4;
  --pitch10-primary-note: #ffe5f1;
  --pitch10-secondary-note: #ffccdf;

  /* noise */
  --noise1-primary-channel: #ffb3c6;
  --noise1-secondary-channel: #ffa3b6;
  --noise1-primary-note: #ffe6ec;
  --noise1-secondary-note: #ffcce0;

  --noise2-primary-channel: #ffe0b3;
  --noise2-secondary-channel: #ffd699;
  --noise2-primary-note: #fff5e6;
  --noise2-secondary-note: #ffeacc;

  --noise3-primary-channel: #d0ffcc;
  --noise3-secondary-channel: #b3ffb3;
  --noise3-primary-note: #f0fff0;
  --noise3-secondary-note: #ccffcc;

  --noise4-primary-channel: #b3f2ff;
  --noise4-secondary-channel: #99ebff;
  --noise4-primary-note: #e0faff;
  --noise4-secondary-note: #c0f0ff;

  --noise5-primary-channel: #e6d9ff;
  --noise5-secondary-channel: #d1c2ff;
  --noise5-primary-note: #f2eaff;
  --noise5-secondary-note: #e0d4ff;

  /* mod */
  --mod1-primary-channel: #ffcce6;
  --mod1-secondary-channel: #ffb3d9;
  --mod1-primary-note: #ffe6f2;
  --mod1-secondary-note: #ffccdf;

  --mod2-primary-channel: #ffdfb3;
  --mod2-secondary-channel: #ffd699;
  --mod2-primary-note: #fff2e6;
  --mod2-secondary-note: #ffe0cc;

  --mod3-primary-channel: #ccffcc;
  --mod3-secondary-channel: #b2ffb2;
  --mod3-primary-note: #f0fff0;
  --mod3-secondary-note: #ccffcc;

  --mod4-primary-channel: #ccf2ff;
  --mod4-secondary-channel: #b3ecff;
  --mod4-primary-note: #e6faff;
  --mod4-secondary-note: #cceeff;

  --mod-label-primary: #fff0f8;
  --mod-label-secondary-text: #704070;
  --mod-label-primary-text: #a06699;
  --disabled-note-primary: #f0e0e8;
  --disabled-note-secondary: #e0cbd9;
}
`,
"Rock": `
:root {
  --page-margin: #3e3e3e;
  --editor-background: #1c1c1c;
  --hover-preview: #585858;
  --playhead: #a64242;
  --primary-text: #e0e0e0;
  --secondary-text: #a0a0a0;
  --inverted-text: #111111;
  --text-selection: #444444;
  --box-selection-fill: #333333;
  --loop-accent: #8e2e2e;
  --link-accent: #ac5c5c;
  --ui-widget-background: #292929;
  --ui-widget-focus: #5c2c2c;
  --pitch-background: #2a2a2a;
  --tonic: #703535;
  --fifth-note: #593030;
  --white-piano-key-color: #aaa;
  --black-piano-key-color: #eee;
  --white-piano-key: #3b3b3b;
  --black-piano-key: #1e1e1e;
  --use-color-formula: false;
  --track-editor-bg-pitch: #303030;
  --track-editor-bg-pitch-dim: #262626;
  --track-editor-bg-noise: #353535;
  --track-editor-bg-noise-dim: #2c2c2c;
  --track-editor-bg-mod: #403030;
  --track-editor-bg-mod-dim: #372727;
  --multiplicative-mod-slider: #804040;
  --overwriting-mod-slider: #a65252;
  --indicator-primary: #b95c5c;
  --indicator-secondary: #734343;
  --select2-opt-group: #642828;
  --input-box-outline: #a64646;
  --mute-button-normal: #555;
  --mute-button-mod: #666;

  /* pitch */
  --pitch1-primary-channel: #995555;
  --pitch1-secondary-channel: #7a3a3a;
  --pitch1-primary-note: #c06c6c;
  --pitch1-secondary-note: #5a2a2a;

  --pitch2-primary-channel: #998555;
  --pitch2-secondary-channel: #7a693a;
  --pitch2-primary-note: #c0a26c;
  --pitch2-secondary-note: #5a492a;

  --pitch3-primary-channel: #799955;
  --pitch3-secondary-channel: #5a7a3a;
  --pitch3-primary-note: #a5c06c;
  --pitch3-secondary-note: #3a5a2a;

  --pitch4-primary-channel: #55997a;
  --pitch4-secondary-channel: #3a7a63;
  --pitch4-primary-note: #6cc0a2;
  --pitch4-secondary-note: #2a5a4c;

  --pitch5-primary-channel: #557a99;
  --pitch5-secondary-channel: #3a5a7a;
  --pitch5-primary-note: #6ca5c0;
  --pitch5-secondary-note: #2a3e5a;

  --pitch6-primary-channel: #665599;
  --pitch6-secondary-channel: #4f3a7a;
  --pitch6-primary-note: #8b6cc0;
  --pitch6-secondary-note: #382a5a;

  --pitch7-primary-channel: #8a5599;
  --pitch7-secondary-channel: #6f3a7a;
  --pitch7-primary-note: #b06cc0;
  --pitch7-secondary-note: #502a5a;

  --pitch8-primary-channel: #995570;
  --pitch8-secondary-channel: #7a3a5a;
  --pitch8-primary-note: #c06c99;
  --pitch8-secondary-note: #5a2a3e;

  --pitch9-primary-channel: #aa5540;
  --pitch9-secondary-channel: #803a2c;
  --pitch9-primary-note: #c06c5a;
  --pitch9-secondary-note: #5a2a1c;

  --pitch10-primary-channel: #aaaa55;
  --pitch10-secondary-channel: #7a7a3a;
  --pitch10-primary-note: #c0c06c;
  --pitch10-secondary-note: #5a5a2a;

  /* noise */
  --noise1-primary-channel: #a65555;
  --noise1-secondary-channel: #7a3a3a;
  --noise1-primary-note: #c06c6c;
  --noise1-secondary-note: #5a2a2a;

  --noise2-primary-channel: #a67c55;
  --noise2-secondary-channel: #7a5a3a;
  --noise2-primary-note: #c08f6c;
  --noise2-secondary-note: #5a402a;

  --noise3-primary-channel: #88a655;
  --noise3-secondary-channel: #667a3a;
  --noise3-primary-note: #a6c06c;
  --noise3-secondary-note: #4a5a2a;

  --noise4-primary-channel: #55a67a;
  --noise4-secondary-channel: #3a7a5a;
  --noise4-primary-note: #6cc0a2;
  --noise4-secondary-note: #2a5a4c;

  --noise5-primary-channel: #558aa6;
  --noise5-secondary-channel: #3a6a7a;
  --noise5-primary-note: #6ca0c0;
  --noise5-secondary-note: #2a4a5a;

  /* mod */
  --mod1-primary-channel: #664040;
  --mod1-secondary-channel: #503030;
  --mod1-primary-note: #8c5c5c;
  --mod1-secondary-note: #3c2020;

  --mod2-primary-channel: #665540;
  --mod2-secondary-channel: #504430;
  --mod2-primary-note: #8c6c5c;
  --mod2-secondary-note: #3c3020;

  --mod3-primary-channel: #406640;
  --mod3-secondary-channel: #305030;
  --mod3-primary-note: #5c8c5c;
  --mod3-secondary-note: #203c20;

  --mod4-primary-channel: #404066;
  --mod4-secondary-channel: #303050;
  --mod4-primary-note: #5c5c8c;
  --mod4-secondary-note: #20203c;

  --mod-label-primary: #aaaaaa;
  --mod-label-secondary-text: #222222;
  --mod-label-primary-text: #eeeeee;
  --disabled-note-primary: #1a1a1a;
  --disabled-note-secondary: #0f0f0f;
}
`,

    	
    	"Void": `
:root {
  --page-margin: #0a0a1a;
  --editor-background: #0e0b20;
  --hover-preview: #7b00ff;
  --playhead: #aa00ff;
  --primary-text: #ccccff;
  --secondary-text: #9999cc;
  --inverted-text: #1a0033;
  --text-selection: #aa66ff;
  --box-selection-fill: #330066;
  --loop-accent: #8000ff;
  --link-accent: #6600cc;
  --ui-widget-background: #1a0033;
  --ui-widget-focus: #9933ff;
  --pitch-background: #140a33;
  --tonic: #9900cc;
  --fifth-note: #7a00b3;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #553377;
  --black-piano-key: #1c0c2e;
  --use-color-formula: false;
  --track-editor-bg-pitch: #2a0055;
  --track-editor-bg-pitch-dim: #1c0040;
  --track-editor-bg-noise: #1a0033;
  --track-editor-bg-noise-dim: #2a1a3d;
  --track-editor-bg-mod: #33004d;
  --track-editor-bg-mod-dim: #3d2a5c;
  --multiplicative-mod-slider: #b366ff;
  --overwriting-mod-slider: #9955ff;
  --indicator-primary: #cc66ff;
  --indicator-secondary: #9933cc;
  --select2-opt-group: #5a00a3;
  --input-box-outline: #aa33ff;
  --mute-button-normal: #d1c2ff;
  --mute-button-mod: #bbaaff;

  /* pitch */
  --pitch1-primary-channel: #5500aa;
  --pitch1-secondary-channel: #440088;
  --pitch1-primary-note: #aa88ff;
  --pitch1-secondary-note: #7733cc;

  --pitch2-primary-channel: #005577;
  --pitch2-secondary-channel: #004455;
  --pitch2-primary-note: #66ccff;
  --pitch2-secondary-note: #337799;

  --pitch3-primary-channel: #007744;
  --pitch3-secondary-channel: #005533;
  --pitch3-primary-note: #66ffcc;
  --pitch3-secondary-note: #339977;

  --pitch4-primary-channel: #444444;
  --pitch4-secondary-channel: #333333;
  --pitch4-primary-note: #999999;
  --pitch4-secondary-note: #666666;

  --pitch5-primary-channel: #990033;
  --pitch5-secondary-channel: #660022;
  --pitch5-primary-note: #ff6699;
  --pitch5-secondary-note: #cc3366;

  --pitch6-primary-channel: #222266;
  --pitch6-secondary-channel: #1a1a4d;
  --pitch6-primary-note: #6666ff;
  --pitch6-secondary-note: #4444aa;

  --pitch7-primary-channel: #330066;
  --pitch7-secondary-channel: #220044;
  --pitch7-primary-note: #9966ff;
  --pitch7-secondary-note: #6633cc;

  --pitch8-primary-channel: #550055;
  --pitch8-secondary-channel: #330033;
  --pitch8-primary-note: #cc66cc;
  --pitch8-secondary-note: #993399;

  --pitch9-primary-channel: #111111;
  --pitch9-secondary-channel: #000000;
  --pitch9-primary-note: #333333;
  --pitch9-secondary-note: #1a1a1a;

  --pitch10-primary-channel: #003344;
  --pitch10-secondary-channel: #001f2e;
  --pitch10-primary-note: #5599aa;
  --pitch10-secondary-note: #336677;

  /* noise */
  --noise1-primary-channel: #550077;
  --noise1-secondary-channel: #330055;
  --noise1-primary-note: #aa66cc;
  --noise1-secondary-note: #774499;

  --noise2-primary-channel: #003355;
  --noise2-secondary-channel: #001f33;
  --noise2-primary-note: #6699cc;
  --noise2-secondary-note: #336688;

  --noise3-primary-channel: #555555;
  --noise3-secondary-channel: #333333;
  --noise3-primary-note: #999999;
  --noise3-secondary-note: #666666;

  --noise4-primary-channel: #220022;
  --noise4-secondary-channel: #110011;
  --noise4-primary-note: #774477;
  --noise4-secondary-note: #552255;

  --noise5-primary-channel: #222244;
  --noise5-secondary-channel: #1a1a33;
  --noise5-primary-note: #666699;
  --noise5-secondary-note: #444466;

  /* mod */
  --mod1-primary-channel: #660099;
  --mod1-secondary-channel: #440066;
  --mod1-primary-note: #bb66ff;
  --mod1-secondary-note: #9944cc;

  --mod2-primary-channel: #004466;
  --mod2-secondary-channel: #002233;
  --mod2-primary-note: #66aaff;
  --mod2-secondary-note: #3377aa;

  --mod3-primary-channel: #333333;
  --mod3-secondary-channel: #1a1a1a;
  --mod3-primary-note: #888888;
  --mod3-secondary-note: #555555;

  --mod4-primary-channel: #770066;
  --mod4-secondary-channel: #550044;
  --mod4-primary-note: #cc66aa;
  --mod4-secondary-note: #993377;

  --mod-label-primary: #eeeeff;
  --mod-label-secondary-text: #0d0d1a;
  --mod-label-primary-text: #5a3399;
  --disabled-note-primary: #0f0f0f;
  --disabled-note-secondary: #080808;
}
`,

 "Inferno": `
 
:root {
  --page-margin: #3d0000;
  --editor-background: #1a0000;
  --hover-preview: #ff4d00;
  --playhead: #ff0000;
  --primary-text: #ffcccc;
  --secondary-text: #ff9999;
  --inverted-text: #330000;
  --text-selection: #ff4444;
  --box-selection-fill: #990000;
  --loop-accent: #ff1a1a;
  --link-accent: #ff3300;
  --ui-widget-background: #300000;
  --ui-widget-focus: #cc0000;
  --pitch-background: #2a0000;
  --tonic: #ff0000;
  --fifth-note: #cc0000;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #ff9999;
  --black-piano-key: #1a0000;
  --use-color-formula: false;
  --track-editor-bg-pitch: #800000;
  --track-editor-bg-pitch-dim: #5c0000;
  --track-editor-bg-noise: #660000;
  --track-editor-bg-noise-dim: #4d0000;
  --track-editor-bg-mod: #7a0000;
  --track-editor-bg-mod-dim: #520000;
  --multiplicative-mod-slider: #ff4d4d;
  --overwriting-mod-slider: #ff1a1a;
  --indicator-primary: #ff3300;
  --indicator-secondary: #cc1a00;
  --select2-opt-group: #b30000;
  --input-box-outline: #ff4d4d;
  --mute-button-normal: #ffcccc;
  --mute-button-mod: #ff9999;

  /* pitch */
  --pitch1-primary-channel: #ff4d4d;
  --pitch1-secondary-channel: #ff1a1a;
  --pitch1-primary-note: #ff9999;
  --pitch1-secondary-note: #cc4444;

  --pitch2-primary-channel: #ff9933;
  --pitch2-secondary-channel: #ff6600;
  --pitch2-primary-note: #ffcc99;
  --pitch2-secondary-note: #cc7744;

  --pitch3-primary-channel: #ffff66;
  --pitch3-secondary-channel: #ffcc00;
  --pitch3-primary-note: #ffffaa;
  --pitch3-secondary-note: #999933;

  --pitch4-primary-channel: #ffb366;
  --pitch4-secondary-channel: #ff944d;
  --pitch4-primary-note: #ffd9b3;
  --pitch4-secondary-note: #bb7744;

  --pitch5-primary-channel: #ff6b6b;
  --pitch5-secondary-channel: #ff3333;
  --pitch5-primary-note: #ffaaaa;
  --pitch5-secondary-note: #bb4444;

  --pitch6-primary-channel: #b30000;
  --pitch6-secondary-channel: #800000;
  --pitch6-primary-note: #ff6666;
  --pitch6-secondary-note: #992222;

  --pitch7-primary-channel: #99004d;
  --pitch7-secondary-channel: #800040;
  --pitch7-primary-note: #ff99cc;
  --pitch7-secondary-note: #bb4488;

  --pitch8-primary-channel: #cc0066;
  --pitch8-secondary-channel: #99004d;
  --pitch8-primary-note: #ff99bb;
  --pitch8-secondary-note: #bb4477;

  --pitch9-primary-channel: #ff3300;
  --pitch9-secondary-channel: #cc2900;
  --pitch9-primary-note: #ffb399;
  --pitch9-secondary-note: #993322;

  --pitch10-primary-channel: #ff6600;
  --pitch10-secondary-channel: #cc5200;
  --pitch10-primary-note: #ffc299;
  --pitch10-secondary-note: #995522;

  /* noise */
  --noise1-primary-channel: #b30000;
  --noise1-secondary-channel: #800000;
  --noise1-primary-note: #ff6666;
  --noise1-secondary-note: #992222;

  --noise2-primary-channel: #ff9933;
  --noise2-secondary-channel: #ff6600;
  --noise2-primary-note: #ffd6aa;
  --noise2-secondary-note: #bb7733;

  --noise3-primary-channel: #ffee33;
  --noise3-secondary-channel: #ffcc00;
  --noise3-primary-note: #ffffaa;
  --noise3-secondary-note: #999933;

  --noise4-primary-channel: #ff4d4d;
  --noise4-secondary-channel: #cc0000;
  --noise4-primary-note: #ffaaaa;
  --noise4-secondary-note: #994444;

  --noise5-primary-channel: #ff6600;
  --noise5-secondary-channel: #cc3300;
  --noise5-primary-note: #ffbb99;
  --noise5-secondary-note: #aa5533;

  /* mod */
  --mod1-primary-channel: #ff3333;
  --mod1-secondary-channel: #cc1a1a;
  --mod1-primary-note: #ffaaaa;
  --mod1-secondary-note: #994444;

  --mod2-primary-channel: #cc3300;
  --mod2-secondary-channel: #991a00;
  --mod2-primary-note: #ffbb99;
  --mod2-secondary-note: #993322;

  --mod3-primary-channel: #800000;
  --mod3-secondary-channel: #4d0000;
  --mod3-primary-note: #cc6666;
  --mod3-secondary-note: #662222;

  --mod4-primary-channel: #ff1a1a;
  --mod4-secondary-channel: #cc0000;
  --mod4-primary-note: #ff9999;
  --mod4-secondary-note: #993333;

  --mod-label-primary: #fff0f0;
  --mod-label-secondary-text: #330000;
  --mod-label-primary-text: #770000;
  --disabled-note-primary: #1a0a0a;
  --disabled-note-secondary: #0d0000;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0) 60%,
    rgba(255, 255, 0, 0.1) 75%,
    rgba(255, 255, 0, 0.2) 85%,
    rgba(255, 255, 0, 0.3) 95%,
    rgba(255, 255, 0, 0.4) 100%
  );
  animation: yellowGlow 6s ease-in-out infinite;
  backdrop-filter: blur(6px);
}
@keyframes yellowGlow {
  0%   { opacity: 0.1; }
  50%  { opacity: 0.35; }
  100% { opacity: 0.1; }
}


`,

"Synthwave": `
:root {
  --page-margin: #2d004d;
  --editor-background: #0d0b1a;
  --hover-preview: #ff6ec7;
  --playhead: #ff00ff;
  --primary-text: #ffe0ff;
  --secondary-text: #ff99ff;
  --inverted-text: #1a001f;
  --text-selection: #ff66c4;
  --box-selection-fill: #aa33ff;
  --loop-accent: #ff00aa;
  --link-accent: #d94dff;
  --ui-widget-background: #300033;
  --ui-widget-focus: #9900cc;
  --pitch-background: #1a0033;
  --tonic: #6600ff;
  --fifth-note: #9900ff;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #d1b3ff;
  --black-piano-key: #190033;
  --use-color-formula: false;
  --track-editor-bg-pitch: #47006b;
  --track-editor-bg-pitch-dim: #3b005a;
  --track-editor-bg-noise: #36004d;
  --track-editor-bg-noise-dim: #2b0044;
  --track-editor-bg-mod: #4a0066;
  --track-editor-bg-mod-dim: #3a0052;
  --multiplicative-mod-slider: #cc66ff;
  --overwriting-mod-slider: #9933ff;
  --indicator-primary: #ff33cc;
  --indicator-secondary: #cc33aa;
  --select2-opt-group: #aa00ff;
  --input-box-outline: #cc33ff;
  --mute-button-normal: #ffccff;
  --mute-button-mod: #ffccf2;

  /* pitch */
  --pitch1-primary-channel: #ff4d6d;
  --pitch1-secondary-channel: #ff003c;
  --pitch1-primary-note: #ff99aa;
  --pitch1-secondary-note: #cc4466;

  --pitch2-primary-channel: #ffa94d;
  --pitch2-secondary-channel: #ff7300;
  --pitch2-primary-note: #ffd6aa;
  --pitch2-secondary-note: #bb7744;

  --pitch3-primary-channel: #ffee33;
  --pitch3-secondary-channel: #ffcc00;
  --pitch3-primary-note: #ffffaa;
  --pitch3-secondary-note: #999933;

  --pitch4-primary-channel: #33ffaa;
  --pitch4-secondary-channel: #00cc88;
  --pitch4-primary-note: #aaffcc;
  --pitch4-secondary-note: #339977;

  --pitch5-primary-channel: #33ffff;
  --pitch5-secondary-channel: #00ccff;
  --pitch5-primary-note: #aaffff;
  --pitch5-secondary-note: #3399aa;

  --pitch6-primary-channel: #6699ff;
  --pitch6-secondary-channel: #3366ff;
  --pitch6-primary-note: #aac8ff;
  --pitch6-secondary-note: #4466bb;

  --pitch7-primary-channel: #aa66ff;
  --pitch7-secondary-channel: #9933ff;
  --pitch7-primary-note: #d1aaff;
  --pitch7-secondary-note: #7744bb;

  --pitch8-primary-channel: #ff66ff;
  --pitch8-secondary-channel: #ff33cc;
  --pitch8-primary-note: #ffb3ff;
  --pitch8-secondary-note: #cc66bb;

  --pitch9-primary-channel: #ff6699;
  --pitch9-secondary-channel: #ff3377;
  --pitch9-primary-note: #ff99bb;
  --pitch9-secondary-note: #bb4466;

  --pitch10-primary-channel: #ffaa66;
  --pitch10-secondary-channel: #ff8844;
  --pitch10-primary-note: #ffd1aa;
  --pitch10-secondary-note: #bb7744;

  /* noise */
  --noise1-primary-channel: #ff4d6d;
  --noise1-secondary-channel: #ff003c;
  --noise1-primary-note: #ff99aa;
  --noise1-secondary-note: #cc4466;

  --noise2-primary-channel: #ffa94d;
  --noise2-secondary-channel: #ff7300;
  --noise2-primary-note: #ffd6aa;
  --noise2-secondary-note: #bb7744;

  --noise3-primary-channel: #ffee33;
  --noise3-secondary-channel: #ffcc00;
  --noise3-primary-note: #ffffaa;
  --noise3-secondary-note: #999933;

  --noise4-primary-channel: #33ffaa;
  --noise4-secondary-channel: #00cc88;
  --noise4-primary-note: #aaffcc;
  --noise4-secondary-note: #339977;

  --noise5-primary-channel: #33ffff;
  --noise5-secondary-channel: #00ccff;
  --noise5-primary-note: #aaffff;
  --noise5-secondary-note: #3399aa;

  /* mod */
  --mod1-primary-channel: #00ffd9;
  --mod1-secondary-channel: #00cccc;
  --mod1-primary-note: #aaffee;
  --mod1-secondary-note: #339999;

  --mod2-primary-channel: #0099ff;
  --mod2-secondary-channel: #0066ff;
  --mod2-primary-note: #aaccff;
  --mod2-secondary-note: #4466bb;

  --mod3-primary-channel: #cc66ff;
  --mod3-secondary-channel: #9933ff;
  --mod3-primary-note: #e0b3ff;
  --mod3-secondary-note: #8855cc;

  --mod4-primary-channel: #ff33cc;
  --mod4-secondary-channel: #ff00aa;
  --mod4-primary-note: #ffb3ee;
  --mod4-secondary-note: #cc66aa;

  --mod-label-primary: #ffe6ff;
  --mod-label-secondary-text: #331a33;
  --mod-label-primary-text: #661177;
  --disabled-note-primary: #1a1a1a;
  --disabled-note-secondary: #0d0d0d;
}
`,

"VintageSepia":`
:root {
  -webkit-text-stroke-width: 0.3px;
  --page-margin: #3B2B20;
  --editor-background: #2F251D;
  --hover-preview: #A97C50;
  --playhead: #C6A772;
  --primary-text: #F5E7D0;
  --secondary-text: #DCC3A3;
  --inverted-text: #1D130B;
  --text-selection: #A67B5B;
  --box-selection-fill: #D4B07C;
  --loop-accent: #C09C6B;
  --link-accent: #C9A874;
  --ui-widget-background: #4A3A2B;
  --ui-widget-focus: #D2A670;
  --pitch-background: #3C2E22;
  --tonic: #E7C78A;
  --fifth-note: #B89A6F;
  --white-piano-key-color: #1A130D;
  --black-piano-key-color: #F5E0BA;
  --white-piano-key: #D3BFA4;
  --black-piano-key: #2C2117;
  --use-color-formula: false;
  --track-editor-bg-pitch: #4E3A28;
  --track-editor-bg-pitch-dim: #453223;
  --track-editor-bg-noise: #594330;
  --track-editor-bg-noise-dim: #6E503A;
  --track-editor-bg-mod: #6A4F38;
  --track-editor-bg-mod-dim: #A17855;
  --multiplicative-mod-slider: #D6B88A;
  --overwriting-mod-slider: #B99870;
  --indicator-primary: #E0C38F;
  --indicator-secondary: #A37F54;
  --select2-opt-group: #916A45;
  --input-box-outline: #B38A5D;
  --mute-button-normal: #F5E8D3;
  --mute-button-mod: #F2DBB6;

  /* pitch */
  --pitch1-primary-channel: #D1A177;
  --pitch1-secondary-channel: #B07854;
  --pitch1-primary-note: #EAC3A0;
  --pitch1-secondary-note: #825C3C;

  --pitch2-primary-channel: #D1B177;
  --pitch2-secondary-channel: #B89C54;
  --pitch2-primary-note: #EAD7A0;
  --pitch2-secondary-note: #847B3C;

  --pitch3-primary-channel: #C4AD82;
  --pitch3-secondary-channel: #A3945F;
  --pitch3-primary-note: #E4D5B0;
  --pitch3-secondary-note: #776743;

  --pitch4-primary-channel: #B79D77;
  --pitch4-secondary-channel: #9C7F54;
  --pitch4-primary-note: #DDC4A0;
  --pitch4-secondary-note: #6A553C;

  --pitch5-primary-channel: #A88566;
  --pitch5-secondary-channel: #8F6B45;
  --pitch5-primary-note: #D2B295;
  --pitch5-secondary-note: #5F4733;

  --pitch6-primary-channel: #987657;
  --pitch6-secondary-channel: #77563C;
  --pitch6-primary-note: #C9A88A;
  --pitch6-secondary-note: #4F3928;

  --pitch7-primary-channel: #8C674A;
  --pitch7-secondary-channel: #6E4D35;
  --pitch7-primary-note: #BF9C7C;
  --pitch7-secondary-note: #422E22;

  --pitch8-primary-channel: #805B40;
  --pitch8-secondary-channel: #65422F;
  --pitch8-primary-note: #B79070;
  --pitch8-secondary-note: #392619;

  --pitch9-primary-channel: #755038;
  --pitch9-secondary-channel: #593C29;
  --pitch9-primary-note: #AD8367;
  --pitch9-secondary-note: #2F1F14;

  --pitch10-primary-channel: #6A4631;
  --pitch10-secondary-channel: #4E3424;
  --pitch10-primary-note: #A2785C;
  --pitch10-secondary-note: #25160D;

  /* noise */
  --noise1-primary-channel: #C0946E;
  --noise1-secondary-channel: #A0704B;
  --noise1-primary-note: #DFBA97;
  --noise1-secondary-note: #7B5335;

  --noise2-primary-channel: #D1B077;
  --noise2-secondary-channel: #B18F54;
  --noise2-primary-note: #E9D09D;
  --noise2-secondary-note: #826C3C;

  --noise3-primary-channel: #C2A66E;
  --noise3-secondary-channel: #9E7C4B;
  --noise3-primary-note: #DEC298;
  --noise3-secondary-note: #735835;

  --noise4-primary-channel: #A9835F;
  --noise4-secondary-channel: #876140;
  --noise4-primary-note: #CDA486;
  --noise4-secondary-note: #60462F;

  --noise5-primary-channel: #977351;
  --noise5-secondary-channel: #745434;
  --noise5-primary-note: #BE977D;
  --noise5-secondary-note: #4C3927;

  /* mod */
  --mod1-primary-channel: #B68C66;
  --mod1-secondary-channel: #926946;
  --mod1-primary-note: #DAB79B;
  --mod1-secondary-note: #6B4831;

  --mod2-primary-channel: #A0805F;
  --mod2-secondary-channel: #7F6146;
  --mod2-primary-note: #C9A58C;
  --mod2-secondary-note: #5B3E2F;

  --mod3-primary-channel: #997B5B;
  --mod3-secondary-channel: #765C42;
  --mod3-primary-note: #C5A084;
  --mod3-secondary-note: #523A2A;

  --mod4-primary-channel: #8C6D4D;
  --mod4-secondary-channel: #6B5238;
  --mod4-primary-note: #B88F76;
  --mod4-secondary-note: #403226;

  --mod-label-primary: #F6E6C8;
  --mod-label-secondary-text: #2E2116;
  --mod-label-primary-text: #614A2E;
  --disabled-note-primary: #33261C;
  --disabled-note-secondary: #22170F;
}
`,
"TimeForVacation":`
:root {
  -webkit-text-stroke-width: 0.3px;
  --page-margin: #4AC6B7;
  --editor-background: #FFF5E1;
  --hover-preview: #FFBC91;
  --playhead: #FF7B54;
  --primary-text: #2A3D45;
  --secondary-text: #497C6D;
  --inverted-text: #FFFFFF;
  --text-selection: #FFD5A6;
  --box-selection-fill: #FFF0C2;
  --loop-accent: #FFAE00;
  --link-accent: #F78E69;
  --ui-widget-background: #E0F6F1;
  --ui-widget-focus: #FFBA88;
  --pitch-background: #FDEBD0;
  --tonic: #FF8C61;
  --fifth-note: #FFA85A;
  --white-piano-key-color: #423B36;
  --black-piano-key-color: #FFFFFF;
  --white-piano-key: #FFF6E3;
  --black-piano-key: #FDD69E;
  --use-color-formula: false;
  --track-editor-bg-pitch: #FFF0D6;
  --track-editor-bg-pitch-dim: #FAD7A0;
  --track-editor-bg-noise: #EAFCE5;
  --track-editor-bg-noise-dim: #CFF5D6;
  --track-editor-bg-mod: #D0F1FF;
  --track-editor-bg-mod-dim: #B4E9FF;
  --multiplicative-mod-slider: #89D4E6;
  --overwriting-mod-slider: #68C1D8;
  --indicator-primary: #FF9A76;
  --indicator-secondary: #FFCD9E;
  --select2-opt-group: #FFB067;
  --input-box-outline: #FF9E73;
  --mute-button-normal: #FDEBD0;
  --mute-button-mod: #F8D6B6;

  /* pitch */
  --pitch1-primary-channel: #FF9494;
  --pitch1-secondary-channel: #FF6B6B;
  --pitch1-primary-note: #FFD3D3;
  --pitch1-secondary-note: #B25555;

  --pitch2-primary-channel: #FFD37D;
  --pitch2-secondary-channel: #FFBB3F;
  --pitch2-primary-note: #FFEAB5;
  --pitch2-secondary-note: #B8963B;

  --pitch3-primary-channel: #AFFC9F;
  --pitch3-secondary-channel: #83F28F;
  --pitch3-primary-note: #D9FFD3;
  --pitch3-secondary-note: #68B861;

  --pitch4-primary-channel: #9FF9F9;
  --pitch4-secondary-channel: #64EDEB;
  --pitch4-primary-note: #CCFFFF;
  --pitch4-secondary-note: #50B7B5;

  --pitch5-primary-channel: #A8CFFF;
  --pitch5-secondary-channel: #7FB6FF;
  --pitch5-primary-note: #DAE8FF;
  --pitch5-secondary-note: #5E88C2;

  --pitch6-primary-channel: #D9A8FF;
  --pitch6-secondary-channel: #C57CFF;
  --pitch6-primary-note: #EDD9FF;
  --pitch6-secondary-note: #9E63C4;

  --pitch7-primary-channel: #FFA8E6;
  --pitch7-secondary-channel: #FF7BCF;
  --pitch7-primary-note: #FFD6F1;
  --pitch7-secondary-note: #B7639A;

  --pitch8-primary-channel: #FFB88A;
  --pitch8-secondary-channel: #FF8A54;
  --pitch8-primary-note: #FFE0C4;
  --pitch8-secondary-note: #C46E42;

  --pitch9-primary-channel: #FFF38A;
  --pitch9-secondary-channel: #FFEC54;
  --pitch9-primary-note: #FFFBD1;
  --pitch9-secondary-note: #C4B842;

  --pitch10-primary-channel: #A8FFEB;
  --pitch10-secondary-channel: #76FFD9;
  --pitch10-primary-note: #D6FFF6;
  --pitch10-secondary-note: #5CC7B4;

  /* noise */
  --noise1-primary-channel: #F6B89B;
  --noise1-secondary-channel: #F29872;
  --noise1-primary-note: #FFD6C2;
  --noise1-secondary-note: #BB6F52;

  --noise2-primary-channel: #F4D98B;
  --noise2-secondary-channel: #F1C852;
  --noise2-primary-note: #FFF3C8;
  --noise2-secondary-note: #A88A43;

  --noise3-primary-channel: #C6F69B;
  --noise3-secondary-channel: #9FF16B;
  --noise3-primary-note: #E2FFD1;
  --noise3-secondary-note: #7AB862;

  --noise4-primary-channel: #A6F1F6;
  --noise4-secondary-channel: #82EAF2;
  --noise4-primary-note: #D5FBFF;
  --noise4-secondary-note: #5DB3B7;

  --noise5-primary-channel: #A6C7F6;
  --noise5-secondary-channel: #7FAAF2;
  --noise5-primary-note: #D6E4FF;
  --noise5-secondary-note: #5985B8;

  /* mod */
  --mod1-primary-channel: #94E6C5;
  --mod1-secondary-channel: #6FDDB0;
  --mod1-primary-note: #C3F5E1;
  --mod1-secondary-note: #4CB893;

  --mod2-primary-channel: #94DFF6;
  --mod2-secondary-channel: #6ACCF2;
  --mod2-primary-note: #C6F1FF;
  --mod2-secondary-note: #519DBE;

  --mod3-primary-channel: #BFA6F6;
  --mod3-secondary-channel: #A37CF2;
  --mod3-primary-note: #E6D9FF;
  --mod3-secondary-note: #8160C0;

  --mod4-primary-channel: #F6A6D6;
  --mod4-secondary-channel: #F27CB7;
  --mod4-primary-note: #FFD6EE;
  --mod4-secondary-note: #B6608D;

  --mod-label-primary: #FFFAF0;
  --mod-label-secondary-text: #3A3A3A;
  --mod-label-primary-text: #FF835A;
  --disabled-note-primary: #D9CBBF;
  --disabled-note-secondary: #C7B8AA;
}
`, 

"WinterIsComing":`
:root {
  -webkit-text-stroke-width: 0.3px;
  --page-margin: #0B1B2B;
  --editor-background: #101C2E;
  --hover-preview: #3C5A75;
  --playhead: #A0C8FF;
  --primary-text: #E0F4FF;
  --secondary-text: #B3D7F0;
  --inverted-text: #0E1A24;
  --text-selection: #39556F;
  --box-selection-fill: #5078A1;
  --loop-accent: #7FB6FF;
  --link-accent: #A5D4FF;
  --ui-widget-background: #1A2C40;
  --ui-widget-focus: #3E6C91;
  --pitch-background: #132535;
  --tonic: #B7DAFF;
  --fifth-note: #89B6D6;
  --white-piano-key-color: #0D1B29;
  --black-piano-key-color: #EAF6FF;
  --white-piano-key: #D0E4F2;
  --black-piano-key: #1C2C3C;
  --use-color-formula: false;
  --track-editor-bg-pitch: #1B3550;
  --track-editor-bg-pitch-dim: #1A2F44;
  --track-editor-bg-noise: #1C3B58;
  --track-editor-bg-noise-dim: #2B4F6C;
  --track-editor-bg-mod: #2C4968;
  --track-editor-bg-mod-dim: #4A6C89;
  --multiplicative-mod-slider: #A0C8FF;
  --overwriting-mod-slider: #85B5E2;
  --indicator-primary: #A9D7FF;
  --indicator-secondary: #6C99B8;
  --select2-opt-group: #345066;
  --input-box-outline: #6699BB;
  --mute-button-normal: #E2F3FF;
  --mute-button-mod: #CDEBFF;

  /* pitch */
  --pitch1-primary-channel: #A6D9FF;
  --pitch1-secondary-channel: #7AB8E6;
  --pitch1-primary-note: #C6E7FF;
  --pitch1-secondary-note: #527D9A;

  --pitch2-primary-channel: #90C4F0;
  --pitch2-secondary-channel: #6CA2D3;
  --pitch2-primary-note: #B8DEF7;
  --pitch2-secondary-note: #4C7594;

  --pitch3-primary-channel: #78B0D6;
  --pitch3-secondary-channel: #568FB8;
  --pitch3-primary-note: #A7CCE7;
  --pitch3-secondary-note: #3A6C87;

  --pitch4-primary-channel: #6BA2C8;
  --pitch4-secondary-channel: #4A7CA5;
  --pitch4-primary-note: #9FC0DD;
  --pitch4-secondary-note: #325E7A;

  --pitch5-primary-channel: #5D92B7;
  --pitch5-secondary-channel: #3D6F89;
  --pitch5-primary-note: #8FB3D0;
  --pitch5-secondary-note: #2A526B;

  --pitch6-primary-channel: #4C819F;
  --pitch6-secondary-channel: #345E73;
  --pitch6-primary-note: #7AA5C2;
  --pitch6-secondary-note: #22475A;

  --pitch7-primary-channel: #3F6E89;
  --pitch7-secondary-channel: #2D5369;
  --pitch7-primary-note: #6991AD;
  --pitch7-secondary-note: #1B3B4B;

  --pitch8-primary-channel: #325C73;
  --pitch8-secondary-channel: #26475A;
  --pitch8-primary-note: #5A7D99;
  --pitch8-secondary-note: #152E3A;

  --pitch9-primary-channel: #26475A;
  --pitch9-secondary-channel: #1B3A49;
  --pitch9-primary-note: #4C6B83;
  --pitch9-secondary-note: #0F222E;

  --pitch10-primary-channel: #1C3441;
  --pitch10-secondary-channel: #12242D;
  --pitch10-primary-note: #3A5466;
  --pitch10-secondary-note: #0A151C;

  /* noise */
  --noise1-primary-channel: #A6D9FF;
  --noise1-secondary-channel: #7AB8E6;
  --noise1-primary-note: #C6E7FF;
  --noise1-secondary-note: #527D9A;

  --noise2-primary-channel: #90C4F0;
  --noise2-secondary-channel: #6CA2D3;
  --noise2-primary-note: #B8DEF7;
  --noise2-secondary-note: #4C7594;

  --noise3-primary-channel: #78B0D6;
  --noise3-secondary-channel: #568FB8;
  --noise3-primary-note: #A7CCE7;
  --noise3-secondary-note: #3A6C87;

  --noise4-primary-channel: #5D92B7;
  --noise4-secondary-channel: #3D6F89;
  --noise4-primary-note: #8FB3D0;
  --noise4-secondary-note: #2A526B;

  --noise5-primary-channel: #4C819F;
  --noise5-secondary-channel: #345E73;
  --noise5-primary-note: #7AA5C2;
  --noise5-secondary-note: #22475A;

  /* mod */
  --mod1-primary-channel: #7FC5E9;
  --mod1-secondary-channel: #5EAED9;
  --mod1-primary-note: #A8E0FA;
  --mod1-secondary-note: #3A84A9;

  --mod2-primary-channel: #6CB0D4;
  --mod2-secondary-channel: #4C94BB;
  --mod2-primary-note: #9BD4ED;
  --mod2-secondary-note: #2C6D8F;

  --mod3-primary-channel: #5C9DC0;
  --mod3-secondary-channel: #3E7CA3;
  --mod3-primary-note: #8AC2DD;
  --mod3-secondary-note: #255B75;

  --mod4-primary-channel: #4D8BAE;
  --mod4-secondary-channel: #346C8A;
  --mod4-primary-note: #7AB0CC;
  --mod4-secondary-note: #1E4A60;

  --mod-label-primary: #D5F4FF;
  --mod-label-secondary-text: #13212A;
  --mod-label-primary-text: #316D8A;
  --disabled-note-primary: #202F3C;
  --disabled-note-secondary: #101C2A;
}
`,
"Mirage": `
:root {
  -webkit-text-stroke-width: 0.5px;
  --page-margin: #3C3C5F;
  --editor-background: #181825;
  --hover-preview: #7FE4E4;
  --playhead: #9FF1F1;
  --primary-text: #D0F6FF;
  --secondary-text: #A3D9F5;
  --inverted-text: #0E1E2E;
  --text-selection: #3FA3C4;
  --box-selection-fill: #5AD1F5;
  --loop-accent: #5EEBEA;
  --link-accent: #67C3F3;
  --ui-widget-background: #23344A;
  --ui-widget-focus: #5EDFF2;
  --pitch-background: #1D2A3B;
  --tonic: #38D1F2;
  --fifth-note: #44B9FF;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #9FE4FF;
  --black-piano-key: #14202F;
  --use-color-formula: false;
  --track-editor-bg-pitch: #204B6F;
  --track-editor-bg-pitch-dim: #1B3C59;
  --track-editor-bg-noise: #265A75;
  --track-editor-bg-noise-dim: #2C6C85;
  --track-editor-bg-mod: #2F6D8A;
  --track-editor-bg-mod-dim: #70BFEF;
  --multiplicative-mod-slider: #5AD1F5;
  --overwriting-mod-slider: #3FBCE4;
  --indicator-primary: #71F4F9;
  --indicator-secondary: #48C0DB;
  --select2-opt-group: #42A8C7;
  --input-box-outline: #3A9BC9;
  --mute-button-normal: #DDF9FF;
  --mute-button-mod: #C9F3FF;

  /* pitch */
  --pitch1-primary-channel: #7FE8FF;
  --pitch1-secondary-channel: #4DDFFF;
  --pitch1-primary-note: #AAEFFC;
  --pitch1-secondary-note: #44B3BB;

  --pitch2-primary-channel: #7FBEFF;
  --pitch2-secondary-channel: #4D98FF;
  --pitch2-primary-note: #AAD7FF;
  --pitch2-secondary-note: #4473BB;

  --pitch3-primary-channel: #9D79FF;
  --pitch3-secondary-channel: #6F4DFF;
  --pitch3-primary-note: #C3AAFF;
  --pitch3-secondary-note: #6A44BB;

  --pitch4-primary-channel: #FF79EC;
  --pitch4-secondary-channel: #FF4DD0;
  --pitch4-primary-note: #FFA8F3;
  --pitch4-secondary-note: #BB44A5;

  --pitch5-primary-channel: #FF799A;
  --pitch5-secondary-channel: #FF4D8B;
  --pitch5-primary-note: #FFAAC3;
  --pitch5-secondary-note: #BB4470;

  --pitch6-primary-channel: #FFD279;
  --pitch6-secondary-channel: #FFC04D;
  --pitch6-primary-note: #FFEAAA;
  --pitch6-secondary-note: #BB9B44;

  --pitch7-primary-channel: #C5FF79;
  --pitch7-secondary-channel: #AFFF4D;
  --pitch7-primary-note: #E6FFAA;
  --pitch7-secondary-note: #93BB44;

  --pitch8-primary-channel: #79FFC8;
  --pitch8-secondary-channel: #4DFFBA;
  --pitch8-primary-note: #AAFFE5;
  --pitch8-secondary-note: #44BB9E;

  --pitch9-primary-channel: #79F0FF;
  --pitch9-secondary-channel: #4DDAFF;
  --pitch9-primary-note: #AAEFFF;
  --pitch9-secondary-note: #44A0BB;

  --pitch10-primary-channel: #ADB5FF;
  --pitch10-secondary-channel: #94A1FF;
  --pitch10-primary-note: #D1D4FF;
  --pitch10-secondary-note: #6F73BB;

  /* noise */
  --noise1-primary-channel: #78C8FF;
  --noise1-secondary-channel: #4DB9FF;
  --noise1-primary-note: #A7E5FF;
  --noise1-secondary-note: #4599BB;

  --noise2-primary-channel: #79E8FF;
  --noise2-secondary-channel: #4DE2FF;
  --noise2-primary-note: #AAF1FF;
  --noise2-secondary-note: #44AABB;

  --noise3-primary-channel: #79FFF1;
  --noise3-secondary-channel: #4DFFEA;
  --noise3-primary-note: #AAFFF5;
  --noise3-secondary-note: #44BBA7;

  --noise4-primary-channel: #B4FF79;
  --noise4-secondary-channel: #9AFF4D;
  --noise4-primary-note: #DAFFAA;
  --noise4-secondary-note: #93BB44;

  --noise5-primary-channel: #FF79C1;
  --noise5-secondary-channel: #FF4DAB;
  --noise5-primary-note: #FFAADB;
  --noise5-secondary-note: #BB4484;

  /* mod */
  --mod1-primary-channel: #A6FFF9;
  --mod1-secondary-channel: #8DFFF3;
  --mod1-primary-note: #CFFAF9;
  --mod1-secondary-note: #61BBBB;

  --mod2-primary-channel: #8FB8FF;
  --mod2-secondary-channel: #79A8FF;
  --mod2-primary-note: #B9D5FF;
  --mod2-secondary-note: #6B8DBB;

  --mod3-primary-channel: #D2B7FF;
  --mod3-secondary-channel: #C38CFF;
  --mod3-primary-note: #EAD5FF;
  --mod3-secondary-note: #9C6ABB;

  --mod4-primary-channel: #FFE4A6;
  --mod4-secondary-channel: #FFD38C;
  --mod4-primary-note: #FFF2C9;
  --mod4-secondary-note: #BB9F61;

  --mod-label-primary: #D6FFF3;
  --mod-label-secondary-text: #0E1A20;
  --mod-label-primary-text: #2A6A7F;
  --disabled-note-primary: #2C2C2C;
  --disabled-note-secondary: #1A1A1A;
}
`,


"FruityBox":`
:root {
				-webkit-text-stroke-width: 0.5px;
  --page-margin: #764FCE;
  --editor-background: #1A1D3D;
  --hover-preview: #E998B2;
  --playhead: #BC60FF;
  --primary-text: #F8C0FD;
  --secondary-text: #FF99EA;
  --inverted-text: #3C0D47;
  --text-selection: #BF90C5;
  --box-selection-fill: #E39EFF;
  --loop-accent: #9F24FF;
  --link-accent: #A95AFF;
  --ui-widget-background: #622C6E;
  --ui-widget-focus: #BB66FF;
  --pitch-background: #2A1F4E;
  --tonic: #7A4CFF;
  --fifth-note: #7B50FF;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #B6A3FF;
  --black-piano-key: #1E1733;
  --use-color-formula: false;
  --track-editor-bg-pitch: #472CC8;
  --track-editor-bg-pitch-dim: #423E9B;
  --track-editor-bg-noise: #4C3C9C;
  --track-editor-bg-noise-dim: #585DB1;
  --track-editor-bg-mod: #5C55A0;
  --track-editor-bg-mod-dim: #9B90FF;
  --multiplicative-mod-slider: #A099FF;
  --overwriting-mod-slider: #808EFF;
  --indicator-primary: #B566FF;
  --indicator-secondary: #9366CC;
  --select2-opt-group: #7D4CFF;
  --input-box-outline: #8B4DAF;
  --mute-button-normal: #DFDDFF;
  --mute-button-mod: #DDDEFF;
  
  /* pitch */
  --pitch1-primary-channel: #FF7979;
  --pitch1-secondary-channel: #FF4D4D;
  --pitch1-primary-note: #FFAAAA;
  --pitch1-secondary-note: #BB4444;
  
  --pitch2-primary-channel: #FFC879;
  --pitch2-secondary-channel: #FFDC4D;
  --pitch2-primary-note: #FFFEAA;
  --pitch2-secondary-note: #7F8B39;
  
  --pitch3-primary-channel: #94EA69;
  --pitch3-secondary-channel: #62FF4D;
  --pitch3-primary-note: #B3FFAA;
  --pitch3-secondary-note: #5BBB44;
  
  --pitch4-primary-channel: #79FFBB;
  --pitch4-secondary-channel: #4DFFB7;
  --pitch4-primary-note: #AAFFD4;
  --pitch4-secondary-note: #44BB94;
  
  --pitch5-primary-channel: #79FCFF;
  --pitch5-secondary-channel: #4DFFE5;
  --pitch5-primary-note: #AAFFF7;
  --pitch5-secondary-note: #44BBB8;
  
  --pitch6-primary-channel: #798FFF;
  --pitch6-secondary-channel: #4DB7FF;
  --pitch6-primary-note: #AAD5FF;
  --pitch6-secondary-note: #4487BB;
  
  --pitch7-primary-channel: #8F79FF;
  --pitch7-secondary-channel: #504DFF;
  --pitch7-primary-note: #BFAAFF;
  --pitch7-secondary-note: #6F44BB;
  
  --pitch8-primary-channel: #F779FF;
  --pitch8-secondary-channel: #FF4DFB;
  --pitch8-primary-note: #F8AAFF;
  --pitch8-secondary-note: #BB44BA;
  
  --pitch9-primary-channel: #FF79A8;
  --pitch9-secondary-channel: #FF4DB2;
  --pitch9-primary-note: #FFAAD3;
  --pitch9-secondary-note: #BB447B;
  --pitch10-primary-channel: #FFA679;
  --pitch10-secondary-channel: #FF984D;
  --pitch10-primary-note: #FFD7AA;
  --pitch10-secondary-note: #BB8644;
  
  /* noise */
  --noise1-primary-channel: #FF7979;
  --noise1-secondary-channel: #FF4D4D;
  --noise1-primary-note: #FFAAAA;
  
  --noise1-secondary-note: #BB8444;
  --noise2-primary-channel: #FFC279;
  --noise2-secondary-channel: #FFAA4D;
  --noise2-primary-note: #FFE0AA;
  --noise2-secondary-note: #BB8D44;
  
  --noise3-primary-channel: #DFFF79;
  --noise3-secondary-channel: #DFFF4D;
  --noise3-primary-note: #F7FFAA;
  --noise3-secondary-note: #B6BB44;
  
  --noise4-primary-channel: #8DFF79;
  --noise4-secondary-channel: #4DFF52;
  --noise4-primary-note: #AAFFB7;
  --noise4-secondary-note: #5BBB44;
  
  --noise5-primary-channel: #79F4FF;
  --noise5-secondary-channel: #4DF8FF;
  --noise5-primary-note: #AAF5FF;
  --noise5-secondary-note: #44B4BB;
  
  /* mod */
  --mod1-primary-channel: #79FFF0;
  --mod1-secondary-channel: #4DFFEC;
  --mod1-primary-note: #AAFFF9;
  --mod1-secondary-note: #44B1BB;
  
  --mod2-primary-channel: #79BEFF;
  --mod2-secondary-channel: #4D78FF;
  --mod2-primary-note: #AAE2FF;
  --mod2-secondary-note: #448DBB;
  
  --mod3-primary-channel: #79FFF8;
  --mod3-secondary-channel: #4DF7FF;
  --mod3-primary-note: #AAF7FF;
  --mod3-secondary-note: #44BBB1;
  
  --mod4-primary-channel: #79BCFF;
  --mod4-secondary-channel: #4DCDFF;
  --mod4-primary-note: #AAD6FF;
  --mod4-secondary-note: #449EBB;
  
  --mod-label-primary: #D6FFF3;
  --mod-label-secondary-text: #1C3A3F;
  --mod-label-primary-text: #316D7D;
  --disabled-note-primary: #2C2C2C;
  --disabled-note-secondary: #1A1A1A;
}
`,
"Citrus": `
:root {
  --page-margin: #1B1B1B;
  --editor-background: #1B1B1B;
  --hover-preview: #FFD966;
  --playhead: #FF8C00;
  --primary-text: #FFFFFF;
  --secondary-text: #FFD966;
  --inverted-text: #000000;
  --text-selection: #FFB84D;
  --box-selection-fill: #FFCC80;
  --loop-accent: #FF9900;
  --link-accent: #FFCC33;
  --ui-widget-background: #333333;
  --ui-widget-focus: #FFB84D;
  --pitch-background: #222222;
  --tonic: #FF3333;
  --fifth-note: #FF6600;
  --white-piano-key-color: #FFFFFF;
  --black-piano-key-color: #000000;
  --white-piano-key: #FFDDCC;
  --black-piano-key: #333333;
  --use-color-formula: false;

  --track-editor-bg-pitch: #FF4444;
  --track-editor-bg-pitch-dim: #CC2222;
  --track-editor-bg-noise: #FFAA33;
  --track-editor-bg-noise-dim: #CC7733;
  --track-editor-bg-mod: #33CCFF;
  --track-editor-bg-mod-dim: #3399CC;
  --multiplicative-mod-slider: #33FFCC;
  --overwriting-mod-slider: #33CC99;
  --indicator-primary: #FFCC00;
  --indicator-secondary: #FF9933;
  --select2-opt-group: #FF8800;
  --input-box-outline: #FFAA33;
  --mute-button-normal: #CCCCCC;
  --mute-button-mod: #999999;

  --pitch1-primary-channel: #FF5555;
  --pitch1-secondary-channel: #FF8888;
  --pitch1-primary-note: #FFAAAA;
  --pitch1-secondary-note: #FF6666;

  --pitch2-primary-channel: #FFAA33;
  --pitch2-secondary-channel: #FFCC66;
  --pitch2-primary-note: #FFE0AA;
  --pitch2-secondary-note: #FFBB66;

  --pitch3-primary-channel: #33CC33;
  --pitch3-secondary-channel: #66FF66;
  --pitch3-primary-note: #AAFFAA;
  --pitch3-secondary-note: #55BB55;

  --pitch4-primary-channel: #33CCCC;
  --pitch4-secondary-channel: #66FFFF;
  --pitch4-primary-note: #AAFFFF;
  --pitch4-secondary-note: #55BBBB;

  --pitch5-primary-channel: #5555FF;
  --pitch5-secondary-channel: #8888FF;
  --pitch5-primary-note: #AAAAFF;
  --pitch5-secondary-note: #6666BB;

  --pitch6-primary-channel: #CC33FF;
  --pitch6-secondary-channel: #FF66FF;
  --pitch6-primary-note: #EEAAFF;
  --pitch6-secondary-note: #BB66BB;

  --noise1-primary-channel: #FF4444;
  --noise1-secondary-channel: #FF7777;
  --noise1-primary-note: #FFAAAA;
  --noise1-secondary-note: #BB5555;

  --noise2-primary-channel: #FFAA44;
  --noise2-secondary-channel: #FFCC77;
  --noise2-primary-note: #FFE0AA;
  --noise2-secondary-note: #BB8844;

  --mod1-primary-channel: #33CCFF;
  --mod1-secondary-channel: #66EEFF;
  --mod1-primary-note: #99FFFF;
  --mod1-secondary-note: #44BBBB;

  --mod2-primary-channel: #33FFAA;
  --mod2-secondary-channel: #66FFCC;
  --mod2-primary-note: #AAFFEE;
  --mod2-secondary-note: #44BBBB;

  --mod-label-primary: #FFFFFF;
  --mod-label-secondary-text: #AAAAAA;
  --mod-label-primary-text: #FFDD88;
  --disabled-note-primary: #222222;
  --disabled-note-secondary: #111111;
}

`,
"FruityBox Dark": `
:root {
  -webkit-text-stroke-width: 0.6px;
  --page-margin: #5A3EB0;
  --editor-background: #0C0C1C;
  --hover-preview: #FFB7D7;
  --playhead: #D680FF;
  --primary-text: #FFFFFF;
  --secondary-text: #FFD0FB;
  --inverted-text: #200020;
  --text-selection: #DCA3E5;
  --box-selection-fill: #F0A9FF;
  --loop-accent: #BB44FF;
  --link-accent: #C06AFF;
  --ui-widget-background: #431547;
  --ui-widget-focus: #D38EFF;
  --pitch-background: #1B1333;
  --tonic: #9A66FF;
  --fifth-note: #9C6EFF;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #A390FF;
  --black-piano-key: #140D22;
  --use-color-formula: false;
  --track-editor-bg-pitch: #361B99;
  --track-editor-bg-pitch-dim: #2A2575;
  --track-editor-bg-noise: #392675;
  --track-editor-bg-noise-dim: #464A91;
  --track-editor-bg-mod: #4A438B;
  --track-editor-bg-mod-dim: #A398FF;
  --multiplicative-mod-slider: #B3A9FF;
  --overwriting-mod-slider: #9FADFF;
  --indicator-primary: #D780FF;
  --indicator-secondary: #B066D6;
  --select2-opt-group: #9A66FF;
  --input-box-outline: #A55DC5;
  --mute-button-normal: #FFFFFF;
  --mute-button-mod: #EEEFFF;

  /* pitch */
  --pitch1-primary-channel: #FF4D4D;
  --pitch1-secondary-channel: #FF0000;
  --pitch1-primary-note: #FF9999;
  --pitch1-secondary-note: #990000;

  --pitch2-primary-channel: #FFC94D;
  --pitch2-secondary-channel: #FFD700;
  --pitch2-primary-note: #FFF4AA;
  --pitch2-secondary-note: #7F6B00;

  --pitch3-primary-channel: #8DFF4D;
  --pitch3-secondary-channel: #4DFF00;
  --pitch3-primary-note: #C8FFAA;
  --pitch3-secondary-note: #448800;

  --pitch4-primary-channel: #4DFFC9;
  --pitch4-secondary-channel: #00FFAA;
  --pitch4-primary-note: #AAFFE8;
  --pitch4-secondary-note: #008866;

  --pitch5-primary-channel: #4DFAFF;
  --pitch5-secondary-channel: #00E5FF;
  --pitch5-primary-note: #AAFAFF;
  --pitch5-secondary-note: #0088AA;

  --pitch6-primary-channel: #4D6BFF;
  --pitch6-secondary-channel: #005EFF;
  --pitch6-primary-note: #AAB8FF;
  --pitch6-secondary-note: #003C88;

  --pitch7-primary-channel: #6B4DFF;
  --pitch7-secondary-channel: #3F00FF;
  --pitch7-primary-note: #D2AAFF;
  --pitch7-secondary-note: #3C0088;

  --pitch8-primary-channel: #FF4DFF;
  --pitch8-secondary-channel: #FF00FB;
  --pitch8-primary-note: #FFAAFF;
  --pitch8-secondary-note: #990099;

  --pitch9-primary-channel: #FF4D8D;
  --pitch9-secondary-channel: #FF0070;
  --pitch9-primary-note: #FFAACB;
  --pitch9-secondary-note: #880044;

  --pitch10-primary-channel: #FF894D;
  --pitch10-secondary-channel: #FF6600;
  --pitch10-primary-note: #FFCCAA;
  --pitch10-secondary-note: #884400;

  /* noise */
  --noise1-primary-channel: #FF3D3D;
  --noise1-secondary-channel: #CC0000;
  --noise1-primary-note: #FF8888;
  --noise1-secondary-note: #992200;

  --noise2-primary-channel: #FFA54D;
  --noise2-secondary-channel: #FF8800;
  --noise2-primary-note: #FFDD99;
  --noise2-secondary-note: #885500;

  --noise3-primary-channel: #CFFF3D;
  --noise3-secondary-channel: #BFFF00;
  --noise3-primary-note: #F0FFAA;
  --noise3-secondary-note: #6C8800;

  --noise4-primary-channel: #6DFF3D;
  --noise4-secondary-channel: #3DFF00;
  --noise4-primary-note: #B9FFAA;
  --noise4-secondary-note: #448800;

  --noise5-primary-channel: #3DDBFF;
  --noise5-secondary-channel: #00D1FF;
  --noise5-primary-note: #AADDFF;
  --noise5-secondary-note: #006688;

  /* mod */
  --mod1-primary-channel: #3DFFED;
  --mod1-secondary-channel: #00FFE0;
  --mod1-primary-note: #AAFFF8;
  --mod1-secondary-note: #00887A;

  --mod2-primary-channel: #3DAAFF;
  --mod2-secondary-channel: #007BFF;
  --mod2-primary-note: #AAD8FF;
  --mod2-secondary-note: #0055AA;

  --mod3-primary-channel: #3DFFE9;
  --mod3-secondary-channel: #00FFDE;
  --mod3-primary-note: #AAFFED;
  --mod3-secondary-note: #008877;

  --mod4-primary-channel: #3DADFF;
  --mod4-secondary-channel: #00BBFF;
  --mod4-primary-note: #AAD3FF;
  --mod4-secondary-note: #0070AA;

  --mod-label-primary: #E8FFF9;
  --mod-label-secondary-text: #002830;
  --mod-label-primary-text: #258699;

  --disabled-note-primary: #151515;
  --disabled-note-secondary: #0A0A0A;
}

`,


"FruityBox Nano": `
:root {  
  -webkit-text-stroke-width: 0.6px;
  --page-margin: #407DA4;
  --editor-background: #0C0C1C;
  --hover-preview: #E2B7FF;
  --playhead: #67D7D6;
  --primary-text: #FFFFFF;
  --secondary-text: #4F5A8E;
  --inverted-text: #200020;
  --text-selection: #C9EFFF;
  --box-selection-fill: #CAA9FF;
  
  --pitch-background: #132E33cc;
  --tonic: #6692FFcc;
  --fifth-note: #6E91FFcc;
  --loop-accent: #BE5983cc;
  --link-accent: #6A9CFFcc;
  --ui-widget-background: #2D6D61;
  --ui-widget-focus: #74C3B3;

  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #90E5FF;
  --black-piano-key: #140D22;
  --use-color-formula: false;
  --track-editor-bg-pitch: #991B57;
  --track-editor-bg-pitch-dim: #75255C;
  --track-editor-bg-noise: #752658;
  --track-editor-bg-noise-dim: #914679;
  --track-editor-bg-mod: #8B436A;
  --track-editor-bg-mod-dim: #FF98DC;
  --multiplicative-mod-slider: #FFA9F5;
  --overwriting-mod-slider: #FF9FEE;
  --indicator-primary: #80BCFF;
  --indicator-secondary: #66BDD6;
  --select2-opt-group: #42475E;
  --input-box-outline: #5DC5C2;
  --mute-button-normal: #FFFFFF;
  --mute-button-mod: #FFFBEE;

  /* pitch */
  --pitch1-primary-channel: #4DB5FF;
  --pitch1-secondary-channel: #00FFF4;
  --pitch1-primary-note: #99E6FF;
  --pitch1-secondary-note: #009973;

  --pitch2-primary-channel: #4DFF7C;
  --pitch2-secondary-channel: #03FF00;
  --pitch2-primary-note: #C9FFAA;
  --pitch2-secondary-note: #2C7F00;

  --pitch3-primary-channel: #E4FF4D;
  --pitch3-secondary-channel: #FFE300;
  --pitch3-primary-note: #F6FFAA;
  --pitch3-secondary-note: #886F00;

  --pitch4-primary-channel: #FF4DC1;
  --pitch4-secondary-channel: #FF0050;
  --pitch4-primary-note: #FFAAD4;
  --pitch4-secondary-note: #880039;

  --pitch5-primary-channel: #B94DFF;
  --pitch5-secondary-channel: #A700FF;
  --pitch5-primary-note: #E2AAFF;
  --pitch5-secondary-note: #6A00AA;

  --pitch6-primary-channel: #864DFF;
  --pitch6-secondary-channel: #3700FF;
  --pitch6-primary-note: #AAB8FF;
  --pitch6-secondary-note: #003C88;

  --pitch7-primary-channel: #4D70FF;
  --pitch7-secondary-channel: #3F00FF;
  --pitch7-primary-note: #D2AAFF;
  --pitch7-secondary-note: #3C0088;

  --pitch8-primary-channel: #FF4DFF;
  --pitch8-secondary-channel: #FF00FB;
  --pitch8-primary-note: #FFAAFF;
  --pitch8-secondary-note: #990099;

  --pitch9-primary-channel: #FF4D8D;
  --pitch9-secondary-channel: #FF0070;
  --pitch9-primary-note: #FFAACB;
  --pitch9-secondary-note: #880044;

  --pitch10-primary-channel: #FF894D;
  --pitch10-secondary-channel: #FF6600;
  --pitch10-primary-note: #FFCCAA;
  --pitch10-secondary-note: #884400;

  /* noise */
  --noise1-primary-channel: #817E7E;
  --noise1-secondary-channel: #D5D5D5;
  --noise1-primary-note: #F5F4F4;
  --noise1-secondary-note: #B0B0B0;

  --noise2-primary-channel: #817E7E;
  --noise2-secondary-channel: #D5D5D5;
  --noise2-primary-note: #F5F4F4;
  --noise2-secondary-note: #B0B0B0;
  
  --noise3-primary-channel: #817E7E;
  --noise3-secondary-channel: #D5D5D5;
  --noise3-primary-note: #F5F4F4;
  --noise3-secondary-note: #B0B0B0;

  --noise4-primary-channel: #817E7E;
  --noise4-secondary-channel: #D5D5D5;
  --noise4-primary-note: #F5F4F4;
  --noise4-secondary-note: #B0B0B0;
  
  --noise5-primary-channel: #817E7E;
  --noise5-secondary-channel: #D5D5D5;
  --noise5-primary-note: #F5F4F4;
  --noise5-secondary-note: #B0B0B0;

  /* mod */
  --mod1-primary-channel: #3DFFED;
  --mod1-secondary-channel: #00FFE0;
  --mod1-primary-note: #AAFFF8;
  --mod1-secondary-note: #00887A;

  --mod2-primary-channel: #3DAAFF;
  --mod2-secondary-channel: #007BFF;
  --mod2-primary-note: #AAD8FF;
  --mod2-secondary-note: #0055AA;

  --mod3-primary-channel: #3DFFE9;
  --mod3-secondary-channel: #00FFDE;
  --mod3-primary-note: #AAFFED;
  --mod3-secondary-note: #008877;

  --mod4-primary-channel: #3DADFF;
  --mod4-secondary-channel: #00BBFF;
  --mod4-primary-note: #AAD3FF;
  --mod4-secondary-note: #0070AA;

  --mod-label-primary: #E8FFF9;
  --mod-label-secondary-text: #002830;
  --mod-label-primary-text: #258699;

  --disabled-note-primary: #151515;
  --disabled-note-secondary: #0A0A0A;
}
.beepboxEditor button, .beepboxEditor select {
  box-shadow: inset 0 0 0 1px var(--input-box-outline);
}
.noSelection .channelBox {
	box-shadow: inset 0 0 1px rgba(93, 197, 194, 0.91);
}
.select2-selection__rendered {
  box-shadow: inset 3 3 0 1px rgba(93, 197, 194, 0.41);
}
div.piano-button{
border: 1px solid #5DC5C2  !important; outline:none;
}
#beepboxEditorContainer, body:not(:has(#beepboxEditorContainer)) {
  filter: hue-rotate(0deg);
  animation: rainbow 15s linear infinite;
}
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
 
`,
"FruityBox Standard Blue": `
:root {
			--oscilloscope-line-R: #0099A1;
			--oscilloscope-line-L: #E4FF4D;
  -webkit-text-stroke-width: 0.5px;
  --page-margin: #3B474F; /*in player bg*/
  --editor-background: #272929;
  --hover-preview: #B0B0B0;
  --playhead: #356A8C;
  --primary-text: #EAEAEA;
  --secondary-text: #9C9C9C;
  --inverted-text: #101010;
  --text-selection: #D6D6D6;
  --box-selection-fill: #777777;
  --loop-accent: #356A8C;
  --link-accent: #356A8C;
  --ui-widget-background: #41494F;
  --ui-widget-focus: #41494F;
  --pitch-background: #3B474F;
  --pattern-background: #292C2F;
  --tonic: #2B3941;
  --fifth-note: #2A353B;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #FFFFFF;
  --white-piano-key: #BAC3C6;
  --black-piano-key: #4E4E53;
  --use-color-formula: false;
  --track-editor-bg-pitch: #505050;
  --track-editor-bg-pitch-dim: #3C3C3C;
  --track-editor-bg-noise: #444444;
  --track-editor-bg-noise-dim: #2E2E2E;
  --track-editor-bg-mod: #3E3E3E;
  --track-editor-bg-mod-dim: #4F4F4F;
  --multiplicative-mod-slider: #9CA3AF;
  --overwriting-mod-slider: #B1B1B1;
  --indicator-primary: #B0B0B0;
  --indicator-secondary: #707070;
  --select2-opt-group: #444;
  --input-box-outline: rgba(95, 95, 95, 0.41);
  --mute-button-normal: #E0E0E0;
  --mute-button-mod: #C0C0C0;

  --pitch1-secondary-channel: #0099A1;
  --pitch1-primary-channel: #25F3FF;
  --pitch1-secondary-note: #00BDC7;
  --pitch1-primary-note: #92F9FF;
  --pitch2-secondary-channel: #0099A1;
  --pitch2-primary-channel: #25F3FF;
  --pitch2-secondary-note: #00BDC7;
  --pitch2-primary-note: #92F9FF;
  --pitch3-secondary-channel: #0099A1;
  --pitch3-primary-channel: #25F3FF;
  --pitch3-secondary-note: #00BDC7;
  --pitch3-primary-note: #92F9FF;
  --pitch4-secondary-channel: #0099A1;
  --pitch4-primary-channel: #25F3FF;
  --pitch4-secondary-note: #00BDC7;
  --pitch4-primary-note: #92F9FF;
  --pitch5-secondary-channel: #0099A1;
  --pitch5-primary-channel: #25F3FF;
  --pitch5-secondary-note: #00BDC7;
  --pitch5-primary-note: #92F9FF;
  --pitch6-secondary-channel: #0099A1;
  --pitch6-primary-channel: #25F3FF;
  --pitch6-secondary-note: #00BDC7;
  --pitch6-primary-note: #92F9FF;
  --pitch7-secondary-channel: #0099A1;
  --pitch7-primary-channel: #25F3FF;
  --pitch7-secondary-note: #00BDC7;
  --pitch7-primary-note: #92F9FF;
  --pitch8-secondary-channel: #0099A1;
  --pitch8-primary-channel: #25F3FF;
  --pitch8-secondary-note: #00BDC7;
  --pitch8-primary-note: #92F9FF;
  --pitch9-secondary-channel: #0099A1;
  --pitch9-primary-channel: #25F3FF;
  --pitch9-secondary-note: #00BDC7;
  --pitch9-primary-note: #92F9FF;
  --pitch10-secondary-channel: #0099A1;
  --pitch10-primary-channel: #25F3FF;
  --pitch10-secondary-note: #00BDC7;
  --pitch10-primary-note: #92F9FF;

  --noise1-secondary-channel: #0099A1;
  --noise1-primary-channel: #25F3FF;
  --noise1-secondary-note: #00BDC7;
  --noise1-primary-note: #92F9FF;
  --noise2-secondary-channel: #0099A1;
  --noise2-primary-channel: #25F3FF;
  --noise2-secondary-note: #00BDC7;
  --noise2-primary-note: #92F9FF;
  --noise3-secondary-channel: #0099A1;
  --noise3-primary-channel: #25F3FF;
  --noise3-secondary-note: #00BDC7;
  --noise3-primary-note: #92F9FF;
  --noise4-secondary-channel: #0099A1;
  --noise4-primary-channel: #25F3FF;
  --noise4-secondary-note: #00BDC7;
  --noise4-primary-note: #92F9FF;
  --noise5-secondary-channel: #0099A1;
  --noise5-primary-channel: #25F3FF;
  --noise5-secondary-note: #00BDC7;
  --noise5-primary-note: #92F9FF;

  --mod1-secondary-channel: #0099A1;
  --mod1-primary-channel: #25F3FF;
  --mod1-secondary-note: #00BDC7;
  --mod1-primary-note: #92F9FF;
  --mod2-secondary-channel: #0099A1;
  --mod2-primary-channel: #25F3FF;
  --mod2-secondary-note: #00BDC7;
  --mod2-primary-note: #92F9FF;
  --mod3-secondary-channel: #0099A1;
  --mod3-primary-channel: #25F3FF;
  --mod3-secondary-note: #00BDC7;
  --mod3-primary-note: #92F9FF;
  --mod4-secondary-channel: #0099A1;
  --mod4-primary-channel: #25F3FF;
  --mod4-secondary-note: #00BDC7;
  --mod4-primary-note: #92F9FF;

  --mod-label-primary: #E3E3E3;
  --mod-label-secondary-text: #1C1C1C;
  --mod-label-primary-text: #B4BABA;
  --disabled-note-primary: #151515;
  --disabled-note-secondary: #0A0A0A;
}
div.piano-button {
		border: none;
		display:block
}

.beepboxEditor .piano-button.disabled::after {
	 
}
.beepboxEditor .modulator-button::before {
display:none;
}
.beepboxEditor .modulator-button.disabled::after {
	display:none;
}
.trackContainer .noSelection {
	background-color:#272929 !important;
}
.muteButtonText {
		color: white !important;
}
.muteEditor div{
		background-color: #353B3F !important;
}
.muteEditor {
	background-color: #353B3F !important;
}
.loopEditor {
	background-color: #353B3F !important;
}
.play-pause-area {
	background-color: #353B3F !important;
	margin:5px !important; margin-left:-10px !important; padding:5px !important; width: calc(100% + 5px);
}
select , button, .selection *, input{
	border-radius:0px !important;
}
 
.beepboxEditor .piano-button.blackkey + .piano-button:not(.blackkey) {
  border:0px solid white; outline:none; transform: scale(100%,250%) translateY(15%);  
}
.beepboxEditor .piano-button.blackkey  {
  margin-left:20%;
  position:relative; z-index:2;
box-shadow: 0px 5px 15px -2px rgba(44, 44, 49, 1);
}

.beepboxEditor .piano-button::before {
 display:none;
 border:2px solid #3d3c3a;
}

.beepboxEditor .piano-button.blackkey  {
  margin-left:20%;
  align-items:left !important;
  position:relative; z-index:2;
box-shadow: 0px 5px 15px -2px rgba(44, 44, 49, 1);
}
.beepboxEditor .piano-button.blackkey .piano-label  {
  padding-left:25% !important;
}
.beepboxEditor .piano-button.blackkey + .piano-button:not(.blackkey) .piano-label{
	transform:scale(100%,40%) translateY(-4px) !important;
}
.beepboxEditor .piano-button.blackkey::before {
		display: none;
		border: 1px solid #3d3c3a !important;
		background-clip:none;
		
}
`,
"FruityBox Standard": `
:root {
 			--oscilloscope-line-R: #0099A1;
			--oscilloscope-line-L: #E4FF4D;
  -webkit-text-stroke-width: 0.5px;
  --page-margin: #3B474F;
  --editor-background: #272929;
  --hover-preview: #B0B0B0;
  --playhead: #356A8C;
  --primary-text: #EAEAEA;
  --secondary-text: #9C9C9C;
  --inverted-text: #101010;
  --text-selection: #D6D6D6;
  --box-selection-fill: #777777;
  --loop-accent: #356A8C;
  --link-accent: #356A8C;
  --ui-widget-background: #41494F;
  --ui-widget-focus: #586268;
  --pitch-background: #42545F;
  --pattern-background: #292C2F;
  --tonic: #3B4D58;
  --fifth-note: #3B4D58;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #FFFFFF;
  --white-piano-key: #BAC3C6;
  --black-piano-key: #4E4E53;
  --use-color-formula: false;
  --track-editor-bg-pitch: #505050;
  --track-editor-bg-pitch-dim: #3C3C3C;
  --track-editor-bg-noise: #444444;
  --track-editor-bg-noise-dim: #2E2E2E;
  --track-editor-bg-mod: #3E3E3E;
  --track-editor-bg-mod-dim: #4F4F4F;
  --multiplicative-mod-slider: #9CA3AF;
  --overwriting-mod-slider: #B1B1B1;
  --indicator-primary: #B0B0B0;
  --indicator-secondary: #707070;
  --select2-opt-group: #444;
  --input-box-outline: rgba(95, 95, 95, 0.41);
  --mute-button-normal: #E0E0E0;
  --mute-button-mod: #C0C0C0;

  --pitch1-secondary-channel: #0099A1;
  --pitch1-primary-channel: #25F3FF;
  --pitch1-secondary-note: #00BDC7;
  --pitch1-primary-note: #92F9FF;
  --pitch2-secondary-channel: #A1A100;
  --pitch2-primary-channel: #FFFF25;
  --pitch2-secondary-note: #C7C700;
  --pitch2-primary-note: #FFFF92;
  --pitch3-secondary-channel: #C77B00;
  --pitch3-primary-channel: #FFBA52;
  --pitch3-secondary-note: #FFA11C;
  --pitch3-primary-note: #FFE1AB;
  --pitch4-secondary-channel: #00A100;
  --pitch4-primary-channel: #50FF50;
  --pitch4-secondary-note: #00C700;
  --pitch4-primary-note: #A0FFA0;
  --pitch5-secondary-channel: #D020D0;
  --pitch5-primary-channel: #FF90FF;
  --pitch5-secondary-note: #E040E0;
  --pitch5-primary-note: #FFC0FF;
  --pitch6-secondary-channel: #0099A1;
  --pitch6-primary-channel: #25F3FF;
  --pitch6-secondary-note: #00BDC7;
  --pitch6-primary-note: #92F9FF;
  --pitch7-secondary-channel: #A1A100;
  --pitch7-primary-channel: #FFFF25;
  --pitch7-secondary-note: #C7C700;
  --pitch7-primary-note: #FFFF92;
  --pitch8-secondary-channel: #C77B00;
  --pitch8-primary-channel: #FFBA52;
  --pitch8-secondary-note: #FFA11C;
  --pitch8-primary-note: #FFE1AB;
  --pitch9-secondary-channel: #00A100;
  --pitch9-primary-channel: #50FF50;
  --pitch9-secondary-note: #00C700;
  --pitch9-primary-note: #A0FFA0;
  --pitch10-secondary-channel: #D020D0;
  --pitch10-primary-channel: #FF90FF;
  --pitch10-secondary-note: #E040E0;
  --pitch10-primary-note: #FFC0FF;

  --noise1-secondary-channel: #B2B2B2;
  --noise1-primary-channel: #AAAAAA;
  --noise1-secondary-note: #818181;
  --noise1-primary-note: #E0E0E0;
  --noise2-secondary-channel: #996633;
  --noise2-primary-channel: #DDAA77;
  --noise2-secondary-note: #CC9966;
  --noise2-primary-note: #F0D0BB;
  --noise3-secondary-channel: #B2B2B2;
  --noise3-primary-channel: #AAAAAA;
  --noise3-secondary-note: #818181;
  --noise3-primary-note: #E0E0E0;
  --noise4-secondary-channel: #996633;
  --noise4-primary-channel: #DDAA77;
  --noise4-secondary-note: #CC9966;
  --noise4-primary-note: #F0D0BB;
  --noise5-secondary-channel: #B2B2B2;
  --noise5-primary-channel: #AAAAAA;
  --noise5-secondary-note: #818181;
  --noise5-primary-note: #E0E0E0;

  --mod1-secondary-channel: #339955;
  --mod1-primary-channel: #77FC55;
  --mod1-secondary-note: #40862E;
  --mod1-primary-note: #CDFFEE;
  --mod2-secondary-channel: #993355;
  --mod2-primary-channel: #F04960;
  --mod2-secondary-note: #862E4C;
  --mod2-primary-note: #FFB8DE;
  --mod3-secondary-channel: #553399;
  --mod3-primary-channel: #8855FC;
  --mod3-secondary-note: #5E2E86;
  --mod3-primary-note: #F8DDFF;
  --mod4-secondary-channel: #A86436;
  --mod4-primary-channel: #C8A825;
  --mod4-secondary-note: #86862E;
  --mod4-primary-note: #FFF6D3;

  --mod-label-primary: #E3E3E3;
  --mod-label-secondary-text: #1C1C1C;
  --mod-label-primary-text: #B4BABA;
  --disabled-note-primary: #151515;
  --disabled-note-secondary: #0A0A0A;
}
div.piano-button {
		border: none;
		display:block
}

.beepboxEditor .piano-button.disabled::after {
	 
}
.beepboxEditor .modulator-button::before {
display:none;
}
.beepboxEditor .modulator-button.disabled::after {
	display:none;
}
.trackContainer .noSelection {
	background-color:#272929 !important;
}
.muteButtonText {
		color: white !important;
}
.muteEditor div{
		background-color: #353B3F !important;
}
.muteEditor {
	background-color: #353B3F !important;
}
.loopEditor {
	background-color: #353B3F !important;
}
.play-pause-area {
	background-color: #353B3F !important;
	margin:5px !important; margin-left:-10px !important; padding:5px !important; width: calc(100% + 5px);
}
select , button, .selection *, input{
	border-radius:0px !important;
}
.piano-label {
	opacity:0;
}
.beepboxEditor .piano-button.blackkey + .piano-button:not(.blackkey) {
  border:0px solid white; outline:none; transform: scale(100%,250%) translateY(15%);  
}
.beepboxEditor .piano-button.blackkey  {
  margin-left:20%;
  position:relative; z-index:2;
box-shadow: 0px 5px 15px -2px rgba(44, 44, 49, 1);
}

.beepboxEditor .piano-button::before {
 display:none;
 border:2px solid #3d3c3a;
}
.beepboxEditor .piano-button.blackkey::before {
		display: none;
		border: 1px solid #3d3c3a !important;
		background-clip:none;
		
}
`,
"FruityBox Contrast": ` 
:root {
 			--oscilloscope-line-R: #35C7CF;
			--oscilloscope-line-L: #FFF44D;
  -webkit-text-stroke-width: 0.5px;
  --page-margin: #171819;
  --editor-background: #212323;
  --hover-preview: #E0E0E0;
  --playhead: #5599C5;
  --primary-text: #EAEAEA;
  --secondary-text: #9C9C9C;
  --inverted-text: #101010;
  --text-selection: #D6D6D6;
  --box-selection-fill: #777777;
  --loop-accent: #5992B7;
  --link-accent: #679FC2;
  --ui-widget-background: #32373B;
  --ui-widget-focus: #394044;
  --pitch-background: #30393E;
  --pattern-background: #171819;
  --tonic: #363F44;
  --fifth-note: #363F44;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #FFFFFF;
  --white-piano-key: #D3D5D5;
--black-piano-key: #4E4E53;
  --use-color-formula: false;
  --track-editor-bg-pitch: #363636;
  --track-editor-bg-pitch-dim: #262B2B;
  --track-editor-bg-noise: #363636;
  --track-editor-bg-noise-dim: #262B2B;
  --track-editor-bg-mod: #363636;
  --track-editor-bg-mod-dim: #262B2B;
  --multiplicative-mod-slider: #B2B2B2;
  --overwriting-mod-slider: #898A8B;
  --indicator-primary: #B0B0B0;
  --indicator-secondary: #707070;
  --select2-opt-group: #444;
  --input-box-outline: rgba(95, 95, 95, 0.41);
  --mute-button-normal: #E0E0E0;
  --mute-button-mod: #C0C0C0;

  --pitch1-secondary-channel: #0099A1;
  --pitch1-primary-channel: #25F3FF;
  --pitch1-secondary-note: #00BDC7;
  --pitch1-primary-note: #92F9FF;
  --pitch2-secondary-channel: #A1A100;
  --pitch2-primary-channel: #FFFF25;
  --pitch2-secondary-note: #C7C700;
  --pitch2-primary-note: #FFFF92;
  --pitch3-secondary-channel: #C77B00;
  --pitch3-primary-channel: #FFBA52;
  --pitch3-secondary-note: #FFA11C;
  --pitch3-primary-note: #FFE1AB;
  --pitch4-secondary-channel: #00A100;
  --pitch4-primary-channel: #50FF50;
  --pitch4-secondary-note: #00C700;
  --pitch4-primary-note: #A0FFA0;
  --pitch5-secondary-channel: #D020D0;
  --pitch5-primary-channel: #FF90FF;
  --pitch5-secondary-note: #E040E0;
  --pitch5-primary-note: #FFC0FF;
  --pitch6-secondary-channel: #0099A1;
  --pitch6-primary-channel: #25F3FF;
  --pitch6-secondary-note: #00BDC7;
  --pitch6-primary-note: #92F9FF;
  --pitch7-secondary-channel: #A1A100;
  --pitch7-primary-channel: #FFFF25;
  --pitch7-secondary-note: #C7C700;
  --pitch7-primary-note: #FFFF92;
  --pitch8-secondary-channel: #C77B00;
  --pitch8-primary-channel: #FFBA52;
  --pitch8-secondary-note: #FFA11C;
  --pitch8-primary-note: #FFE1AB;
  --pitch9-secondary-channel: #00A100;
  --pitch9-primary-channel: #50FF50;
  --pitch9-secondary-note: #00C700;
  --pitch9-primary-note: #A0FFA0;
  --pitch10-secondary-channel: #D020D0;
  --pitch10-primary-channel: #FF90FF;
  --pitch10-secondary-note: #E040E0;
  --pitch10-primary-note: #FFC0FF;

  --noise1-secondary-channel: #B2B2B2;
  --noise1-primary-channel: #AAAAAA;
  --noise1-secondary-note: #818181;
  --noise1-primary-note: #E0E0E0;
  --noise2-secondary-channel: #996633;
  --noise2-primary-channel: #DDAA77;
  --noise2-secondary-note: #CC9966;
  --noise2-primary-note: #F0D0BB;
  --noise3-secondary-channel: #B2B2B2;
  --noise3-primary-channel: #AAAAAA;
  --noise3-secondary-note: #818181;
  --noise3-primary-note: #E0E0E0;
  --noise4-secondary-channel: #996633;
  --noise4-primary-channel: #DDAA77;
  --noise4-secondary-note: #CC9966;
  --noise4-primary-note: #F0D0BB;
  --noise5-secondary-channel: #B2B2B2;
  --noise5-primary-channel: #AAAAAA;
  --noise5-secondary-note: #818181;
  --noise5-primary-note: #E0E0E0;

  --mod1-secondary-channel: #339955;
  --mod1-primary-channel: #77FC55;
  --mod1-secondary-note: #40862E;
  --mod1-primary-note: #CDFFEE;
  --mod2-secondary-channel: #993355;
  --mod2-primary-channel: #F04960;
  --mod2-secondary-note: #862E4C;
  --mod2-primary-note: #FFB8DE;
  --mod3-secondary-channel: #553399;
  --mod3-primary-channel: #8855FC;
  --mod3-secondary-note: #5E2E86;
  --mod3-primary-note: #F8DDFF;
  --mod4-secondary-channel: #A86436;
  --mod4-primary-channel: #C8A825;
  --mod4-secondary-note: #86862E;
  --mod4-primary-note: #FFF6D3;

  --mod-label-primary: #E3E3E3;
  --mod-label-secondary-text: #1C1C1C;
  --mod-label-primary-text: #B4BABA;
  --disabled-note-primary: #151515;
  --disabled-note-secondary: #0A0A0A;
}
div.piano-button {
		border: none;
		display:block
}
.beepboxEditor .modulator-button::before {
display:none;
}
.beepboxEditor .modulator-button.disabled::after {
	display:none;
}
.trackContainer .noSelection {
	background-color:#151616 !important;
}
.muteButtonText {
		color: white !important;
}
.muteEditor div{
		background-color: #353B3F !important;
}
.muteEditor {
	background-color: #353B3F !important;
}
.loopEditor {
	background-color: #353B3F !important;
}
.play-pause-area {
	background-color: #151616 !important;
	margin:5px !important; margin-left:-10px !important; padding:5px !important; width: calc(100% + 5px);
}
select , button, .selection *, input{
	border-radius:0px !important;
}

.beepboxEditor .piano-button.blackkey + .piano-button:not(.blackkey) {
  border:0px solid white; outline:none; transform: scale(100%,250%) translateY(15%);  
}
.beepboxEditor .piano-button.blackkey  {
  margin-left:20%;
  align-items:left !important;
  position:relative; z-index:2;
box-shadow: 0px 5px 15px -2px rgba(44, 44, 49, 1);
}
.beepboxEditor .piano-button.blackkey .piano-label  {
  padding-left:25% !important;
}
.beepboxEditor .piano-button.blackkey + .piano-button:not(.blackkey) .piano-label{
	transform:scale(100%,40%) translateY(-4px) !important;
}
.beepboxEditor .piano-button::before {
 display:none;
 border:2px solid #3d3c3a;
}
.beepboxEditor .piano-button.blackkey::before {
		display: none;
		border: 1px solid #3d3c3a !important;
		background-clip:none;
		
}
`,
"FruityBoxLight":`
:root {
  --page-margin: #F2ECFF;
  --editor-background: #F8F7FF;
  --hover-preview: #FFB6CE;
  --playhead: #9A3DD9;
  --primary-text: #3D0842;
  --secondary-text: #5B2E51;
  --inverted-text: #FFFFFF;
  --text-selection: #EFC4E9;
  --box-selection-fill: #D9B3FF;
  --loop-accent: #8B2CE6;
  --link-accent: #A347DF;
  --ui-widget-background: #EFD3E7;
  --ui-widget-focus: #D5A8FF;
  --pitch-background: #F2ECFF;
  --tonic: #A579FF;
  --fifth-note: #9F83FF;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #FFFFFF;
  --black-piano-key: #D4C4FF;
  --use-color-formula: false;
  --track-editor-bg-pitch: #D7CCFF;
  --track-editor-bg-pitch-dim: #E3DFFF;
  --track-editor-bg-noise: #DED0FF;
  --track-editor-bg-noise-dim: #EAE2FF;
  --track-editor-bg-mod: #E2D8FF;
  --track-editor-bg-mod-dim: #F0E7FF;
  --multiplicative-mod-slider: #C2B8FF;
  --overwriting-mod-slider: #B0B6FF;
  --indicator-primary: #AD66FF;
  --indicator-secondary: #B799D9;
  --select2-opt-group: #C6B1FF;
  --input-box-outline: #C09DE9;
  --mute-button-normal: #3C3C3C;
  --mute-button-mod: #4A4A4A;

  /* pitch - saturated */
  --pitch1-primary-channel: #FF1A1A;
  --pitch1-secondary-channel: #FF4D4D;
  --pitch1-primary-note: #FFA0A0;
  --pitch1-secondary-note: #D94C4C;

  --pitch2-primary-channel: #FF9500;
  --pitch2-secondary-channel: #FFD000;
  --pitch2-primary-note: #FFE4AA;
  --pitch2-secondary-note: #C48300;

  --pitch3-primary-channel: #7EE600;
  --pitch3-secondary-channel: #BFFF66;
  --pitch3-primary-note: #DAFFB0;
  --pitch3-secondary-note: #64AA00;

  --pitch4-primary-channel: #00E6C0;
  --pitch4-secondary-channel: #66FFE5;
  --pitch4-primary-note: #B2FFF4;
  --pitch4-secondary-note: #00AA8F;

  --pitch5-primary-channel: #00C9FF;
  --pitch5-secondary-channel: #66E0FF;
  --pitch5-primary-note: #B3ECFF;
  --pitch5-secondary-note: #0094CC;

  --pitch6-primary-channel: #597EFF;
  --pitch6-secondary-channel: #8FAFFF;
  --pitch6-primary-note: #C9D5FF;
  --pitch6-secondary-note: #3B5BCC;

  --pitch7-primary-channel: #7A4DFF;
  --pitch7-secondary-channel: #B088FF;
  --pitch7-primary-note: #DAC9FF;
  --pitch7-secondary-note: #5C2ECC;

  --pitch8-primary-channel: #E600E6;
  --pitch8-secondary-channel: #FF80FF;
  --pitch8-primary-note: #FFCCFF;
  --pitch8-secondary-note: #B800B8;

  --pitch9-primary-channel: #FF4D8D;
  --pitch9-secondary-channel: #FF99C2;
  --pitch9-primary-note: #FFCFE3;
  --pitch9-secondary-note: #B8406A;

  --pitch10-primary-channel: #FFA04D;
  --pitch10-secondary-channel: #FFCCA6;
  --pitch10-primary-note: #FFE4C9;
  --pitch10-secondary-note: #CC7633;

  /* noise - saturated */
  --noise1-primary-channel: #FF6666;
  --noise1-secondary-channel: #FF9999;
  --noise1-primary-note: #FFD9D9;
  --noise1-secondary-note: #CC7040;

  --noise2-primary-channel: #FFB347;
  --noise2-secondary-channel: #FFD180;
  --noise2-primary-note: #FFEEC0;
  --noise2-secondary-note: #C28534;

  --noise3-primary-channel: #E6FF33;
  --noise3-secondary-channel: #F7FF66;
  --noise3-primary-note: #FDFFB0;
  --noise3-secondary-note: #C0C040;

  --noise4-primary-channel: #66FF66;
  --noise4-secondary-channel: #B2FFB2;
  --noise4-primary-note: #DAFFDA;
  --noise4-secondary-note: #66BB66;

  --noise5-primary-channel: #66E6FF;
  --noise5-secondary-channel: #B2F5FF;
  --noise5-primary-note: #D9FAFF;
  --noise5-secondary-note: #40AACC;

  /* mod - saturated */
  --mod1-primary-channel: #80FFF9;
  --mod1-secondary-channel: #B3FFF9;
  --mod1-primary-note: #D1FFFC;
  --mod1-secondary-note: #339999;

  --mod2-primary-channel: #6699FF;
  --mod2-secondary-channel: #A3C2FF;
  --mod2-primary-note: #D1E0FF;
  --mod2-secondary-note: #4066CC;

  --mod3-primary-channel: #66FFFF;
  --mod3-secondary-channel: #B3FFFF;
  --mod3-primary-note: #D1FFFF;
  --mod3-secondary-note: #40CCCC;

  --mod4-primary-channel: #66CCFF;
  --mod4-secondary-channel: #A3E0FF;
  --mod4-primary-note: #D1F0FF;
  --mod4-secondary-note: #3399CC;

  --mod-label-primary: #004A3F;
  --mod-label-secondary-text: #F0FFF9;
  --mod-label-primary-text: #D8FDF5;
  --disabled-note-primary: #CCCCCC;
  --disabled-note-secondary: #EEEEEE;
}

.beepboxEditor button, .beepboxEditor select {
  box-shadow: inset 0 0 0 1px var(--secondary-text);
}

.select2-selection__rendered {
  box-shadow: inset 0 0 0 1px var(--secondary-text);
}
`,
"coolred":`:root {
  --page-margin: #4E1F1F;
  --editor-background: #3D1A1A;
  --hover-preview: #FFD7D7;
  --playhead: #FF6060;
  --primary-text: #FFE3E3;
  --secondary-text: #FF9999;
  --inverted-text: #320A0A;
  --text-selection: #FFC8C8;
  --box-selection-fill: #FF9E9E;
  --loop-accent: #FF6969;
  --link-accent: #FF5A5A;
  --ui-widget-background: #6E2C2C;
  --ui-widget-focus: #FF6666;
  --pitch-background: #4E1F1F;
  --tonic: #FF4C4C;
  --fifth-note: #FF5050;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #FFA3A3;
  --black-piano-key: #331717;
  --use-color-formula: false;
  --track-editor-bg-pitch: #8A2C2C;
  --track-editor-bg-pitch-dim: #9B3E3E;
  --track-editor-bg-noise: #9C3C3C;
  --track-editor-bg-noise-dim: #B15858;
  --track-editor-bg-mod: #A05555;
  --track-editor-bg-mod-dim: #FF9090;
  --multiplicative-mod-slider: #FF9999;
  --overwriting-mod-slider: #FF8080;
  --indicator-primary: #FF6666;
  --indicator-secondary: #CC6666;
  --select2-opt-group: #FF4C4C;
  --input-box-outline: #AF4D4D;
  --mute-button-normal: #FFDDDD;
  --mute-button-mod: #FFDDDD;
  
  /* pitch */
  --pitch1-primary-channel: #FF7979;
  --pitch1-secondary-channel: #FF4D4D;
  --pitch1-primary-note: #FFAAAA;
  --pitch1-secondary-note: #BB4444;
  --pitch2-primary-channel: #FF7979;
  --pitch2-secondary-channel: #FF4D4D;
  --pitch2-primary-note: #FFAAAA;
  --pitch2-secondary-note: #8B3939;
  --pitch3-primary-channel: #EA6969;
  --pitch3-secondary-channel: #FF4D4D;
  --pitch3-primary-note: #FFAAAA;
  --pitch3-secondary-note: #BB4444;
  --pitch4-primary-channel: #FF7979;
  --pitch4-secondary-channel: #FF4D4D;
  --pitch4-primary-note: #FFAAAA;
  --pitch4-secondary-note: #BB4444;
  --pitch5-primary-channel: #FF7979;
  --pitch5-secondary-channel: #FF4D4D;
  --pitch5-primary-note: #FFAAAA;
  --pitch5-secondary-note: #BB4444;
  --pitch6-primary-channel: #FF7979;
  --pitch6-secondary-channel: #FF4D4D;
  --pitch6-primary-note: #FFAAAA;
  --pitch6-secondary-note: #BB4444;
  --pitch7-primary-channel: #FF7979;
  --pitch7-secondary-channel: #FF4D4D;
  --pitch7-primary-note: #FFAAAA;
  --pitch7-secondary-note: #BB4444;
  --pitch8-primary-channel: #FF7979;
  --pitch8-secondary-channel: #FF4D4D;
  --pitch8-primary-note: #FFAAAA;
  --pitch8-secondary-note: #BB4444;
  --pitch9-primary-channel: #FF7979;
  --pitch9-secondary-channel: #FF4D4D;
  --pitch9-primary-note: #FFAAAA;
  --pitch9-secondary-note: #BB4444;
  --pitch10-primary-channel: #FF7979;
  --pitch10-secondary-channel: #FF4D4D;
  --pitch10-primary-note: #FFAAAA;
  --pitch10-secondary-note: #BB4444;
  
  /* noise */
  --noise1-primary-channel: #FF7979;
  --noise1-secondary-channel: #FF4D4D;
  --noise1-primary-note: #FFAAAA;
  --noise1-secondary-note: #BB4444;
  --noise2-primary-channel: #FF7979;
  --noise2-secondary-channel: #FF4D4D;
  --noise2-primary-note: #FFAAAA;
  --noise2-secondary-note: #BB4444;
  --noise3-primary-channel: #FF7979;
  --noise3-secondary-channel: #FF4D4D;
  --noise3-primary-note: #FFAAAA;
  --noise3-secondary-note: #BB4444;
  --noise4-primary-channel: #FF7979;
  --noise4-secondary-channel: #FF4D4D;
  --noise4-primary-note: #FFAAAA;
  --noise4-secondary-note: #BB4444;
  --noise5-primary-channel: #FF7979;
  --noise5-secondary-channel: #FF4D4D;
  --noise5-primary-note: #FFAAAA;
  --noise5-secondary-note: #BB4444;
  
  /* mod */
  --mod1-primary-channel: #FF7979;
  --mod1-secondary-channel: #FF4D4D;
  --mod1-primary-note: #FFAAAA;
  --mod1-secondary-note: #BB4444;
  --mod2-primary-channel: #FF7979;
  --mod2-secondary-channel: #FF4D4D;
  --mod2-primary-note: #FFAAAA;
  --mod2-secondary-note: #BB4444;
  --mod3-primary-channel: #FF7979;
  --mod3-secondary-channel: #FF4D4D;
  --mod3-primary-note: #FFAAAA;
  --mod3-secondary-note: #BB4444;
  --mod4-primary-channel: #FF7979;
  --mod4-secondary-channel: #FF4D4D;
  --mod4-primary-note: #FFAAAA;
  --mod4-secondary-note: #BB4444;
  
  --mod-label-primary: #FFD6D6;
  --mod-label-secondary-text: #3F1C1C;
  --mod-label-primary-text: #7A3E3E;
  --disabled-note-primary: #2C2C2C;
  --disabled-note-secondary: #1A1A1A;
}`,
"coollime":`
:root {
  --page-margin: #1F4E1F;
  --editor-background: #1A3D1A;
  --hover-preview: #D7FFD9;
  --playhead: #A8FF60;
  --primary-text: #E8FFE3;
  --secondary-text: #B2FF99;
  --inverted-text: #0A320A;
  --text-selection: #C8FFC8;
  --box-selection-fill: #9EFF9E;
  --loop-accent: #B6FF69;
  --link-accent: #A2FF5A;
  --ui-widget-background: #2C6E2C;
  --ui-widget-focus: #66FF66;
  --pitch-background: #1F4E1F;
  --tonic: #C4FF4C;
  --fifth-note: #7FFF50;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #C7FFA3;
  --black-piano-key: #173317;
  --use-color-formula: false;
  --track-editor-bg-pitch: #2C8A2C;
  --track-editor-bg-pitch-dim: #3E9B3E;
  --track-editor-bg-noise: #3C9C3C;
  --track-editor-bg-noise-dim: #58B158;
  --track-editor-bg-mod: #55A055;
  --track-editor-bg-mod-dim: #90FF90;
  --multiplicative-mod-slider: #99FF99;
  --overwriting-mod-slider: #AFFF80;
  --indicator-primary: #88FF66;
  --indicator-secondary: #66CC66;
  --select2-opt-group: #75FF4C;
  --input-box-outline: #5DAF4D;
  --mute-button-normal: #EBFFDD;
  --mute-button-mod: #EBFFDD;

  /* pitch */
  --pitch1-primary-channel: #B9FF79;
  --pitch1-secondary-channel: #8CFF4D;
  --pitch1-primary-note: #CCFFAA;
  --pitch1-secondary-note: #66BB44;
  --pitch2-primary-channel: #B9FF79;
  --pitch2-secondary-channel: #8CFF4D;
  --pitch2-primary-note: #CCFFAA;
  --pitch2-secondary-note: #66BB44;
  --pitch3-primary-channel: #B9FF79;
  --pitch3-secondary-channel: #8CFF4D;
  --pitch3-primary-note: #CCFFAA;
  --pitch3-secondary-note: #66BB44;
  --pitch4-primary-channel: #B9FF79;
  --pitch4-secondary-channel: #8CFF4D;
  --pitch4-primary-note: #CCFFAA;
  --pitch4-secondary-note: #66BB44;
  --pitch5-primary-channel: #B9FF79;
  --pitch5-secondary-channel: #8CFF4D;
  --pitch5-primary-note: #CCFFAA;
  --pitch5-secondary-note: #66BB44;
  --pitch6-primary-channel: #B9FF79;
  --pitch6-secondary-channel: #8CFF4D;
  --pitch6-primary-note: #CCFFAA;
  --pitch6-secondary-note: #66BB44;
  --pitch7-primary-channel: #B9FF79;
  --pitch7-secondary-channel: #8CFF4D;
  --pitch7-primary-note: #CCFFAA;
  --pitch7-secondary-note: #66BB44;
  --pitch8-primary-channel: #B9FF79;
  --pitch8-secondary-channel: #8CFF4D;
  --pitch8-primary-note: #CCFFAA;
  --pitch8-secondary-note: #66BB44;
  --pitch9-primary-channel: #B9FF79;
  --pitch9-secondary-channel: #8CFF4D;
  --pitch9-primary-note: #CCFFAA;
  --pitch9-secondary-note: #66BB44;
  --pitch10-primary-channel: #B9FF79;
  --pitch10-secondary-channel: #8CFF4D;
  --pitch10-primary-note: #CCFFAA;
  --pitch10-secondary-note: #66BB44;

  /* noise */
  --noise1-primary-channel: #B9FF79;
  --noise1-secondary-channel: #8CFF4D;
  --noise1-primary-note: #CCFFAA;
  --noise1-secondary-note: #66BB44;
  --noise2-primary-channel: #B9FF79;
  --noise2-secondary-channel: #8CFF4D;
  --noise2-primary-note: #CCFFAA;
  --noise2-secondary-note: #66BB44;
  --noise3-primary-channel: #B9FF79;
  --noise3-secondary-channel: #8CFF4D;
  --noise3-primary-note: #CCFFAA;
  --noise3-secondary-note: #66BB44;
  --noise4-primary-channel: #B9FF79;
  --noise4-secondary-channel: #8CFF4D;
  --noise4-primary-note: #CCFFAA;
  --noise4-secondary-note: #66BB44;
  --noise5-primary-channel: #B9FF79;
  --noise5-secondary-channel: #8CFF4D;
  --noise5-primary-note: #CCFFAA;
  --noise5-secondary-note: #66BB44;

  /* mod */
  --mod1-primary-channel: #B9FF79;
  --mod1-secondary-channel: #8CFF4D;
  --mod1-primary-note: #CCFFAA;
  --mod1-secondary-note: #66BB44;
  --mod2-primary-channel: #B9FF79;
  --mod2-secondary-channel: #8CFF4D;
  --mod2-primary-note: #CCFFAA;
  --mod2-secondary-note: #66BB44;
  --mod3-primary-channel: #B9FF79;
  --mod3-secondary-channel: #8CFF4D;
  --mod3-primary-note: #CCFFAA;
  --mod3-secondary-note: #66BB44;
  --mod4-primary-channel: #B9FF79;
  --mod4-secondary-channel: #8CFF4D;
  --mod4-primary-note: #CCFFAA;
  --mod4-secondary-note: #66BB44;

  --mod-label-primary: #D6FFD6;
  --mod-label-secondary-text: #1C3F1C;
  --mod-label-primary-text: #3E7A3E;
  --disabled-note-primary: #2C2C2C;
  --disabled-note-secondary: #1A1A1A;
}
`,
"grayscale":`
:root {
  --page-margin: #2A2A2A;
  --editor-background: #1A1A1A;
  --hover-preview: #E0E0E0;
  --playhead: #BFBFBF;
  --primary-text: #FFFFFF;
  --secondary-text: #CCCCCC;
  --inverted-text: #000000;
  --text-selection: #AAAAAA;
  --box-selection-fill: #777777;
  --loop-accent: #999999;
  --link-accent: #BBBBBB;
  --ui-widget-background: #333333;
  --ui-widget-focus: #555555;
  --pitch-background: #2A2A2A;
  --tonic: #999999;
  --fifth-note: #666666;
  --white-piano-key-color: #FFFFFF;
  --black-piano-key-color: #000000;
  --white-piano-key: #CCCCCC;
  --black-piano-key: #1A1A1A;
  --use-color-formula: false;
  --track-editor-bg-pitch: #3F3F3F;
  --track-editor-bg-pitch-dim: #2E2E2E;
  --track-editor-bg-noise: #4A4A4A;
  --track-editor-bg-noise-dim: #3D3D3D;
  --track-editor-bg-mod: #5C5C5C;
  --track-editor-bg-mod-dim: #6A6A6A;
  --multiplicative-mod-slider: #888888;
  --overwriting-mod-slider: #A0A0A0;
  --indicator-primary: #999999;
  --indicator-secondary: #777777;
  --select2-opt-group: #555555;
  --input-box-outline: #666666;
  --mute-button-normal: #DDDDDD;
  --mute-button-mod: #DDDDDD;

  /* kanały pitch */
  --pitch1-primary-channel: #999999;
  --pitch1-secondary-channel: #777777;
  --pitch1-primary-note: #AAAAAA;
  --pitch1-secondary-note: #555555;
  --pitch2-primary-channel: #999999;
  --pitch2-secondary-channel: #777777;
  --pitch2-primary-note: #AAAAAA;
  --pitch2-secondary-note: #555555;
  --pitch3-primary-channel: #999999;
  --pitch3-secondary-channel: #777777;
  --pitch3-primary-note: #AAAAAA;
  --pitch3-secondary-note: #555555;
  --pitch4-primary-channel: #999999;
  --pitch4-secondary-channel: #777777;
  --pitch4-primary-note: #AAAAAA;
  --pitch4-secondary-note: #555555;
  --pitch5-primary-channel: #999999;
  --pitch5-secondary-channel: #777777;
  --pitch5-primary-note: #AAAAAA;
  --pitch5-secondary-note: #555555;
  --pitch6-primary-channel: #999999;
  --pitch6-secondary-channel: #777777;
  --pitch6-primary-note: #AAAAAA;
  --pitch6-secondary-note: #555555;
  --pitch7-primary-channel: #999999;
  --pitch7-secondary-channel: #777777;
  --pitch7-primary-note: #AAAAAA;
  --pitch7-secondary-note: #555555;
  --pitch8-primary-channel: #999999;
  --pitch8-secondary-channel: #777777;
  --pitch8-primary-note: #AAAAAA;
  --pitch8-secondary-note: #555555;
  --pitch9-primary-channel: #999999;
  --pitch9-secondary-channel: #777777;
  --pitch9-primary-note: #AAAAAA;
  --pitch9-secondary-note: #555555;
  --pitch10-primary-channel: #999999;
  --pitch10-secondary-channel: #777777;
  --pitch10-primary-note: #AAAAAA;
  --pitch10-secondary-note: #555555;

  /* kanały noise */
  --noise1-primary-channel: #999999;
  --noise1-secondary-channel: #777777;
  --noise1-primary-note: #AAAAAA;
  --noise1-secondary-note: #555555;
  --noise2-primary-channel: #999999;
  --noise2-secondary-channel: #777777;
  --noise2-primary-note: #AAAAAA;
  --noise2-secondary-note: #555555;
  --noise3-primary-channel: #999999;
  --noise3-secondary-channel: #777777;
  --noise3-primary-note: #AAAAAA;
  --noise3-secondary-note: #555555;
  --noise4-primary-channel: #999999;
  --noise4-secondary-channel: #777777;
  --noise4-primary-note: #AAAAAA;
  --noise4-secondary-note: #555555;
  --noise5-primary-channel: #999999;
  --noise5-secondary-channel: #777777;
  --noise5-primary-note: #AAAAAA;
  --noise5-secondary-note: #555555;

  /* kanały mod */
  --mod1-primary-channel: #999999;
  --mod1-secondary-channel: #777777;
  --mod1-primary-note: #AAAAAA;
  --mod1-secondary-note: #555555;
  --mod2-primary-channel: #999999;
  --mod2-secondary-channel: #777777;
  --mod2-primary-note: #AAAAAA;
  --mod2-secondary-note: #555555;
  --mod3-primary-channel: #999999;
  --mod3-secondary-channel: #777777;
  --mod3-primary-note: #AAAAAA;
  --mod3-secondary-note: #555555;
  --mod4-primary-channel: #999999;
  --mod4-secondary-channel: #777777;
  --mod4-primary-note: #AAAAAA;
  --mod4-secondary-note: #555555;

  --mod-label-primary: #BBBBBB;
  --mod-label-secondary-text: #000000;
  --mod-label-primary-text: #666666;
  --disabled-note-primary: #444444;
  --disabled-note-secondary: #222222;
}
`,
 "coolblue":`
 :root {
  --page-margin: #0A3D80;
  --editor-background: #1A2C51;
  --hover-preview: #CFE8FF;
  --playhead: #00BFFF;
  --primary-text: #FFFFFF;
  --secondary-text: #A0CFFF;
  --inverted-text: #000000;
  --text-selection: #99CCFF;
  --box-selection-fill: #3377CC;
  --loop-accent: #66B2FF;
  --link-accent: #3399FF;
  --ui-widget-background: #264D80;
  --ui-widget-focus: #3A75C4;
  --pitch-background: #123466;
  --tonic: #4DA6FF;
  --fifth-note: #1E90FF;
  --white-piano-key-color: #000000;
  --black-piano-key-color: #ffffff;
  --white-piano-key: #A3D1FF;
  --black-piano-key: #1B2E4A;
  --use-color-formula: false;
  --track-editor-bg-pitch: #205BA6;
  --track-editor-bg-pitch-dim: #1A4A8C;
  --track-editor-bg-noise: #194780;
  --track-editor-bg-noise-dim: #336699;
  --track-editor-bg-mod: #2E5D99;
  --track-editor-bg-mod-dim: #4D88CC;
  --multiplicative-mod-slider: #3399FF;
  --overwriting-mod-slider: #66B2FF;
  --indicator-primary: #5599FF;
  --indicator-secondary: #4477CC;
  --select2-opt-group: #3A75C4;
  --input-box-outline: #1F4D99;
  --mute-button-normal: #DDEEFF;
  --mute-button-mod: #DDEEFF;

  /* kanały pitch */
  --pitch1-primary-channel: #3399FF;
  --pitch1-secondary-channel: #66B2FF;
  --pitch1-primary-note: #99CCFF;
  --pitch1-secondary-note: #336699;
  --pitch2-primary-channel: #3399FF;
  --pitch2-secondary-channel: #66B2FF;
  --pitch2-primary-note: #99CCFF;
  --pitch2-secondary-note: #336699;
  --pitch3-primary-channel: #3399FF;
  --pitch3-secondary-channel: #66B2FF;
  --pitch3-primary-note: #99CCFF;
  --pitch3-secondary-note: #336699;
  --pitch4-primary-channel: #3399FF;
  --pitch4-secondary-channel: #66B2FF;
  --pitch4-primary-note: #99CCFF;
  --pitch4-secondary-note: #336699;
  --pitch5-primary-channel: #3399FF;
  --pitch5-secondary-channel: #66B2FF;
  --pitch5-primary-note: #99CCFF;
  --pitch5-secondary-note: #336699;
  --pitch6-primary-channel: #3399FF;
  --pitch6-secondary-channel: #66B2FF;
  --pitch6-primary-note: #99CCFF;
  --pitch6-secondary-note: #336699;
  --pitch7-primary-channel: #3399FF;
  --pitch7-secondary-channel: #66B2FF;
  --pitch7-primary-note: #99CCFF;
  --pitch7-secondary-note: #336699;
  --pitch8-primary-channel: #3399FF;
  --pitch8-secondary-channel: #66B2FF;
  --pitch8-primary-note: #99CCFF;
  --pitch8-secondary-note: #336699;
  --pitch9-primary-channel: #3399FF;
  --pitch9-secondary-channel: #66B2FF;
  --pitch9-primary-note: #99CCFF;
  --pitch9-secondary-note: #336699;
  --pitch10-primary-channel: #3399FF;
  --pitch10-secondary-channel: #66B2FF;
  --pitch10-primary-note: #99CCFF;
  --pitch10-secondary-note: #336699;

  /* kanały noise */
  --noise1-primary-channel: #3399FF;
  --noise1-secondary-channel: #66B2FF;
  --noise1-primary-note: #99CCFF;
  --noise1-secondary-note: #336699;
  --noise2-primary-channel: #3399FF;
  --noise2-secondary-channel: #66B2FF;
  --noise2-primary-note: #99CCFF;
  --noise2-secondary-note: #336699;
  --noise3-primary-channel: #3399FF;
  --noise3-secondary-channel: #66B2FF;
  --noise3-primary-note: #99CCFF;
  --noise3-secondary-note: #336699;
  --noise4-primary-channel: #3399FF;
  --noise4-secondary-channel: #66B2FF;
  --noise4-primary-note: #99CCFF;
  --noise4-secondary-note: #336699;
  --noise5-primary-channel: #3399FF;
  --noise5-secondary-channel: #66B2FF;
  --noise5-primary-note: #99CCFF;
  --noise5-secondary-note: #336699;

  /* kanały mod */
  --mod1-primary-channel: #3399FF;
  --mod1-secondary-channel: #66B2FF;
  --mod1-primary-note: #99CCFF;
  --mod1-secondary-note: #336699;
  --mod2-primary-channel: #3399FF;
  --mod2-secondary-channel: #66B2FF;
  --mod2-primary-note: #99CCFF;
  --mod2-secondary-note: #336699;
  --mod3-primary-channel: #3399FF;
  --mod3-secondary-channel: #66B2FF;
  --mod3-primary-note: #99CCFF;
  --mod3-secondary-note: #336699;
  --mod4-primary-channel: #3399FF;
  --mod4-secondary-channel: #66B2FF;
  --mod4-primary-note: #99CCFF;
  --mod4-secondary-note: #336699;

  --mod-label-primary: #A3C2FF;
  --mod-label-secondary-text: #000000;
  --mod-label-primary-text: #336699;
  --disabled-note-primary: #445566;
  --disabled-note-secondary: #223344;
}
`,

"neon":`
:root {
  --page-margin: #000000;
  --editor-background: #000000;
  --hover-preview: #ffffff;
  --playhead: #00faff;
  --primary-text: #ccffff;
  --secondary-text: #66ffff;
  --inverted-text: #000000;
  --text-selection: rgba(0,255,255,0.3);
  --box-selection-fill: rgba(0,255,255,0.1);
  --loop-accent: #00faff;
  --link-accent: #66ffff;
  --ui-widget-background: #001030;
  --ui-widget-focus: #050505;
  --pitch-background: #101515;
  --tonic: #00faff;
  --fifth-note: #005f5f;
  --white-piano-key-color: #0ff;
  --black-piano-key-color: #0af;
  --white-piano-key: #003565;
  --black-piano-key: #001010;
  --use-color-formula: false;
  --track-editor-bg-pitch: #000000;
  --track-editor-bg-pitch-dim: #050505;
  --track-editor-bg-noise: #000000;
  --track-editor-bg-noise-dim: #050505;
  --track-editor-bg-mod: #000000;
  --track-editor-bg-mod-dim: #050505;
  --multiplicative-mod-slider: #00faff;
  --overwriting-mod-slider: #66ffff;
  --indicator-primary: #00faff;
  --indicator-secondary: #050505;
  --select2-opt-group: #050505;
  --input-box-outline: #050505;
  --mute-button-normal: #00cccc;
  --mute-button-mod: #66ffff;

  --pitch1-secondary-channel: #0ff;
  --pitch1-primary-channel: #00faff;
  --pitch1-secondary-note: #00dddd;
  --pitch1-primary-note: #ccffff;
  --pitch2-secondary-channel: #00cccc;
  --pitch2-primary-channel: #00faff;
  --pitch2-secondary-note: #00dddd;
  --pitch2-primary-note: #ccffff;
  --pitch3-secondary-channel: #00cccc;
  --pitch3-primary-channel: #00faff;
  --pitch3-secondary-note: #00dddd;
  --pitch3-primary-note: #ccffff;
  --pitch4-secondary-channel: #00cccc;
  --pitch4-primary-channel: #00faff;
  --pitch4-secondary-note: #00dddd;
  --pitch4-primary-note: #ccffff;
  --pitch5-secondary-channel: #00cccc;
  --pitch5-primary-channel: #00faff;
  --pitch5-secondary-note: #00dddd;
  --pitch5-primary-note: #ccffff;
  --pitch6-secondary-channel: #00cccc;
  --pitch6-primary-channel: #00faff;
  --pitch6-secondary-note: #00dddd;
  --pitch6-primary-note: #ccffff;
  --pitch7-secondary-channel: #00cccc;
  --pitch7-primary-channel: #00faff;
  --pitch7-secondary-note: #00dddd;
  --pitch7-primary-note: #ccffff;
  --pitch8-secondary-channel: #00cccc;
  --pitch8-primary-channel: #00faff;
  --pitch8-secondary-note: #00dddd;
  --pitch8-primary-note: #ccffff;
  --pitch9-secondary-channel: #00cccc;
  --pitch9-primary-channel: #00faff;
  --pitch9-secondary-note: #00dddd;
  --pitch9-primary-note: #ccffff;
  --pitch10-secondary-channel: #00cccc;
  --pitch10-primary-channel: #00faff;
  --pitch10-secondary-note: #00dddd;
  --pitch10-primary-note: #ccffff;

  --noise1-secondary-channel: #00cccc;
  --noise1-primary-channel: #00faff;
  --noise1-secondary-note: #00dddd;
  --noise1-primary-note: #ccffff;
  --noise2-secondary-channel: #00cccc;
  --noise2-primary-channel: #00faff;
  --noise2-secondary-note: #00dddd;
  --noise2-primary-note: #ccffff;
  --noise3-secondary-channel: #00cccc;
  --noise3-primary-channel: #00faff;
  --noise3-secondary-note: #00dddd;
  --noise3-primary-note: #ccffff;
  --noise4-secondary-channel: #00cccc;
  --noise4-primary-channel: #00faff;
  --noise4-secondary-note: #00dddd;
  --noise4-primary-note: #ccffff;
  --noise5-secondary-channel: #00cccc;
  --noise5-primary-channel: #00faff;
  --noise5-secondary-note: #00dddd;
  --noise5-primary-note: #ccffff;

  --mod1-secondary-channel: #00cccc;
  --mod1-primary-channel: #00faff;
  --mod1-secondary-note: #00dddd;
  --mod1-primary-note: #ccffff;
  --mod2-secondary-channel: #00cccc;
  --mod2-primary-channel: #00faff;
  --mod2-secondary-note: #00dddd;
  --mod2-primary-note: #ccffff;
  --mod3-secondary-channel: #00cccc;
  --mod3-primary-channel: #00faff;
  --mod3-secondary-note: #00dddd;
  --mod3-primary-note: #ccffff;
  --mod4-secondary-channel: #00cccc;
  --mod4-primary-channel: #00faff;
  --mod4-secondary-note: #00dddd;
  --mod4-primary-note: #ccffff;

  --mod-label-primary: #66ffff;
  --mod-label-secondary-text: #000000;
  --mod-label-primary-text: #ccffff;
  --disabled-note-primary: #444;
  --disabled-note-secondary: #222;
}


`,
"yellowed":`
:root {
  --page-margin: #79840A;
  --editor-background: #514418;
  --hover-preview: #ffffff;
  --playhead: #FFF600;
  --primary-text: #FFFFFF;
  --secondary-text: #FFFFFF;
  --inverted-text: #FFFFFF;
  --text-selection: #FFFFFF;
  --box-selection-fill: #999999;
  --loop-accent: #F2C80D;
  --link-accent: #FDCF08;
  --ui-widget-background: #B99219;
  --ui-widget-focus: #FFB237;
  --pitch-background: #736412;
  --tonic: #F5D43A;
  --fifth-note: #BEBA00;
  --white-piano-key-color: #FFFFFF;
  --black-piano-key-color: #000000;
  --white-piano-key: #FFB901;
  --black-piano-key: #403517;
  --use-color-formula: false;
  --track-editor-bg-pitch: #B28510;
  --track-editor-bg-pitch-dim: #9B732A;
  --track-editor-bg-noise: #A57B1A;
  --track-editor-bg-noise-dim: #D1841A;
  --track-editor-bg-mod: #97880C;
  --track-editor-bg-mod-dim: #D9C33C;
  --multiplicative-mod-slider: #EBAF05;
  --overwriting-mod-slider: #FFBD0D;
  --indicator-primary: #D0AB1A;
  --indicator-secondary: #A99D0A;
  --select2-opt-group: #C89C1B;
  --input-box-outline: #A48618;
  --mute-button-normal: #FFF2CA;
  --mute-button-mod: #FFF2CA;

  --pitch1-secondary-channel: #FFDD0D;
  --pitch1-primary-channel: #E8CA41;
  --pitch1-secondary-note: #AF7D15;
  --pitch1-primary-note: #F9E77A;
  --pitch2-secondary-channel: #FFDD0D;
  --pitch2-primary-channel: #E8CA41;
  --pitch2-secondary-note: #AF7D15;
  --pitch2-primary-note: #F9E77A;
  --pitch3-secondary-channel: #FFDD0D;
  --pitch3-primary-channel: #E8CA41;
  --pitch3-secondary-note: #AF7D15;
  --pitch3-primary-note: #F9E77A;
  --pitch4-secondary-channel: #FFDD0D;
  --pitch4-primary-channel: #E8CA41;
  --pitch4-secondary-note: #AF7D15;
  --pitch4-primary-note: #F9E77A;
  --pitch5-secondary-channel: #FFDD0D;
  --pitch5-primary-channel: #E8CA41;
  --pitch5-secondary-note: #AF7D15;
  --pitch5-primary-note: #F9E77A;
  --pitch6-secondary-channel: #FFDD0D;
  --pitch6-primary-channel: #E8CA41;
  --pitch6-secondary-note: #AF7D15;
  --pitch6-primary-note: #F9E77A;
  --pitch7-secondary-channel: #FFDD0D;
  --pitch7-primary-channel: #E8CA41;
  --pitch7-secondary-note: #AF7D15;
  --pitch7-primary-note: #F9E77A;
  --pitch8-secondary-channel: #FFDD0D;
  --pitch8-primary-channel: #E8CA41;
  --pitch8-secondary-note: #AF7D15;
  --pitch8-primary-note: #F9E77A;
  --pitch9-secondary-channel: #FFDD0D;
  --pitch9-primary-channel: #E8CA41;
  --pitch9-secondary-note: #AF7D15;
  --pitch9-primary-note: #F9E77A;
  --pitch10-secondary-channel: #FFDD0D;
  --pitch10-primary-channel: #E8CA41;
  --pitch10-secondary-note: #AF7D15;
  --pitch10-primary-note: #F9E77A;

  --noise1-secondary-channel: #FFDD0D;
  --noise1-primary-channel: #E8CA41;
  --noise1-secondary-note: #AF7D15;
  --noise1-primary-note: #F9E77A;
  --noise2-secondary-channel: #FFDD0D;
  --noise2-primary-channel: #E8CA41;
  --noise2-secondary-note: #AF7D15;
  --noise2-primary-note: #F9E77A;
  --noise3-secondary-channel: #FFDD0D;
  --noise3-primary-channel: #E8CA41;
  --noise3-secondary-note: #AF7D15;
  --noise3-primary-note: #F9E77A;
  --noise4-secondary-channel: #FFDD0D;
  --noise4-primary-channel: #E8CA41;
  --noise4-secondary-note: #AF7D15;
  --noise4-primary-note: #F9E77A;
  --noise5-secondary-channel: #FFDD0D;
  --noise5-primary-channel: #E8CA41;
  --noise5-secondary-note: #AF7D15;
  --noise5-primary-note: #F9E77A;

  --mod1-secondary-channel: #FFDD0D;
  --mod1-primary-channel: #E8CA41;
  --mod1-secondary-note: #AF7D15;
  --mod1-primary-note: #F9E77A;
  --mod2-secondary-channel: #FFDD0D;
  --mod2-primary-channel: #E8CA41;
  --mod2-secondary-note: #AF7D15;
  --mod2-primary-note: #F9E77A;
  --mod3-secondary-channel: #FFDD0D;
  --mod3-primary-channel: #E8CA41;
  --mod3-secondary-note: #AF7D15;
  --mod3-primary-note: #F9E77A;
  --mod4-secondary-channel: #FFDD0D;
  --mod4-primary-channel: #E8CA41;
  --mod4-secondary-note: #AF7D15;
  --mod4-primary-note: #F9E77A;

  --mod-label-primary: #BBC1C1;
  --mod-label-secondary-text: #000000;
  --mod-label-primary-text: #747878;
  --disabled-note-primary: #444;
  --disabled-note-secondary: #222;
}

`,
"greenish":`

:root {
  --page-margin: #000000;
  --editor-background: #121212;
  --hover-preview: #ffffff;
  --playhead: #424643;
  --primary-text: #979797;
  --secondary-text: #979797;
  --inverted-text: #979797;
  --text-selection: #979797;
  --box-selection-fill: #4D4D4D;
  --loop-accent: #384239;
  --link-accent: #303932;
  --ui-widget-background: #202020;
  --ui-widget-focus: #232322;
  --pitch-background: #181A18;
  --tonic: #3C3F3C;
  --fifth-note: #292D29;
  --white-piano-key-color: #202020;
  --black-piano-key-color: #B3B3B3;
  --white-piano-key: #606560;
  --black-piano-key: #1C1D1C;
  --use-color-formula: false;
  --track-editor-bg-pitch: #222222;
  --track-editor-bg-pitch-dim: #050505;
  --track-editor-bg-noise: #0B0B0A;
  --track-editor-bg-noise-dim: #050505;
  --track-editor-bg-mod: #000000;
  --track-editor-bg-mod-dim: #050505;
  --multiplicative-mod-slider: #363B37;
  --overwriting-mod-slider: #2B2E2B;
  --indicator-primary: #454D46;
  --indicator-secondary: #121212;
  --select2-opt-group: #0D0D0D;
  --input-box-outline: #050505;
  --mute-button-normal: #3A403C;
  --mute-button-mod: #3B3F3A;

  --pitch1-secondary-channel: #333534;
  --pitch1-primary-channel: #383B38;
  --pitch1-secondary-note: #262926;
  --pitch1-primary-note: #8A8A8A;
  --pitch2-secondary-channel: #333534;
  --pitch2-primary-channel: #383B38;
  --pitch2-secondary-note: #262926;
  --pitch2-primary-note: #8A8A8A;
  --pitch3-secondary-channel: #333534;
  --pitch3-primary-channel: #383B38;
  --pitch3-secondary-note: #262926;
  --pitch3-primary-note: #8A8A8A;
  --pitch4-secondary-channel: #333534;
  --pitch4-primary-channel: #383B38;
  --pitch4-secondary-note: #262926;
  --pitch4-primary-note: #8A8A8A;
  --pitch5-secondary-channel: #333534;
  --pitch5-primary-channel: #383B38;
  --pitch5-secondary-note: #262926;
  --pitch5-primary-note: #8A8A8A;
  --pitch6-secondary-channel: #333534;
  --pitch6-primary-channel: #383B38;
  --pitch6-secondary-note: #262926;
  --pitch6-primary-note: #8A8A8A;
  --pitch7-secondary-channel: #333534;
  --pitch7-primary-channel: #383B38;
  --pitch7-secondary-note: #262926;
  --pitch7-primary-note: #8A8A8A;
  --pitch8-secondary-channel: #333534;
  --pitch8-primary-channel: #383B38;
  --pitch8-secondary-note: #262926;
  --pitch8-primary-note: #8A8A8A;
  --pitch9-secondary-channel: #333534;
  --pitch9-primary-channel: #383B38;
  --pitch9-secondary-note: #262926;
  --pitch9-primary-note: #8A8A8A;
  --pitch10-secondary-channel: #333534;
  --pitch10-primary-channel: #383B38;
  --pitch10-secondary-note: #262926;
  --pitch10-primary-note: #8A8A8A;

  --noise1-secondary-channel: #333534;
  --noise1-primary-channel: #383B38;
  --noise1-secondary-note: #262926;
  --noise1-primary-note: #8A8A8A;
  --noise2-secondary-channel: #333534;
  --noise2-primary-channel: #383B38;
  --noise2-secondary-note: #262926;
  --noise2-primary-note: #8A8A8A;
  --noise3-secondary-channel: #333534;
  --noise3-primary-channel: #383B38;
  --noise3-secondary-note: #262926;
  --noise3-primary-note: #8A8A8A;
  --noise4-secondary-channel: #333534;
  --noise4-primary-channel: #383B38;
  --noise4-secondary-note: #262926;
  --noise4-primary-note: #8A8A8A;
  --noise5-secondary-channel: #333534;
  --noise5-primary-channel: #383B38;
  --noise5-secondary-note: #262926;
  --noise5-primary-note: #8A8A8A;

  --mod1-secondary-channel: #333534;
  --mod1-primary-channel: #383B38;
  --mod1-secondary-note: #262926;
  --mod1-primary-note: #8A8A8A;
  --mod2-secondary-channel: #333534;
  --mod2-primary-channel: #383B38;
  --mod2-secondary-note: #262926;
  --mod2-primary-note: #8A8A8A;
  --mod3-secondary-channel: #333534;
  --mod3-primary-channel: #383B38;
  --mod3-secondary-note: #262926;
  --mod3-primary-note: #8A8A8A;
  --mod4-secondary-channel: #333534;
  --mod4-primary-channel: #383B38;
  --mod4-secondary-note: #262926;
  --mod4-primary-note: #8A8A8A;

  --mod-label-primary: #BBC1C1;
  --mod-label-secondary-text: #000000;
  --mod-label-primary-text: #747878;
  --disabled-note-primary: #444;
  --disabled-note-secondary: #222;
}



`,
 
"forest": `
				:root {
					--page-margin: #010c03;
					--editor-background: #010c03;
					--hover-preview: #efe;
					--playhead: rgba(232, 255, 232, 0.9);
					--primary-text: #efe;
					--secondary-text: #70A070;
					--inverted-text: #280228;
					--text-selection: rgba(255,68,199,0.99);
					--box-selection-fill: #267aa3;
					--loop-accent: #ffe845;
					--link-accent: #9f8;
					--ui-widget-background: #203829;
					--ui-widget-focus: #487860;
					--pitch-background: #203829;
					--tonic: #2b8d20;
					--fifth-note: #385840;
					--white-piano-key: #bda;
					--black-piano-key: #573;
					--use-color-formula: true;
					--track-editor-bg-pitch: #254820;
					--track-editor-bg-pitch-dim: #102819;
					--track-editor-bg-noise: #304050;
					--track-editor-bg-noise-dim: #102030;
					--track-editor-bg-mod: #506030;
					--track-editor-bg-mod-dim: #2a300a;
					--multiplicative-mod-slider: #205c8f;
					--overwriting-mod-slider: #20ac6f;
					--indicator-primary: #dcd866;
					--indicator-secondary: #203829;
					--select2-opt-group: #1a6f5a;
					--input-box-outline: #242;
					--mute-button-normal: #49e980;
					--mute-button-mod: #c2e502;
					--mod-label-primary: #133613;
					--mod-label-secondary-text: rgb(27, 126, 40);
					--mod-label-primary-text: #efe;
					--pitch-secondary-channel-hue: 120;
					--pitch-secondary-channel-hue-scale: 8.1;
					--pitch-secondary-channel-sat: 59;
					--pitch-secondary-channel-sat-scale: 0.1;
					--pitch-secondary-channel-lum: 50;
					--pitch-secondary-channel-lum-scale: 0.04;
					--pitch-primary-channel-hue: 120;
					--pitch-primary-channel-hue-scale: 8.1;
					--pitch-primary-channel-sat: 86;
					--pitch-primary-channel-sat-scale: 0.1;
					--pitch-primary-channel-lum: 70;
					--pitch-primary-channel-lum-scale: 0.04;
					--pitch-secondary-note-hue: 120;
					--pitch-secondary-note-hue-scale: 8.1;
					--pitch-secondary-note-sat: 85;
					--pitch-secondary-note-sat-scale: 0.1;
					--pitch-secondary-note-lum: 30;
					--pitch-secondary-note-lum-scale: 0.04;
					--pitch-primary-note-hue: 120;
					--pitch-primary-note-hue-scale: 8.1;
					--pitch-primary-note-sat: 90;
					--pitch-primary-note-sat-scale: 0.05;
					--pitch-primary-note-lum: 80;
					--pitch-primary-note-lum-scale: 0.025;
					--noise-secondary-channel-hue: 200;
					--noise-secondary-channel-hue-scale: 1.1;
					--noise-secondary-channel-sat: 25;
					--noise-secondary-channel-sat-scale: 0;
					--noise-secondary-channel-lum: 22;
					--noise-secondary-channel-lum-scale: 0;
					--noise-primary-channel-hue: 200;
					--noise-primary-channel-hue-scale: 1.1;
					--noise-primary-channel-sat: 48;
					--noise-primary-channel-sat-scale: 0;
					--noise-primary-channel-lum: 65;
					--noise-primary-channel-lum-scale: 0;
					--noise-secondary-note-hue: 200;
					--noise-secondary-note-hue-scale: 1.1;
					--noise-secondary-note-sat: 33.5;
					--noise-secondary-note-sat-scale: 0;
					--noise-secondary-note-lum: 33;
					--noise-secondary-note-lum-scale: 0;
					--noise-primary-note-hue: 200;
					--noise-primary-note-hue-scale: 1.1;
					--noise-primary-note-sat: 46.5;
					--noise-primary-note-sat-scale: 0;
					--noise-primary-note-lum: 64;
					--noise-primary-note-lum-scale: 0;
					--mod-secondary-channel-hue: 40;
					--mod-secondary-channel-hue-scale: 1.8;
					--mod-secondary-channel-sat: 44;
					--mod-secondary-channel-sat-scale: 0;
					--mod-secondary-channel-lum: 50;
					--mod-secondary-channel-lum-scale: 0;
					--mod-primary-channel-hue: 40;
					--mod-primary-channel-hue-scale: 1.8;
					--mod-primary-channel-sat: 60;
					--mod-primary-channel-sat-scale: 0;
					--mod-primary-channel-lum: 80;
					--mod-primary-channel-lum-scale: 0;
					--mod-secondary-note-hue: 40;
					--mod-secondary-note-hue-scale: 1.8;
					--mod-secondary-note-sat: 62;
					--mod-secondary-note-sat-scale: 0;
					--mod-secondary-note-lum: 55;
					--mod-secondary-note-lum-scale: 0;
					--mod-primary-note-hue: 40;
					--mod-primary-note-hue-scale: 1.8;
					--mod-primary-note-sat: 66;
					--mod-primary-note-sat-scale: 0;
					--mod-primary-note-lum: 85;
					--mod-primary-note-lum-scale: 0;
					--disabled-note-primary:    #536e5c;
					--disabled-note-secondary:  #395440;
				}
			`,
 

		"fruit": `
		:root {
			--page-margin: #040507;
			--editor-background: #040507;
			--hover-preview: white;
			--playhead: white;
			--primary-text: white;
			--secondary-text: #999;
			--inverted-text: black;
			--text-selection: rgb(115 103 76);
			--box-selection-fill: rgb(174 109 73 / 45%);
			--loop-accent: #EC897D;
			--link-accent: #FDE484;
			--ui-widget-background: #22222c;
			--ui-widget-focus: #39394c;
			--pitch-background: #101010;
			--tonic: #2c2d34;
			--fifth-note: #191a20;
			--white-piano-key: #bbbaba;
			--black-piano-key: #2d2d2d;
			--use-color-formula: false;
			--track-editor-bg-pitch: #2b2d40;
			--track-editor-bg-pitch-dim: #191a25;
			--track-editor-bg-noise: #3c3644;
			--track-editor-bg-noise-dim: #26222b;
			--track-editor-bg-mod: #322a2a;
			--track-editor-bg-mod-dim: #191515;
			--multiplicative-mod-slider: #977da9;
			--overwriting-mod-slider: #798FA7;
			--indicator-primary: #EAAC9D;
			--indicator-secondary: #5e413a;
			--select2-opt-group: #191920;
			--input-box-outline: #191920;
			--mute-button-normal: #798FA7;
			--mute-button-mod: #354457;
			--pitch1-secondary-channel: #91655a;
			--pitch1-primary-channel: #EAAC9D;
			--pitch1-secondary-note: #91655a;
			--pitch1-primary-note: #EAAC9D;
			--pitch2-secondary-channel: #8f6513;
			--pitch2-primary-channel: #FFAF12;
			--pitch2-secondary-note: #8f6513;
			--pitch2-primary-note: #FFAF12;
			--pitch3-secondary-channel: #212f46;
			--pitch3-primary-channel: #34558B;
			--pitch3-secondary-note: #212f46;
			--pitch3-primary-note: #34558B;
			--pitch4-secondary-channel: #2e6b5b;
			--pitch4-primary-channel: #4EC5A7;
			--pitch4-secondary-note: #2e6b5b;
			--pitch4-primary-note: #4EC5A7;
			--pitch5-secondary-channel: #555D46;
			--pitch5-primary-channel: #aabf84;
			--pitch5-secondary-note: #555D46;
			--pitch5-primary-note: #aabf84;
			--pitch6-secondary-channel: #A2553B;
			--pitch6-primary-channel: #e59a81;
			--pitch6-secondary-note: #A2553B;
			--pitch6-primary-note: #e59a81;
			--pitch7-secondary-channel: #7b4021;
			--pitch7-primary-channel: #FE813E;
			--pitch7-secondary-note: #7b4021;
			--pitch7-primary-note: #FE813E;
			--pitch8-secondary-channel: #847753;
			--pitch8-primary-channel: #EFDAA3;
			--pitch8-secondary-note: #847753;
			--pitch8-primary-note: #EFDAA3;
			--pitch9-secondary-channel: #2c3642;
			--pitch9-primary-channel: #798FA7;
			--pitch9-secondary-note: #2c3642;
			--pitch9-primary-note: #798FA7;
			--pitch10-secondary-channel: #0d4453;
			--pitch10-primary-channel: #107895;
			--pitch10-secondary-note: #0d4453;
			--pitch10-primary-note: #107895;
			--noise1-secondary-channel: #71617C;
			--noise1-primary-channel: #977da9;
			--noise1-secondary-note: #71617C;
			--noise1-primary-note: #977da9;
			--noise2-secondary-channel: #3B3D4A;
			--noise2-primary-channel: #707591;
			--noise2-secondary-note: #3B3D4A;
			--noise2-primary-note: #707591;
			--noise3-secondary-channel: #625f5e;
			--noise3-primary-channel: #A19D9C;
			--noise3-secondary-note: #625f5e;
			--noise3-primary-note: #A19D9C;
			--noise4-secondary-channel: #ab847b;
			--noise4-primary-channel: #EAAC9D;
			--noise4-secondary-note: #ab847b;
			--noise4-primary-note: #EAAC9D;
			--noise5-secondary-channel: #B49D74;
			--noise5-primary-channel: #dec69b;
			--noise5-secondary-note: #B49D74;
			--noise5-primary-note: #dec69b;
			--mod1-secondary-channel: #722124;
			--mod1-primary-channel: #D13A41;
			--mod1-secondary-note: #722124;
			--mod1-primary-note: #D13A41;
			--mod2-secondary-channel: #213657;
			--mod2-primary-channel: #34558B;
			--mod2-secondary-note: #213657;
			--mod2-primary-note: #34558B;
			--mod3-secondary-channel: #555D46;
			--mod3-primary-channel: #848f6d;
			--mod3-secondary-note: #555D46;
			--mod3-primary-note: #848f6d;
			--mod4-secondary-channel: #71617C;
			--mod4-primary-channel: #a68ab9;
			--mod4-secondary-note: #71617C;
			--mod4-primary-note: #a68ab9;
			--mod-label-primary: #282828;
			--mod-label-secondary-text: #707070;
			--mod-label-primary-text: white;
			--disabled-note-primary: #5d5d5d;
			--disabled-note-secondary: #292929;
		}`,
		"dark-monoKai": `
    :root {
        --page-margin: #272822;
        --editor-background: #272822;
        --hover-preview: #F8F8F2;
        --playhead: #F8F8F2;
        --primary-text: #F8F8F2;
        --secondary-text: #75715E;
        --inverted-text: #272822;
        --text-selection: rgba(119,68,255,0.99);
        --box-selection-fill: rgba(255,255,255,0.2);
        --loop-accent: #A6E22E;
        --link-accent: #66D9EF;
        --ui-widget-background: #3E3D32;
        --ui-widget-focus: #75715E;
        --pitch-background: #3E3D32;
        --tonic: #AE81FF;
        --fifth-note: #F92672;
        --white-piano-key: #F8F8F2;
        --black-piano-key: #75715E;
        --use-color-formula: false;
        --track-editor-bg-pitch: #3E3D32;
        --track-editor-bg-pitch-dim: #272822;
        --track-editor-bg-noise: #3E3D32;
        --track-editor-bg-noise-dim: #272822;
        --track-editor-bg-mod: #A6E22E;
        --track-editor-bg-mod-dim: #7587A6;
        --multiplicative-mod-slider: #66D9EF;
        --overwriting-mod-slider: #F92672;
        --indicator-primary: #A6E22E;
        --indicator-secondary: #272822;
        --select2-opt-group: #585858;
        --input-box-outline: #75715E;
        --mute-button-normal: #FF6600;
        --mute-button-mod: #9A6BFF;
        --pitch1-secondary-channel: #66D9EF;
        --pitch1-primary-channel:   #A6E22E;
        --pitch1-secondary-note:    #4A90E2;
        --pitch1-primary-note:      #A6E22E;
        --pitch2-secondary-channel: #F92672;
        --pitch2-primary-channel:   #FF8C00;
        --pitch2-secondary-note:    #F92672;
        --pitch2-primary-note:      #FF8C00;
        --pitch3-secondary-channel: #F8F8F2;
        --pitch3-primary-channel:   #66D9EF;
        --pitch3-secondary-note:    #4A90E2;
        --pitch3-primary-note:      #66D9EF;
        --pitch4-secondary-channel: #A6E22E;
        --pitch4-primary-channel:   #F8F8F2;
        --pitch4-secondary-note:    #8ABF26;
        --pitch4-primary-note:      #A6E22E;
        --pitch5-secondary-channel: #F92672;
        --pitch5-primary-channel:   #F8F8F2;
        --pitch5-secondary-note:    #B82500;
        --pitch5-primary-note:      #F92672;
        --pitch6-secondary-channel: #75715E;
        --pitch6-primary-channel:   #A6E22E;
        --pitch6-secondary-note:    #7F7F7F;
        --pitch6-primary-note:      #A6E22E;
        --pitch7-secondary-channel: #F8F8F2;
        --pitch7-primary-channel:   #66D9EF;
        --pitch7-secondary-note:    #7F7F7F;
        --pitch7-primary-note:      #66D9EF;
        --pitch8-secondary-channel: #FF8C00;
        --pitch8-primary-channel:   #A6E22E;
        --pitch8-secondary-note:    #F92672;
        --pitch8-primary-note:      #FF8C00;
        --pitch9-secondary-channel: #A6E22E;
        --pitch9-primary-channel:   #66D9EF;
        --pitch9-secondary-note:    #66D9EF;
        --pitch9-primary-note:      #A6E22E;
        --pitch10-secondary-channel: #F92672;
        --pitch10-primary-channel:  #FF8C00;
        --pitch10-secondary-note:   #B82500;
        --pitch10-primary-note:     #F8F8F2;
        --noise1-secondary-channel: #BEBEBE;
        --noise1-primary-channel:   #C4C4C4;
        --noise1-secondary-note:    #D0D0D0;
        --noise1-primary-note:      #C8C8C8;
        --noise2-secondary-channel: #75715E;
        --noise2-primary-channel:   #F8F8F2;
        --noise2-secondary-note:    #7F7F7F;
        --noise2-primary-note:      #75715E;
        --noise3-secondary-channel: #A6E22E;
        --noise3-primary-channel:   #66D9EF;
        --noise3-secondary-note:    #A6E22E;
        --noise3-primary-note:      #66D9EF;
        --noise4-secondary-channel: #D0D0D0;
        --noise4-primary-channel:   #75715E;
        --noise4-secondary-note:    #C8C8C8;
        --noise4-primary-note:      #A6E22E;
        --noise5-secondary-channel: #A6E22E;
        --noise5-primary-channel:   #F8F8F2;
        --noise5-secondary-note:    #F8F8F2;
        --noise5-primary-note:      #A6E22E;
        --mod1-secondary-channel:   #66D9EF;
        --mod1-primary-channel:     #FF8C00;
        --mod1-secondary-note:      #66D9EF;
        --mod1-primary-note:        #FF8C00;
        --mod2-secondary-channel:   #F92672;
        --mod2-primary-channel:     #FF8C00;
        --mod2-secondary-note:      #F92672;
        --mod2-primary-note:        #FF8C00;
        --mod3-secondary-channel:   #A6E22E;
        --mod3-primary-channel:     #66D9EF;
        --mod3-secondary-note:      #A6E22E;
        --mod3-primary-note:        #66D9EF;
        --mod4-secondary-channel:   #75715E;
        --mod4-primary-channel:     #A6E22E;
        --mod4-secondary-note:      #75715E;
        --mod4-primary-note:        #66D9EF;
        --mod-label-primary:        #F8F8F2;
        --mod-label-secondary-text: #75715E;
        --mod-label-primary-text:   #A6E22E;
        --disabled-note-primary:    #75715E;
        --disabled-note-secondary:  #BEBEBE;
    }
`,
"dark-dracula": `
    :root {
        --page-margin: #282A36;
        --editor-background: #282A36;
        --hover-preview: #F8F8F2;
        --playhead: #F8F8F2;
        --primary-text: #F8F8F2;
        --secondary-text: #6272A4;
        --inverted-text: #282A36;
        --text-selection: rgba(139,233,253,0.8);
        --box-selection-fill: rgba(255,255,255,0.1);
        --loop-accent: #FF79C6;
        --link-accent: #8BE9FD;
        --ui-widget-background: #44475A;
        --ui-widget-focus: #6272A4;
        --pitch-background: #44475A;
        --tonic: #50FA7B;
        --fifth-note: #FFB86C;
        --white-piano-key: #F8F8F2;
        --black-piano-key: #6272A4;
        --use-color-formula: false;
        --track-editor-bg-pitch: #44475A;
        --track-editor-bg-pitch-dim: #282A36;
        --track-editor-bg-noise: #44475A;
        --track-editor-bg-noise-dim: #282A36;
        --track-editor-bg-mod: #FF79C6;
        --track-editor-bg-mod-dim: #8BE9FD;
        --multiplicative-mod-slider: #8BE9FD;
        --overwriting-mod-slider: #FF79C6;
        --indicator-primary: #FF79C6;
        --indicator-secondary: #282A36;
        --select2-opt-group: #585858;
        --input-box-outline: #6272A4;
        --mute-button-normal: #FF5555;
        --mute-button-mod: #BD93F9;
        --pitch1-secondary-channel: #8BE9FD;
        --pitch1-primary-channel:   #50FA7B;
        --pitch1-secondary-note:    #8BE9FD;
        --pitch1-primary-note:      #50FA7B;
        --pitch2-secondary-channel: #FF79C6;
        --pitch2-primary-channel:   #FFB86C;
        --pitch2-secondary-note:    #FF79C6;
        --pitch2-primary-note:      #FFB86C;
        --pitch3-secondary-channel: #F8F8F2;
        --pitch3-primary-channel:   #8BE9FD;
        --pitch3-secondary-note:    #50FA7B;
        --pitch3-primary-note:      #8BE9FD;
        --pitch4-secondary-channel: #50FA7B;
        --pitch4-primary-channel:   #FF79C6;
        --pitch4-secondary-note:    #8BE9FD;
        --pitch4-primary-note:      #50FA7B;
        --pitch5-secondary-channel: #FFB86C;
        --pitch5-primary-channel:   #BD93F9;
        --pitch5-secondary-note:    #FF79C6;
        --pitch5-primary-note:      #BD93F9;
        --pitch6-secondary-channel: #6272A4;
        --pitch6-primary-channel:   #50FA7B;
        --pitch6-secondary-note:    #F8F8F2;
        --pitch6-primary-note:      #6272A4;
        --pitch7-secondary-channel: #FF79C6;
        --pitch7-primary-channel:   #50FA7B;
        --pitch7-secondary-note:    #BD93F9;
        --pitch7-primary-note:      #FF79C6;
        --pitch8-secondary-channel: #8BE9FD;
        --pitch8-primary-channel:   #FFB86C;
        --pitch8-secondary-note:    #FF79C6;
        --pitch8-primary-note:      #FFB86C;
        --pitch9-secondary-channel: #50FA7B;
        --pitch9-primary-channel:   #FF5555;
        --pitch9-secondary-note:    #8BE9FD;
        --pitch9-primary-note:      #FF5555;
        --pitch10-secondary-channel: #FF79C6;
        --pitch10-primary-channel:  #FFB86C;
        --pitch10-secondary-note:   #FF79C6;
        --pitch10-primary-note:     #F8F8F2;
        --noise1-secondary-channel: #6272A4;
        --noise1-primary-channel:   #8BE9FD;
        --noise1-secondary-note:    #50FA7B;
        --noise1-primary-note:      #8BE9FD;
        --noise2-secondary-channel: #FF79C6;
        --noise2-primary-channel:   #FFB86C;
        --noise2-secondary-note:    #F8F8F2;
        --noise2-primary-note:      #FF79C6;
        --noise3-secondary-channel: #FF5555;
        --noise3-primary-channel:   #BD93F9;
        --noise3-secondary-note:    #FF5555;
        --noise3-primary-note:      #BD93F9;
        --noise4-secondary-channel: #F8F8F2;
        --noise4-primary-channel:   #6272A4;
        --noise4-secondary-note:    #6272A4;
        --noise4-primary-note:      #50FA7B;
        --noise5-secondary-channel: #8BE9FD;
        --noise5-primary-channel:   #FF79C6;
        --noise5-secondary-note:    #6272A4;
        --noise5-primary-note:      #F8F8F2;
        --mod1-secondary-channel:   #6272A4;
        --mod1-primary-channel:     #FF5555;
        --mod1-secondary-note:      #8BE9FD;
        --mod1-primary-note:        #FF5555;
        --mod2-secondary-channel:   #FF79C6;
        --mod2-primary-channel:     #BD93F9;
        --mod2-secondary-note:      #FF79C6;
        --mod2-primary-note:        #BD93F9;
        --mod3-secondary-channel:   #50FA7B;
        --mod3-primary-channel:     #F8F8F2;
        --mod3-secondary-note:      #50FA7B;
        --mod3-primary-note:        #8BE9FD;
        --mod4-secondary-channel:   #FF5555;
        --mod4-primary-channel:     #8BE9FD;
        --mod4-secondary-note:      #FF5555;
        --mod4-primary-note:        #6272A4;
        --mod-label-primary:        #F8F8F2;
        --mod-label-secondary-text: #6272A4;
        --mod-label-primary-text:   #F8F8F2;
        --disabled-note-primary:    #6272A4;
        --disabled-note-secondary:  #44475A;
    }
`,
		"funkylight": `
:root {
  --page-margin: #fff8e7;
  --editor-background: #fffef9;
  --hover-preview: #222;
  --playhead: #ff00cc;
  --primary-text: #333;
  --secondary-text: #777;
  --inverted-text: #ffffff;
  --text-selection: #ffb347;
  --box-selection-fill: rgba(255, 0, 204, 0.3);
  --loop-accent: #ff00cc;
  --link-accent: #00cfff;
  --ui-widget-background: #fff0e5;
  --ui-widget-focus: #ffe0cc;
  --pitch-background: #fffaf2;
  --tonic: #ffcc00;
  --fifth-note: #ff9966;
  --white-piano-key: #ffffff;
  --black-piano-key: #333;
  --use-color-formula: false;
  --track-editor-bg-pitch: #fdf5e6;
  --track-editor-bg-pitch-dim: #f4e8d4;
  --track-editor-bg-noise: #ffeedd;
  --track-editor-bg-noise-dim: #f7ddcc;
  --track-editor-bg-mod: #fce0ff;
  --track-editor-bg-mod-dim: #eed0f5;
  --multiplicative-mod-slider: #ff66cc;
  --overwriting-mod-slider: #00bfff;
  --indicator-primary: #ff1493;
  --indicator-secondary: #ff69b4;
  --select2-opt-group: #ffe4f0;
  --input-box-outline: #ffb6c1;
  --mute-button-normal: #ffaa00;
  --mute-button-mod: #d400ff;
  --pitch1-secondary-channel: #ffa07a;
  --pitch1-primary-channel: #ff4500;
  --pitch1-secondary-note: #ff8c69;
  --pitch1-primary-note: #ff6347;
  --pitch2-secondary-channel: #adff2f;
  --pitch2-primary-channel: #7fff00;
  --pitch2-secondary-note: #9acd32;
  --pitch2-primary-note: #32cd32;
  --pitch3-secondary-channel: #87cefa;
  --pitch3-primary-channel: #1e90ff;
  --pitch3-secondary-note: #00bfff;
  --pitch3-primary-note: #4682b4;
  --pitch4-secondary-channel: #dda0dd;
  --pitch4-primary-channel: #ba55d3;
  --pitch4-secondary-note: #ee82ee;
  --pitch4-primary-note: #da70d6;
  --pitch5-secondary-channel: #ffdb58;
  --pitch5-primary-channel: #ffd700;
  --pitch5-secondary-note: #ffc107;
  --pitch5-primary-note: #ffb300;
  --pitch6-secondary-channel: #ff6f69;
  --pitch6-primary-channel: #ff3e3e;
  --pitch6-secondary-note: #ff7f7f;
  --pitch6-primary-note: #ff1c1c;
  --pitch7-secondary-channel: #00ffff;
  --pitch7-primary-channel: #00ced1;
  --pitch7-secondary-note: #40e0d0;
  --pitch7-primary-note: #20b2aa;
  --pitch8-secondary-channel: #ffc0cb;
  --pitch8-primary-channel: #ff69b4;
  --pitch8-secondary-note: #ff85b2;
  --pitch8-primary-note: #ff1493;
  --pitch9-secondary-channel: #7fffd4;
  --pitch9-primary-channel: #40e0d0;
  --pitch9-secondary-note: #66cdaa;
  --pitch9-primary-note: #20b2aa;
  --pitch10-secondary-channel: #ffe4b5;
  --pitch10-primary-channel: #ffdab9;
  --pitch10-secondary-note: #ffdead;
  --pitch10-primary-note: #f4a460;
  --noise1-secondary-channel: #e0ffff;
  --noise1-primary-channel: #afeeee;
  --noise1-secondary-note: #b0e0e6;
  --noise1-primary-note: #add8e6;
  --noise2-secondary-channel: #f0e68c;
  --noise2-primary-channel: #fffacd;
  --noise2-secondary-note: #fafad2;
  --noise2-primary-note: #ffffe0;
  --noise3-secondary-channel: #f5deb3;
  --noise3-primary-channel: #ffe4c4;
  --noise3-secondary-note: #ffd700;
  --noise3-primary-note: #ffebcd;
  --noise4-secondary-channel: #e6e6fa;
  --noise4-primary-channel: #d8bfd8;
  --noise4-secondary-note: #dda0dd;
  --noise4-primary-note: #eee8aa;
  --noise5-secondary-channel: #f08080;
  --noise5-primary-channel: #fa8072;
  --noise5-secondary-note: #e9967a;
  --noise5-primary-note: #cd5c5c;
  --mod1-secondary-channel: #ff00ff;
  --mod1-primary-channel: #da70d6;
  --mod1-secondary-note: #ff66ff;
  --mod1-primary-note: #d87093;
  --mod2-secondary-channel: #00ffcc;
  --mod2-primary-channel: #20b2aa;
  --mod2-secondary-note: #00ced1;
  --mod2-primary-note: #5f9ea0;
  --mod3-secondary-channel: #ffcc00;
  --mod3-primary-channel: #ffb300;
  --mod3-secondary-note: #ff9900;
  --mod3-primary-note: #ffae42;
  --mod4-secondary-channel: #00ff00;
  --mod4-primary-channel: #7cfc00;
  --mod4-secondary-note: #32cd32;
  --mod4-primary-note: #9acd32;
  --mod-label-primary: #333;
  --mod-label-secondary-text: #777;
  --mod-label-primary-text: #ff00cc;
  --disabled-note-primary: #d3d3d3;
  --disabled-note-secondary: #b0b0b0;
}
`,
"funky": `
:root {
  --page-margin: #0a0a0a;
  --editor-background: #131313;
  --hover-preview: #ff00ff;
  --playhead: #00ffff;
  --primary-text: #e0e0e0;
  --secondary-text: #888888;
  --inverted-text: #000000;
  --text-selection: #ff69b4;
  --box-selection-fill: rgba(255, 105, 180, 0.45);
  --loop-accent: #00ff00;
  --link-accent: #ffa500;
  --ui-widget-background: #1a1a1a;
  --ui-widget-focus: #333333;
  --pitch-background: #181818;
  --tonic: #2b0057;
  --fifth-note: #0037ff;
  --white-piano-key: #dddddd;
  --black-piano-key: #222222;
  --use-color-formula: false;
  --track-editor-bg-pitch: #2d0036;
  --track-editor-bg-pitch-dim: #1a001f;
  --track-editor-bg-noise: #00302b;
  --track-editor-bg-noise-dim: #001a16;
  --track-editor-bg-mod: #361300;
  --track-editor-bg-mod-dim: #1f0a00;
  --multiplicative-mod-slider: #ff33cc;
  --overwriting-mod-slider: #33ccff;
  --indicator-primary: #ffeb3b;
  --indicator-secondary: #ff4081;
  --select2-opt-group: #0d0014;
  --input-box-outline: #2e002a;
  --mute-button-normal: #ff0055;
  --mute-button-mod: #5500ff;
  --pitch1-secondary-channel: #00ffcc;
  --pitch1-primary-channel: #00ffcc;
  --pitch1-secondary-note: #00ffcc;
  --pitch1-primary-note: #00ffcc;
  --pitch2-secondary-channel: #ff00aa;
  --pitch2-primary-channel: #ff00aa;
  --pitch2-secondary-note: #ff00aa;
  --pitch2-primary-note: #ff00aa;
  --pitch3-secondary-channel: #00aa00;
  --pitch3-primary-channel: #00ff00;
  --pitch3-secondary-note: #00aa00;
  --pitch3-primary-note: #00ff00;
  --pitch4-secondary-channel: #aa00aa;
  --pitch4-primary-channel: #ff00ff;
  --pitch4-secondary-note: #aa00aa;
  --pitch4-primary-note: #ff00ff;
  --pitch5-secondary-channel: #ffaa00;
  --pitch5-primary-channel: #ffff00;
  --pitch5-secondary-note: #ffaa00;
  --pitch5-primary-note: #ffff00;
  --pitch6-secondary-channel: #00aaff;
  --pitch6-primary-channel: #00ffff;
  --pitch6-secondary-note: #00aaff;
  --pitch6-primary-note: #00ffff;
  --pitch7-secondary-channel: #ff0055;
  --pitch7-primary-channel: #ff3399;
  --pitch7-secondary-note: #ff0055;
  --pitch7-primary-note: #ff3399;
  --pitch8-secondary-channel: #55ff00;
  --pitch8-primary-channel: #aaff00;
  --pitch8-secondary-note: #55ff00;
  --pitch8-primary-note: #aaff00;
  --pitch9-secondary-channel: #aa0055;
  --pitch9-primary-channel: #ff55aa;
  --pitch9-secondary-note: #aa0055;
  --pitch9-primary-note: #ff55aa;
  --pitch10-secondary-channel: #0055aa;
  --pitch10-primary-channel: #55aaff;
  --pitch10-secondary-note: #0055aa;
  --pitch10-primary-note: #55aaff;
  --noise1-secondary-channel: #ffdd00;
  --noise1-primary-channel: #ffff66;
  --noise1-secondary-note: #ffdd00;
  --noise1-primary-note: #ffff66;
  --noise2-secondary-channel: #dd00ff;
  --noise2-primary-channel: #ff66ff;
  --noise2-secondary-note: #dd00ff;
  --noise2-primary-note: #ff66ff;
  --noise3-secondary-channel: #00ddff;
  --noise3-primary-channel: #66ffff;
  --noise3-secondary-note: #00ddff;
  --noise3-primary-note: #66ffff;
  --noise4-secondary-channel: #ff6600;
  --noise4-primary-channel: #ff9966;
  --noise4-secondary-note: #ff6600;
  --noise4-primary-note: #ff9966;
  --noise5-secondary-channel: #66ff00;
  --noise5-primary-channel: #ccff66;
  --noise5-secondary-note: #66ff00;
  --noise5-primary-note: #ccff66;
  --mod1-secondary-channel: #ff0066;
  --mod1-primary-channel: #ff3399;
  --mod1-secondary-note: #ff0066;
  --mod1-primary-note: #ff3399;
  --mod2-secondary-channel: #6600ff;
  --mod2-primary-channel: #9933ff;
  --mod2-secondary-note: #6600ff;
  --mod2-primary-note: #9933ff;
  --mod3-secondary-channel: #00ff66;
  --mod3-primary-channel: #66ff99;
  --mod3-secondary-note: #00ff66;
  --mod3-primary-note: #66ff99;
  --mod4-secondary-channel: #ff6600;
  --mod4-primary-channel: #ff9933;
  --mod4-secondary-note: #ff6600;
  --mod4-primary-note: #ff9933;
  --mod-label-primary: #ffffff;
  --mod-label-secondary-text: #bbbbbb;
  --mod-label-primary-text: #000000;
  --disabled-note-primary: #555555;
  --disabled-note-secondary: #222222;
}
`,
"mirage": `
:root {
  --page-margin: #1f1c2c;
  --editor-background: #2a2340;
  --hover-preview: #ffc387;
  --playhead: #a58eff;
  --primary-text: #e8e6f1;
  --secondary-text: #b0aeb8;
  --inverted-text: #0f0d12;
  --text-selection: #d3a4ff;
  --box-selection-fill: rgba(211, 164, 255, 0.4);
  --loop-accent: #ff9e80;
  --link-accent: #88d8b0;
  --ui-widget-background: #312b3f;
  --ui-widget-focus: #4a415b;
  --pitch-background: #2e294e;
  --tonic: #3b2f63;
  --fifth-note: #473f77;
  --white-piano-key: #cdc9d9;
  --black-piano-key: #403754;
  --use-color-formula: false;
  --track-editor-bg-pitch: #3a3450;
  --track-editor-bg-pitch-dim: #25203a;
  --track-editor-bg-noise: #504760;
  --track-editor-bg-noise-dim: #3a3547;
  --track-editor-bg-mod: #423a59;
  --track-editor-bg-mod-dim: #2e2840;
  --multiplicative-mod-slider: #c17eff;
  --overwriting-mod-slider: #8fd4ff;
  --indicator-primary: #ffd280;
  --indicator-secondary: #aa84ff;
  --select2-opt-group: #1d1826;
  --input-box-outline: #2f2544;
  --mute-button-normal: #ff6f61;
  --mute-button-mod: #9753d1;
  --pitch1-secondary-channel: #a47aff;
  --pitch1-primary-channel: #d1b3ff;
  --pitch1-secondary-note: #8f66cc;
  --pitch1-primary-note: #d1b3ff;
  --pitch2-secondary-channel: #ffb87a;
  --pitch2-primary-channel: #ffe1b3;
  --pitch2-secondary-note: #cc9a66;
  --pitch2-primary-note: #ffe1b3;
  --pitch3-secondary-channel: #7ad1ff;
  --pitch3-primary-channel: #b3edff;
  --pitch3-secondary-note: #66bad9;
  --pitch3-primary-note: #b3edff;
  --pitch4-secondary-channel: #ff7ab3;
  --pitch4-primary-channel: #ffb3d9;
  --pitch4-secondary-note: #cc6699;
  --pitch4-primary-note: #ffb3d9;
  --pitch5-secondary-channel: #d4ff7a;
  --pitch5-primary-channel: #efffb3;
  --pitch5-secondary-note: #b9cc66;
  --pitch5-primary-note: #efffb3;
  --pitch6-secondary-channel: #7aff94;
  --pitch6-primary-channel: #b3ffd6;
  --pitch6-secondary-note: #66cc7a;
  --pitch6-primary-note: #b3ffd6;
  --pitch7-secondary-channel: #ff7a7a;
  --pitch7-primary-channel: #ffb3b3;
  --pitch7-secondary-note: #cc6666;
  --pitch7-primary-note: #ffb3b3;
  --pitch8-secondary-channel: #7a94ff;
  --pitch8-primary-channel: #b3d6ff;
  --pitch8-secondary-note: #667acc;
  --pitch8-primary-note: #b3d6ff;
  --pitch9-secondary-channel: #d17aff;
  --pitch9-primary-channel: #ebb3ff;
  --pitch9-secondary-note: #aa66cc;
  --pitch9-primary-note: #ebb3ff;
  --pitch10-secondary-channel: #ffda7a;
  --pitch10-primary-channel: #fff4b3;
  --pitch10-secondary-note: #ccba66;
  --pitch10-primary-note: #fff4b3;
  --noise1-secondary-channel: #bbaf7a;
  --noise1-primary-channel: #e6e0b3;
  --noise1-secondary-note: #9c9466;
  --noise1-primary-note: #e6e0b3;
  --noise2-secondary-channel: #af7abb;
  --noise2-primary-channel: #e0b3e6;
  --noise2-secondary-note: #946699;
  --noise2-primary-note: #e0b3e6;
  --noise3-secondary-channel: #7abbaf;
  --noise3-primary-channel: #b3e6e0;
  --noise3-secondary-note: #669994;
  --noise3-primary-note: #b3e6e0;
  --noise4-secondary-channel: #bb7aaf;
  --noise4-primary-channel: #e6b3e0;
  --noise4-secondary-note: #994d99;
  --noise4-primary-note: #e6b3e0;
  --noise5-secondary-channel: #afbb7a;
  --noise5-primary-channel: #e0e6b3;
  --noise5-secondary-note: #999966;
  --noise5-primary-note: #e0e6b3;
  --mod1-secondary-channel: #ff7aff;
  --mod1-primary-channel: #ffb3ff;
  --mod1-secondary-note: #cc66cc;
  --mod1-primary-note: #ffb3ff;
  --mod2-secondary-channel: #7aff7a;
  --mod2-primary-channel: #b3ffb3;
  --mod2-secondary-note: #66cc66;
  --mod2-primary-note: #b3ffb3;
  --mod3-secondary-channel: #7a7aff;
  --mod3-primary-channel: #b3b3ff;
  --mod3-secondary-note: #6666cc;
  --mod3-primary-note: #b3b3ff;
  --mod4-secondary-channel: #ff7a94;
  --mod4-primary-channel: #ffb3c9;
  --mod4-secondary-note: #cc6680;
  --mod4-primary-note: #ffb3c9;
  --mod-label-primary: #e8e6f1;
  --mod-label-secondary-text: #a8a6b0;
  --mod-label-primary-text: #1f1c2c;
  --disabled-note-primary: #6e6b7f;
  --disabled-note-secondary: #3b3944;
}
`
,
"githubdark": `
.fbox{
    color: #58a6ff;
}
:root {
  --page-margin: #0d1117;
  --editor-background: #0d1117;
  --hover-preview: #c9d1d9;
  --playhead: #58a6ff;
  --primary-text: #c9d1d9;
  --secondary-text: #8b949e;
  --inverted-text: #010409;
  --text-selection: #1f6feb;
  --box-selection-fill: rgba(56, 139, 253, 0.35);
  --loop-accent: #238636;
  --link-accent: #58a6ff;
  --ui-widget-background: #161b22;
  --ui-widget-focus: #21262d;
  --pitch-background: #161b22;
  --tonic: #0d1117;
  --fifth-note: #1f6feb;
  --white-piano-key: #c9d1d9;
  --black-piano-key: #010409;
  --use-color-formula: false;
  --track-editor-bg-pitch: #161b22;
  --track-editor-bg-pitch-dim: #0d1117;
  --track-editor-bg-noise: #21262d;
  --track-editor-bg-noise-dim: #161b22;
  --track-editor-bg-mod: #22272e;
  --track-editor-bg-mod-dim: #1b1f24;
  --multiplicative-mod-slider: #79c0ff;
  --overwriting-mod-slider: #38a169;
  --indicator-primary: #39d353;
  --indicator-secondary: #1f6feb;
  --select2-opt-group: #0c131a;
  --input-box-outline: #21262d;
  --mute-button-normal: #d29922;
  --mute-button-mod: #ad8b00;
  --pitch1-secondary-channel: #58a6ff;
  --pitch1-primary-channel: #79c0ff;
  --pitch1-secondary-note: #388bfd;
  --pitch1-primary-note: #a5d6ff;
  --pitch2-secondary-channel: #238636;
  --pitch2-primary-channel: #39d353;
  --pitch2-secondary-note: #1f6feb;
  --pitch2-primary-note: #56d364;
  --pitch3-secondary-channel: #bf4dff;
  --pitch3-primary-channel: #d2a8ff;
  --pitch3-secondary-note: #a463f2;
  --pitch3-primary-note: #e7c6ff;
  --pitch4-secondary-channel: #f85149;
  --pitch4-primary-channel: #ff8182;
  --pitch4-secondary-note: #d73a49;
  --pitch4-primary-note: #ffa39e;
  --pitch5-secondary-channel: #ffa657;
  --pitch5-primary-channel: #ffc657;
  --pitch5-secondary-note: #dd9c46;
  --pitch5-primary-note: #ffeaa7;
  --pitch6-secondary-channel: #96d0ff;
  --pitch6-primary-channel: #b1d4ff;
  --pitch6-secondary-note: #75baff;
  --pitch6-primary-note: #d0eaff;
  --pitch7-secondary-channel: #8b949e;
  --pitch7-primary-channel: #c9d1d9;
  --pitch7-secondary-note: #6e7781;
  --pitch7-primary-note: #e1e4e8;
  --pitch8-secondary-channel: #f97583;
  --pitch8-primary-channel: #ffacb7;
  --pitch8-secondary-note: #d34d6b;
  --pitch8-primary-note: #ffc1ce;
  --pitch9-secondary-channel: #ff7b72;
  --pitch9-primary-channel: #ffb3ac;
  --pitch9-secondary-note: #d64f4f;
  --pitch9-primary-note: #ffdcd7;
  --pitch10-secondary-channel: #a371f7;
  --pitch10-primary-channel: #caa9ff;
  --pitch10-secondary-note: #8a53f2;
  --pitch10-primary-note: #e7d4ff;
  --noise1-secondary-channel: #57606a;
  --noise1-primary-channel: #8b949e;
  --noise1-secondary-note: #484f58;
  --noise1-primary-note: #c9d1d9;
  --noise2-secondary-channel: #2f81f7;
  --noise2-primary-channel: #58a6ff;
  --noise2-secondary-note: #1f6feb;
  --noise2-primary-note: #79c0ff;
  --noise3-secondary-channel: #0ca678;
  --noise3-primary-channel: #39d353;
  --noise3-secondary-note: #238636;
  --noise3-primary-note: #56d364;
  --noise4-secondary-channel: #f0883e;
  --noise4-primary-channel: #ffa657;
  --noise4-secondary-note: #dd9c46;
  --noise4-primary-note: #ffeaa7;
  --noise5-secondary-channel: #bb8bfe;
  --noise5-primary-channel: #d2a8ff;
  --noise5-secondary-note: #9c6ade;
  --noise5-primary-note: #e7c6ff;
  --mod1-secondary-channel: #a371f7;
  --mod1-primary-channel: #caa9ff;
  --mod1-secondary-note: #8a53f2;
  --mod1-primary-note: #e7d4ff;
  --mod2-secondary-channel: #64d4ff;
  --mod2-primary-channel: #97dfff;
  --mod2-secondary-note: #38bdf8;
  --mod2-primary-note: #b4e1ff;
  --mod3-secondary-channel: #ff95c8;
  --mod3-primary-channel: #ffcce0;
  --mod3-secondary-note: #e76ba8;
  --mod3-primary-note: #ffdced;
  --mod4-secondary-channel: #ff7b72;
  --mod4-primary-channel: #ffb3ac;
  --mod4-secondary-note: #d64f4f;
  --mod4-primary-note: #ffdcd7;
  --mod-label-primary: #c9d1d9;
  --mod-label-secondary-text: #8b949e;
  --mod-label-primary-text: #0d1117;
  --disabled-note-primary: #484f58;
  --disabled-note-secondary: #21262d;
}
`,
 
"Dirty":`
:root {
  -webkit-text-stroke-width: 0.4px;
  --page-margin: #5A3A2E;
  --editor-background: #1E1916;
  --hover-preview: #D89C7F;
  --playhead: #B26440;
  --primary-text: #F1E4D2;
  --secondary-text: #E6C9AE;
  --inverted-text: #2C1C14;
  --text-selection: #B98B6A;
  --box-selection-fill: #CFA77F;
  --loop-accent: #A6603A;
  --link-accent: #D49A6A;
  --ui-widget-background: #3A2B24;
  --ui-widget-focus: #C47C4E;
  --pitch-background: #2C221D;
  --tonic: #A66B48;
  --fifth-note: #B7795A;
  --white-piano-key-color: #0F0D0B;
  --black-piano-key-color: #f0e5dc;
  --white-piano-key: #A28D7A;
  --black-piano-key: #1A1612;
  --use-color-formula: false;
  --track-editor-bg-pitch: #3F2C26;
  --track-editor-bg-pitch-dim: #2E221D;
  --track-editor-bg-noise: #44342F;
  --track-editor-bg-noise-dim: #3B2D28;
  --track-editor-bg-mod: #4C3A30;
  --track-editor-bg-mod-dim: #5A463C;
  --multiplicative-mod-slider: #C1A78B;
  --overwriting-mod-slider: #B0967F;
  --indicator-primary: #CE8352;
  --indicator-secondary: #9B6544;
  --select2-opt-group: #A76B4D;
  --input-box-outline: #A56942;
  --mute-button-normal: #F1E8DE;
  --mute-button-mod: #F5F0E7;

  /* pitch */
  --pitch1-primary-channel: #9E4B4B;
  --pitch1-secondary-channel: #7F2E2E;
  --pitch1-primary-note: #C98585;
  --pitch1-secondary-note: #5F1A1A;

  --pitch2-primary-channel: #A6793F;
  --pitch2-secondary-channel: #8F5E1E;
  --pitch2-primary-note: #D3B185;
  --pitch2-secondary-note: #664114;

  --pitch3-primary-channel: #7C8E3A;
  --pitch3-secondary-channel: #5A6B24;
  --pitch3-primary-note: #B2C27F;
  --pitch3-secondary-note: #3D4D18;

  --pitch4-primary-channel: #3D775C;
  --pitch4-secondary-channel: #296049;
  --pitch4-primary-note: #74B89E;
  --pitch4-secondary-note: #1F4533;

  --pitch5-primary-channel: #4B6A79;
  --pitch5-secondary-channel: #2C4D5C;
  --pitch5-primary-note: #89A5B6;
  --pitch5-secondary-note: #1F3642;

  --pitch6-primary-channel: #5C4D7A;
  --pitch6-secondary-channel: #3F3060;
  --pitch6-primary-note: #A895C4;
  --pitch6-secondary-note: #2A2044;

  --pitch7-primary-channel: #854D78;
  --pitch7-secondary-channel: #6A2F5C;
  --pitch7-primary-note: #C48FBA;
  --pitch7-secondary-note: #481B3E;

  --pitch8-primary-channel: #9C4D5A;
  --pitch8-secondary-channel: #802E40;
  --pitch8-primary-note: #D47C99;
  --pitch8-secondary-note: #5C1A2C;

  --pitch9-primary-channel: #B3704D;
  --pitch9-secondary-channel: #99512E;
  --pitch9-primary-note: #E0AD91;
  --pitch9-secondary-note: #71391E;

  --pitch10-primary-channel: #C9A14D;
  --pitch10-secondary-channel: #A5822E;
  --pitch10-primary-note: #F1D98F;
  --pitch10-secondary-note: #715F1E;

  /* noise */
  --noise1-primary-channel: #A25F4D;
  --noise1-secondary-channel: #833D2E;
  --noise1-primary-note: #D9A88F;
  --noise1-secondary-note: #5A261B;

  --noise2-primary-channel: #BA8B4D;
  --noise2-secondary-channel: #9A6B2E;
  --noise2-primary-note: #F0C790;
  --noise2-secondary-note: #70501E;

  --noise3-primary-channel: #B0A64D;
  --noise3-secondary-channel: #918A2E;
  --noise3-primary-note: #E8E090;
  --noise3-secondary-note: #6A641E;

  --noise4-primary-channel: #6A964D;
  --noise4-secondary-channel: #48712E;
  --noise4-primary-note: #A2D190;
  --noise4-secondary-note: #34501E;

  --noise5-primary-channel: #4D948D;
  --noise5-secondary-channel: #2E716B;
  --noise5-primary-note: #8AD9D2;
  --noise5-secondary-note: #1E4F4A;

  /* mod */
  --mod1-primary-channel: #4D887C;
  --mod1-secondary-channel: #2E6A5E;
  --mod1-primary-note: #8BCDC0;
  --mod1-secondary-note: #1E4E45;

  --mod2-primary-channel: #4D6788;
  --mod2-secondary-channel: #2E4C6A;
  --mod2-primary-note: #8BB0CD;
  --mod2-secondary-note: #1E354E;

  --mod3-primary-channel: #4D7C88;
  --mod3-secondary-channel: #2E5E6A;
  --mod3-primary-note: #8BC3CD;
  --mod3-secondary-note: #1E454E;

  --mod4-primary-channel: #4D5C88;
  --mod4-secondary-channel: #2E416A;
  --mod4-primary-note: #8BA6CD;
  --mod4-secondary-note: #1E2F4E;

  --mod-label-primary: #F0E8D8;
  --mod-label-secondary-text: #241C16;
  --mod-label-primary-text: #3B2A1F;

  --disabled-note-primary: #211B17;
  --disabled-note-secondary: #100D0B;
}
`,
"Moai":`
:root {
  --page-margin: #2B2B2B;
  --editor-background: #121212;
  --hover-preview: #4A4A4A;
  --playhead: #5C5C5C;
  --primary-text: #E0E0E0;
  --secondary-text: #AAAAAA;
  --inverted-text: #1A1A1A;
  --text-selection: #2F4F4F;
  --box-selection-fill: #3B3B3B;
  --loop-accent: #555;
  --link-accent: #8AB6C2;
  --ui-widget-background: #1C1C1C;
  --ui-widget-focus: #3A3A3A;
  --pitch-background: #1A1A1A;
  --tonic: #3D5A6C;
  --fifth-note: #4D6C7F;
  --white-piano-key: #777;
  --black-piano-key: #111;
  --white-piano-key-color: #000;
  --black-piano-key-color: #fff;
  --track-editor-bg-pitch: #2C2C2C;
  --track-editor-bg-noise: #333;
  --track-editor-bg-mod: #3A3A3A;
  --multiplicative-mod-slider: #4D5E6C;
  --overwriting-mod-slider: #6C7F8D;
  --indicator-primary: #9DAEBB;
  --indicator-secondary: #5C6C7A;
  --input-box-outline: #555;
  --mute-button-normal: #DDD;
  --mute-button-mod: #CCC;
}
@media (min-aspect-ratio: 1/1) {
body::after {
  content: "🗿";
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 50vh;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  pointer-events: none;
  z-index: 9999;
  user-select: none;
}
}
@media (max-aspect-ratio: 1/1) {
body::after {
	content: "🗿";
	position: fixed;
	top: 50% ;
	left: 50% ;
	font-size: 50vh;
	transform: translate(-50% , -50% );
	opacity: 0.2;
	pointer-events: none;
	z-index: 9999;
	user-select: none;
}
}
`,
"Edit": `
:root {
  --page-margin: #2B2B2B;
  --editor-background: #121212;
  --hover-preview: #4A4A4A;
  --playhead: #5C5C5C;
  --primary-text: #E0E0E0;
  --secondary-text: #AAAAAA;
  --inverted-text: #1A1A1A;
  --text-selection: #2F4F4F;
  --box-selection-fill: #3B3B3B;
  --loop-accent: #555;
  --link-accent: #8AB6C2;
  --ui-widget-background: #1C1C1C;
  --ui-widget-focus: #3A3A3A;
  --pitch-background: #1A1A1A;
  --tonic: #3D5A6C;
  --fifth-note: #4D6C7F;
  --white-piano-key: #777;
  --black-piano-key: #111;
  --white-piano-key-color: #000;
  --black-piano-key-color: #fff;
  --track-editor-bg-pitch: #2C2C2C;
  --track-editor-bg-noise: #333;
  --track-editor-bg-mod: #3A3A3A;
  --multiplicative-mod-slider: #4D5E6C;
  --overwriting-mod-slider: #6C7F8D;
  --indicator-primary: #9DAEBB;
  --indicator-secondary: #5C6C7A;
  --input-box-outline: #555;
  --mute-button-normal: #DDD;
  --mute-button-mod: #CCC;
}
@media (min-aspect-ratio: 1/1) {
body::after {
  content: "💀";
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 20vh;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  pointer-events: none;
  z-index: 9999;
  user-select: none;
}
}
@media (max-aspect-ratio: 1/1) {
body::after {
	content: "💀";
	position: fixed;
	top: 50% ;
	left: 50% ;
	font-size: 20vh;
	transform: translate(-50% , -50% );
	opacity: 0.2;
	pointer-events: none;
	z-index: 9999;
	user-select: none;
}
}
#beepboxEditorContainer, body:not(:has(#beepboxEditorContainer)) {
  filter: hue-rotate(0deg);
  animation: rainbow 15s linear infinite;
}
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
`,
"Steel":`
:root {
  --page-margin: #2E2E33;
  --editor-background: #1A1A1D;
  --hover-preview: #95A3B3;
  --playhead: #AFC5D7;
  --primary-text: #F0F0F0;
  --secondary-text: #C4C4C4;
  --inverted-text: #121212;
  --text-selection: #778899;
  --box-selection-fill: #A0B0C0;
  --loop-accent: #5C7A8C;
  --link-accent: #9DB7C5;
  --ui-widget-background: #232428;
  --ui-widget-focus: #4A5A6A;
  --pitch-background: #1C1F23;
  --tonic: #6F8A9C;
  --fifth-note: #7C99AB;
  --white-piano-key: #BFC6CC;
  --black-piano-key: #2B2D30;
  --white-piano-key-color: #000;
  --black-piano-key-color: #fff;
  --track-editor-bg-pitch: #2D3137;
  --track-editor-bg-noise: #383E44;
  --track-editor-bg-mod: #454C52;
  --multiplicative-mod-slider: #9AAFC1;
  --overwriting-mod-slider: #7A8C9F;
  --indicator-primary: #C1D4E3;
  --indicator-secondary: #6E7F8F;
  --input-box-outline: #607080;
  --mute-button-normal: #D8DEE4;
  --mute-button-mod: #E0E7EC;

  /* pitch colors (tonal greys with slight blue/cyan tint) */
  --pitch1-primary-channel: #B0C5CF;
  --pitch1-secondary-channel: #90A3AD;
  --pitch1-primary-note: #D5E0E6;
  --pitch1-secondary-note: #657985;

  --pitch2-primary-channel: #C3D1D9;
  --pitch2-secondary-channel: #A4B6C0;
  --pitch2-primary-note: #E4EDF2;
  --pitch2-secondary-note: #73858E;

  --pitch3-primary-channel: #A8BCC4;
  --pitch3-secondary-channel: #879AA1;
  --pitch3-primary-note: #D0DDE3;
  --pitch3-secondary-note: #60717A;

  --pitch4-primary-channel: #8DA6AD;
  --pitch4-secondary-channel: #6C838B;
  --pitch4-primary-note: #B9C8CF;
  --pitch4-secondary-note: #4D5E66;

  --pitch5-primary-channel: #738E95;
  --pitch5-secondary-channel: #586E75;
  --pitch5-primary-note: #A3B5BB;
  --pitch5-secondary-note: #3B4A51;

  --pitch6-primary-channel: #AABDC3;
  --pitch6-secondary-channel: #889EA5;
  --pitch6-primary-note: #D4E2E7;
  --pitch6-secondary-note: #5F7278;

  --pitch7-primary-channel: #93A7AF;
  --pitch7-secondary-channel: #738891;
  --pitch7-primary-note: #BECED3;
  --pitch7-secondary-note: #495C65;

  --pitch8-primary-channel: #BDC9D0;
  --pitch8-secondary-channel: #9CAEB4;
  --pitch8-primary-note: #DFEAF0;
  --pitch8-secondary-note: #6A7C83;

  --pitch9-primary-channel: #8C9FA7;
  --pitch9-secondary-channel: #6E7F86;
  --pitch9-primary-note: #B5C5CC;
  --pitch9-secondary-note: #4E5F66;

  --pitch10-primary-channel: #B1BDC4;
  --pitch10-secondary-channel: #92A1A8;
  --pitch10-primary-note: #D7E3E9;
  --pitch10-secondary-note: #5A6A72;

  /* neutral noise */
  --noise1-primary-channel: #8D999F;
  --noise1-secondary-channel: #6C767C;
  --noise1-primary-note: #B6C1C7;
  --noise1-secondary-note: #4C5459;

  --noise2-primary-channel: #7F8B91;
  --noise2-secondary-channel: #5F6A6F;
  --noise2-primary-note: #A9B3B9;
  --noise2-secondary-note: #3F464B;

  --noise3-primary-channel: #6F7A80;
  --noise3-secondary-channel: #4F595E;
  --noise3-primary-note: #98A2A7;
  --noise3-secondary-note: #353A3F;

  --noise4-primary-channel: #9DAAB1;
  --noise4-secondary-channel: #7E8D94;
  --noise4-primary-note: #C4D1D7;
  --noise4-secondary-note: #5B6A70;

  --noise5-primary-channel: #C5D2D8;
  --noise5-secondary-channel: #A6B5BB;
  --noise5-primary-note: #E3EFF4;
  --noise5-secondary-note: #78878D;

  /* mods */
  --mod1-primary-channel: #A9B6C0;
  --mod1-secondary-channel: #8C98A1;
  --mod1-primary-note: #CEDBE3;
  --mod1-secondary-note: #6C7982;

  --mod2-primary-channel: #7B8A93;
  --mod2-secondary-channel: #5F6E76;
  --mod2-primary-note: #A4B3BC;
  --mod2-secondary-note: #455159;

  --mod3-primary-channel: #9DB1BC;
  --mod3-secondary-channel: #7F949F;
  --mod3-primary-note: #C8DDE8;
  --mod3-secondary-note: #5C6F7A;

  --mod4-primary-channel: #BACCD7;
  --mod4-secondary-channel: #9FAFB9;
  --mod4-primary-note: #E4F2FB;
  --mod4-secondary-note: #7A8A95;

  --mod-label-primary: #F3F7FA;
  --mod-label-secondary-text: #1A1C1E;
  --mod-label-primary-text: #2F3A45;

  --disabled-note-primary: #1A1A1A;
  --disabled-note-secondary: #0F0F0F;
}
 
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  background: linear-gradient(120deg, #1A1A1D, #4A5D61, #1A1A1D);
  background-size: 400% 400%;
  animation: steelShift 10s ease-in-out infinite;
  opacity: 0.35;
  pointer-events: none;
}
@keyframes steelShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

`,
"Texture":`
:root {
  --page-margin: #111111;
  --editor-background: #0A0A0C;
  --hover-preview: #B0B0B0;
  --playhead: #888888;
  --primary-text: #F5F5F5;
  --secondary-text: #BFBFBF;
  --inverted-text: #0F0F0F;
  --text-selection: #444;
  --box-selection-fill: #666;
  --loop-accent: #999;
  --link-accent: #DDD;
  --ui-widget-background: #1A1A1A;
  --ui-widget-focus: #2A2A2A;
  --pitch-background: #111;
  --tonic: #777;
  --fifth-note: #666;
  --white-piano-key: #999;
  --black-piano-key: #222;
  --white-piano-key-color: #000;
  --black-piano-key-color: #FFF;
  --track-editor-bg-pitch: #181818;
  --track-editor-bg-noise: #202020;
  --track-editor-bg-mod: #282828;
  --multiplicative-mod-slider: #AAA;
  --overwriting-mod-slider: #888;
  --indicator-primary: #DDD;
  --indicator-secondary: #999;
  --input-box-outline: #666;
  --mute-button-normal: #EEE;
  --mute-button-mod: #CCC;

  /* pitch (minimal, muted grays with subtle variation) */
  --pitch1-primary-channel: #AAAAAA;
  --pitch1-secondary-channel: #888888;
  --pitch1-primary-note: #CCCCCC;
  --pitch1-secondary-note: #666666;

  --pitch2-primary-channel: #BBBBBB;
  --pitch2-secondary-channel: #999999;
  --pitch2-primary-note: #DDDDDD;
  --pitch2-secondary-note: #777777;

  --pitch3-primary-channel: #A0A0A0;
  --pitch3-secondary-channel: #7F7F7F;
  --pitch3-primary-note: #C0C0C0;
  --pitch3-secondary-note: #5F5F5F;

  --pitch4-primary-channel: #8C8C8C;
  --pitch4-secondary-channel: #6A6A6A;
  --pitch4-primary-note: #B0B0B0;
  --pitch4-secondary-note: #505050;

  --pitch5-primary-channel: #7A7A7A;
  --pitch5-secondary-channel: #585858;
  --pitch5-primary-note: #9F9F9F;
  --pitch5-secondary-note: #404040;

  --pitch6-primary-channel: #C0C0C0;
  --pitch6-secondary-channel: #9F9F9F;
  --pitch6-primary-note: #E0E0E0;
  --pitch6-secondary-note: #6F6F6F;

  --pitch7-primary-channel: #B3B3B3;
  --pitch7-secondary-channel: #939393;
  --pitch7-primary-note: #D0D0D0;
  --pitch7-secondary-note: #5C5C5C;

  --pitch8-primary-channel: #D0D0D0;
  --pitch8-secondary-channel: #B0B0B0;
  --pitch8-primary-note: #F0F0F0;
  --pitch8-secondary-note: #707070;

  --pitch9-primary-channel: #A9A9A9;
  --pitch9-secondary-channel: #898989;
  --pitch9-primary-note: #C9C9C9;
  --pitch9-secondary-note: #5E5E5E;

  --pitch10-primary-channel: #BCBCBC;
  --pitch10-secondary-channel: #9C9C9C;
  --pitch10-primary-note: #E0E0E0;
  --pitch10-secondary-note: #6A6A6A;

  /* noise (low color contrast) */
  --noise1-primary-channel: #B0B0B0;
  --noise1-secondary-channel: #909090;
  --noise1-primary-note: #D0D0D0;
  --noise1-secondary-note: #707070;

  --noise2-primary-channel: #C0C0C0;
  --noise2-secondary-channel: #A0A0A0;
  --noise2-primary-note: #E0E0E0;
  --noise2-secondary-note: #808080;

  --noise3-primary-channel: #999999;
  --noise3-secondary-channel: #777777;
  --noise3-primary-note: #BBBBBB;
  --noise3-secondary-note: #555555;

  --noise4-primary-channel: #878787;
  --noise4-secondary-channel: #676767;
  --noise4-primary-note: #AFAFAF;
  --noise4-secondary-note: #484848;

  --noise5-primary-channel: #D8D8D8;
  --noise5-secondary-channel: #B8B8B8;
  --noise5-primary-note: #F0F0F0;
  --noise5-secondary-note: #909090;

  /* mod (same vibe as pitch) */
  --mod1-primary-channel: #AAAAAA;
  --mod1-secondary-channel: #888888;
  --mod1-primary-note: #CCCCCC;
  --mod1-secondary-note: #666666;

  --mod2-primary-channel: #999999;
  --mod2-secondary-channel: #777777;
  --mod2-primary-note: #BBBBBB;
  --mod2-secondary-note: #555555;

  --mod3-primary-channel: #B0B0B0;
  --mod3-secondary-channel: #8E8E8E;
  --mod3-primary-note: #D0D0D0;
  --mod3-secondary-note: #6E6E6E;

  --mod4-primary-channel: #C4C4C4;
  --mod4-secondary-channel: #A4A4A4;
  --mod4-primary-note: #E4E4E4;
  --mod4-secondary-note: #848484;

  --mod-label-primary: #F2F2F2;
  --mod-label-secondary-text: #0F0F0F;
  --mod-label-primary-text: #2A2A2A;

  --disabled-note-primary: #1A1A1A;
  --disabled-note-secondary: #0F0F0F;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0) 60%,
    rgba(255, 255, 255, 0.04) 80%,
    rgba(255, 255, 255, 0.06) 90%,
    rgba(255, 255, 255, 0.08) 100%
  );
  animation: starsFade 10s ease-in-out infinite;
  backdrop-filter: blur(6px);
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 4;
  background-image: 
    radial-gradient(white 1px, transparent 0),
    radial-gradient(white 1px, transparent 0),
    radial-gradient(white 1px, transparent 0);
  background-size: 4px 4px, 6px 6px, 8px 8px;
  background-position: 0 0, 25% 25%, 50% 50%;
  opacity: 0.08;
  pointer-events: none;
}
@keyframes starsFade {
  0%   { opacity: 0.04; }
  50%  { opacity: 0.3; }
  100% { opacity: 0.04; }
}
 

`,
			"CyberPunk": `
:root {
  --page-margin: #0A0011;
  --editor-background: #08000C;
  --hover-preview: #FF90FF;
  --playhead: #FF00AA;
  --primary-text: #F0F0F0;
  --secondary-text: #FFCCFF;
  --inverted-text: #000000;
  --text-selection: #440044;
  --box-selection-fill: #990099;
  --loop-accent: #FF44CC;
  --link-accent: #FFDDFF;
  --ui-widget-background: #1A001A;
  --ui-widget-focus: #2A002A;
  --pitch-background: #110011;
  --tonic: #FF77FF;
  --fifth-note: #FF33CC;
  --white-piano-key: #FF99FF;
  --black-piano-key: #330033;
  --white-piano-key-color: #000;
  --black-piano-key-color: #FFF;
  --track-editor-bg-pitch: #1C001C;
  --track-editor-bg-noise: #240024;
  --track-editor-bg-mod: #2C002C;
  --multiplicative-mod-slider: #FFBBFF;
  --overwriting-mod-slider: #FF88FF;
  --indicator-primary: #FFDDFF;
  --indicator-secondary: #FF99DD;
  --input-box-outline: #CC00CC;
  --mute-button-normal: #FFEEFF;
  --mute-button-mod: #FFBBFF;
  --pitch1-primary-channel: #FF33CC;
  --pitch1-secondary-channel: #FF66CC;
  --pitch1-primary-note: #FF99FF;
  --pitch1-secondary-note: #CC33AA;

  --pitch2-primary-channel: #FF66FF;
  --pitch2-secondary-channel: #FF99FF;
  --pitch2-primary-note: #FFCCFF;
  --pitch2-secondary-note: #AA33AA;

  --pitch3-primary-channel: #FF44DD;
  --pitch3-secondary-channel: #DD22BB;
  --pitch3-primary-note: #FFAAFF;
  --pitch3-secondary-note: #992299;

  --pitch4-primary-channel: #FF66EE;
  --pitch4-secondary-channel: #DD44CC;
  --pitch4-primary-note: #FFBBFF;
  --pitch4-secondary-note: #882288;

  --pitch5-primary-channel: #FF77FF;
  --pitch5-secondary-channel: #CC33CC;
  --pitch5-primary-note: #FFCCFF;
  --pitch5-secondary-note: #772277;

  --pitch6-primary-channel: #FF99FF;
  --pitch6-secondary-channel: #DD66DD;
  --pitch6-primary-note: #FFEEFF;
  --pitch6-secondary-note: #992299;

  --pitch7-primary-channel: #FFAAFF;
  --pitch7-secondary-channel: #BB55BB;
  --pitch7-primary-note: #FFE0FF;
  --pitch7-secondary-note: #882288;

  --pitch8-primary-channel: #FFD0FF;
  --pitch8-secondary-channel: #CC88CC;
  --pitch8-primary-note: #FFFFFF;
  --pitch8-secondary-note: #993399;

  --pitch9-primary-channel: #FFB3FF;
  --pitch9-secondary-channel: #AA66AA;
  --pitch9-primary-note: #FFDFFF;
  --pitch9-secondary-note: #772277;

  --pitch10-primary-channel: #FFC8FF;
  --pitch10-secondary-channel: #BB77BB;
  --pitch10-primary-note: #FFEEFF;
  --pitch10-secondary-note: #884488;

  --noise1-primary-channel: #FFAAFF;
  --noise1-secondary-channel: #CC88CC;
  --noise1-primary-note: #FFD5FF;
  --noise1-secondary-note: #993399;

  --noise2-primary-channel: #FFCCFF;
  --noise2-secondary-channel: #AA55AA;
  --noise2-primary-note: #FFFFFF;
  --noise2-secondary-note: #882288;

  --noise3-primary-channel: #DD88DD;
  --noise3-secondary-channel: #BB66BB;
  --noise3-primary-note: #FFCCFF;
  --noise3-secondary-note: #772277;

  --noise4-primary-channel: #CC66CC;
  --noise4-secondary-channel: #AA44AA;
  --noise4-primary-note: #EEBBEE;
  --noise4-secondary-note: #661166;

  --noise5-primary-channel: #FFD0FF;
  --noise5-secondary-channel: #B080B0;
  --noise5-primary-note: #FFFFFF;
  --noise5-secondary-note: #994499;

 
  --mod1-primary-channel: #FF99FF;
  --mod1-secondary-channel: #DD66DD;
  --mod1-primary-note: #FFCCFF;
  --mod1-secondary-note: #AA33AA;

  --mod2-primary-channel: #FF88FF;
  --mod2-secondary-channel: #CC55CC;
  --mod2-primary-note: #FFBBFF;
  --mod2-secondary-note: #992299;

  --mod3-primary-channel: #FFB0FF;
  --mod3-secondary-channel: #DD88DD;
  --mod3-primary-note: #FFE0FF;
  --mod3-secondary-note: #AA55AA;

  --mod4-primary-channel: #FFC8FF;
  --mod4-secondary-channel: #CC88CC;
  --mod4-primary-note: #FFF0FF;
  --mod4-secondary-note: #BB66BB;

  --mod-label-primary: #FFE6FF;
  --mod-label-secondary-text: #1A001A;
  --mod-label-primary-text: #FF99FF;

  --disabled-note-primary: #2A002A;
  --disabled-note-secondary: #110011;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 0, 204, 0.2), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.2), transparent 50%);
  backdrop-filter: blur(12px);
  opacity: 0.4;
  animation: Blur 8s ease-in-out infinite;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background-image:
    linear-gradient(45deg, rgba(255, 0, 255, 0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(0, 255, 255, 0.1) 25%, transparent 25%),
    linear-gradient(45deg, rgba(255, 255, 255, 0.08) 75%, transparent 75%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 75%, transparent 75%);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px, 0 0, 20px 20px;
  animation: gridWave 6s linear infinite;
  opacity: 0.15;
}
@keyframes gridWave {
  0% {
    background-position: 0 0, 20px 20px, 0 0, 20px 20px;
  }
  100% {
    background-position: 40px 40px, 60px 60px, 40px 40px, 60px 60px;
  }
}
@keyframes Blur {
  0%   { opacity: 0.3; transform: scale(1); }
  50%  { opacity: 0.5; transform: scale(1.03); }
  100% { opacity: 0.3; transform: scale(1); }
}

 
`,
"ToxicGlow": `
:root {
  --page-margin: #001100;
  --editor-background: #030C03;
  --hover-preview: #90FF90;
  --playhead: #00FF66;
  --primary-text: #E0FFE0;
  --secondary-text: #AAFFAA;
  --inverted-text: #000000;
  --text-selection: #004400;
  --box-selection-fill: #009900;
  --loop-accent: #33FF99;
  --link-accent: #DDFFDD;
  --ui-widget-background: #0A1A0A;
  --ui-widget-focus: #113311;
  --pitch-background: #001100;
  --tonic: #77FF77;
  --fifth-note: #33CC33;
  --white-piano-key: #99FF99;
  --black-piano-key: #003300;
  --white-piano-key-color: #000;
  --black-piano-key-color: #FFF;
  --track-editor-bg-pitch: #102010;
  --track-editor-bg-noise: #183018;
  --track-editor-bg-mod: #204020;
  --multiplicative-mod-slider: #BBFFBB;
  --overwriting-mod-slider: #88FF88;
  --indicator-primary: #DDFFDD;
  --indicator-secondary: #99DD99;
  --input-box-outline: #00CC00;
  --mute-button-normal: #EEFFEE;
  --mute-button-mod: #BBFFBB;

  /* pitch ToxicGlow green */
  --pitch1-primary-channel: #33CC66;
  --pitch1-secondary-channel: #66CC66;
  --pitch1-primary-note: #99FF99;
  --pitch1-secondary-note: #339933;

  --pitch2-primary-channel: #66FF66;
  --pitch2-secondary-channel: #99FF99;
  --pitch2-primary-note: #CCFFCC;
  --pitch2-secondary-note: #228822;

  --pitch3-primary-channel: #44DD44;
  --pitch3-secondary-channel: #22BB22;
  --pitch3-primary-note: #AAFFAA;
  --pitch3-secondary-note: #229922;

  --pitch4-primary-channel: #66EE66;
  --pitch4-secondary-channel: #44CC44;
  --pitch4-primary-note: #BBFFBB;
  --pitch4-secondary-note: #228822;

  --pitch5-primary-channel: #77FF77;
  --pitch5-secondary-channel: #33CC33;
  --pitch5-primary-note: #CCFFCC;
  --pitch5-secondary-note: #227722;

  --pitch6-primary-channel: #99FF99;
  --pitch6-secondary-channel: #66DD66;
  --pitch6-primary-note: #EEFFEE;
  --pitch6-secondary-note: #229922;

  --pitch7-primary-channel: #AAFFAA;
  --pitch7-secondary-channel: #55BB55;
  --pitch7-primary-note: #E0FFE0;
  --pitch7-secondary-note: #228822;

  --pitch8-primary-channel: #D0FFD0;
  --pitch8-secondary-channel: #88CC88;
  --pitch8-primary-note: #FFFFFF;
  --pitch8-secondary-note: #339933;

  --pitch9-primary-channel: #B3FFB3;
  --pitch9-secondary-channel: #66AA66;
  --pitch9-primary-note: #DFFFDF;
  --pitch9-secondary-note: #227722;

  --pitch10-primary-channel: #C8FFC8;
  --pitch10-secondary-channel: #77BB77;
  --pitch10-primary-note: #EEFFEE;
  --pitch10-secondary-note: #338833;

  /* noise ToxicGlow style */
  --noise1-primary-channel: #AAFFAA;
  --noise1-secondary-channel: #88CC88;
  --noise1-primary-note: #D5FFD5;
  --noise1-secondary-note: #339933;

  --noise2-primary-channel: #CCFFCC;
  --noise2-secondary-channel: #55AA55;
  --noise2-primary-note: #FFFFFF;
  --noise2-secondary-note: #228822;

  --noise3-primary-channel: #88DD88;
  --noise3-secondary-channel: #66BB66;
  --noise3-primary-note: #CCFFCC;
  --noise3-secondary-note: #227722;

  --noise4-primary-channel: #66CC66;
  --noise4-secondary-channel: #44AA44;
  --noise4-primary-note: #BBEEBB;
  --noise4-secondary-note: #116611;

  --noise5-primary-channel: #D0FFD0;
  --noise5-secondary-channel: #80B080;
  --noise5-primary-note: #FFFFFF;
  --noise5-secondary-note: #449944;

  /* mod ToxicGlow green */
  --mod1-primary-channel: #99FF99;
  --mod1-secondary-channel: #66DD66;
  --mod1-primary-note: #CCFFCC;
  --mod1-secondary-note: #33AA33;

  --mod2-primary-channel: #88FF88;
  --mod2-secondary-channel: #55CC55;
  --mod2-primary-note: #BBFFBB;
  --mod2-secondary-note: #229922;

  --mod3-primary-channel: #B0FFB0;
  --mod3-secondary-channel: #88DD88;
  --mod3-primary-note: #E0FFE0;
  --mod3-secondary-note: #55AA55;

  --mod4-primary-channel: #C8FFC8;
  --mod4-secondary-channel: #88CC88;
  --mod4-primary-note: #F0FFF0;
  --mod4-secondary-note: #66BB66;

  --mod-label-primary: #E6FFE6;
  --mod-label-secondary-text: #0A1A0A;
  --mod-label-primary-text: #99FF99;

  --disabled-note-primary: #002A00;
  --disabled-note-secondary: #001100;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%, rgba(0, 255, 240, 0.15), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(200, 200, 0, 0.2), transparent 50%);
  backdrop-filter: blur(12px);
  opacity: 0.4;
  animation: Blur 8s ease-in-out infinite;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background-image: 
    conic-gradient(from 0deg at 50% 50%, 
      rgba(0,255,100,0.05) 0deg 60deg, 
      transparent 60deg 120deg, 
      rgba(0,255,100,0.05) 120deg 180deg, 
      transparent 180deg 240deg, 
      rgba(0,255,100,0.05) 240deg 300deg, 
      transparent 300deg 360deg),
    repeating-linear-gradient(60deg, rgba(0,255,0,0.03) 0 1px, transparent 1px 20px),
    repeating-linear-gradient(-60deg, rgba(0,255,0,0.03) 0 1px, transparent 1px 20px),
    repeating-linear-gradient(0deg, rgba(0,255,0,0.02) 0 1px, transparent 1px 20px);
  background-size: 120px 120px;
  background-position: center;
  animation: Hexagon 15s linear infinite;
  opacity: 0.25;
}

@keyframes Hexagon {
  0% {
    background-position: center;
    transform: scale(1);
  }
  50% {
    background-position: center;
    transform: scale(1.6) rotate(20deg);
  }
  100% {
    background-position: center;
    transform: scale(1);
  }
}


 

@keyframes Blur {
  0%   { opacity: 0.3; transform: scale(1); }
  50%  { opacity: 0.5; transform: scale(1.03); }
  100% { opacity: 0.3; transform: scale(1); }
}
`,
"TheOrange":`

:root {
  --page-margin: #1a0a00;
  --editor-background: #1a0a00;
  --hover-preview: #ffb380;
  --playhead: #ff704d;
  --primary-text: #ffe5d9;
  --secondary-text: #ffccbc;
  --inverted-text: #1a0a00;
  --text-selection: #802000;
  --box-selection-fill: #cc3300;
  --loop-accent: #ff704d;
  --link-accent: #ff9966;
  --ui-widget-background: #330d00;
  --ui-widget-focus: #661a00;
  --pitch-background: #1a0a00;
  --tonic: #ff6633;
  --fifth-note: #cc2900;
  --white-piano-key: #ff9966;
  --black-piano-key: #4d0f00;
  --white-piano-key-color: #1a0a00;
  --black-piano-key-color: #fff;
  --track-editor-bg-pitch: #260f00;
  --track-editor-bg-noise: #331300;
  --track-editor-bg-mod: #401700;
  --multiplicative-mod-slider: #ffb380;
  --overwriting-mod-slider: #ff704d;
  --indicator-primary: #ffccb3;
  --indicator-secondary: #ff9966;
  --input-box-outline: #cc3300;
  --mute-button-normal: #ffead9;
  --mute-button-mod: #ffccbc;

  --pitch1-primary-channel: #ff9966;
  --pitch1-secondary-channel: #cc6633;
  --pitch1-primary-note: #ffb380;
  --pitch1-secondary-note: #b34700;

  --pitch2-primary-channel: #ffaa80;
  --pitch2-secondary-channel: #cc704d;
  --pitch2-primary-note: #ffcc99;
  --pitch2-secondary-note: #994d00;

  --pitch3-primary-channel: #ff8c66;
  --pitch3-secondary-channel: #cc5c33;
  --pitch3-primary-note: #ffad80;
  --pitch3-secondary-note: #803300;

  --pitch4-primary-channel: #e6734d;
  --pitch4-secondary-channel: #b35933;
  --pitch4-primary-note: #ff9966;
  --pitch4-secondary-note: #732600;

  --pitch5-primary-channel: #cc5c33;
  --pitch5-secondary-channel: #994d26;
  --pitch5-primary-note: #ff7f50;
  --pitch5-secondary-note: #661a00;

  --pitch6-primary-channel: #ffc299;
  --pitch6-secondary-channel: #ff9966;
  --pitch6-primary-note: #ffe5d9;
  --pitch6-secondary-note: #cc704d;

  --pitch7-primary-channel: #ffb380;
  --pitch7-secondary-channel: #e6734d;
  --pitch7-primary-note: #ffd9c2;
  --pitch7-secondary-note: #b34700;

  --pitch8-primary-channel: #ffd9c2;
  --pitch8-secondary-channel: #ffb380;
  --pitch8-primary-note: #fff0e5;
  --pitch8-secondary-note: #994d26;

  --pitch9-primary-channel: #ffad80;
  --pitch9-secondary-channel: #cc704d;
  --pitch9-primary-note: #ffc2a1;
  --pitch9-secondary-note: #802000;

  --pitch10-primary-channel: #ffc2a1;
  --pitch10-secondary-channel: #e6734d;
  --pitch10-primary-note: #ffe5d9;
  --pitch10-secondary-note: #994d26;

  --noise1-primary-channel: #ffb380;
  --noise1-secondary-channel: #e6734d;
  --noise1-primary-note: #ffd9c2;
  --noise1-secondary-note: #b34700;

  --noise2-primary-channel: #ffc2a1;
  --noise2-secondary-channel: #ff9966;
  --noise2-primary-note: #ffe5d9;
  --noise2-secondary-note: #cc704d;

  --noise3-primary-channel: #e6734d;
  --noise3-secondary-channel: #cc5c33;
  --noise3-primary-note: #ff9966;
  --noise3-secondary-note: #994d26;

  --noise4-primary-channel: #cc704d;
  --noise4-secondary-channel: #b34700;
  --noise4-primary-note: #ffb380;
  --noise4-secondary-note: #802000;

  --noise5-primary-channel: #ffe5d9;
  --noise5-secondary-channel: #ffc2a1;
  --noise5-primary-note: #fff0e5;
  --noise5-secondary-note: #cc704d;

  --mod1-primary-channel: #ff9966;
  --mod1-secondary-channel: #cc6633;
  --mod1-primary-note: #ffb380;
  --mod1-secondary-note: #b34700;

  --mod2-primary-channel: #e6734d;
  --mod2-secondary-channel: #cc5c33;
  --mod2-primary-note: #ff9966;
  --mod2-secondary-note: #994d26;

  --mod3-primary-channel: #ffb380;
  --mod3-secondary-channel: #cc704d;
  --mod3-primary-note: #ffd9c2;
  --mod3-secondary-note: #a34700;

  --mod4-primary-channel: #ffd9c2;
  --mod4-secondary-channel: #ffad80;
  --mod4-primary-note: #fff0e5;
  --mod4-secondary-note: #cc704d;

  --mod-label-primary: #ffe5d9;
  --mod-label-secondary-text: #1a0a00;
  --mod-label-primary-text: #401700;

  --disabled-note-primary: #330d00;
  --disabled-note-secondary: #1a0a00;
}
html::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(120deg, #000, orange, #000);
  background-size: 400% 400%;
  animation: steelShift 10s ease-in-out infinite;
  opacity: 0.10;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0) 60%,
    rgba(255, 255, 255, 0.04) 80%,
    rgba(255, 255, 255, 0.06) 90%,
    rgba(255, 255, 255, 0.08) 100%
  );
  animation: BlurFad 10s ease-in-out infinite;
  backdrop-filter: blur(6px);
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 5;
  background-image: 
    radial-gradient(orange 2px, transparent 0),
    radial-gradient(orange 1px, transparent 0),
    radial-gradient(orange 1px, transparent 0);
  background-size: 10px 10px, 4px 4px, 16px 16px;
  background-position: 0 0, 25% 25%, 100% 100%;
  opacity: 0.08;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  pointer-events: none;
  animation: Anim2 55s linear infinite;
  transform-origin: center center;
}

@keyframes BlurFad {
  0%   { opacity: 0.04; }
  50%  { opacity: 0.3; }
  100% { opacity: 0.04; }
}

@keyframes Anim2 {
  0% { transform: scale(1.2) rotate(0deg); }
  50% { transform: scale(1.8) rotate(180deg); }
  100% { transform: scale(1.2) rotate(360deg); }
}

@keyframes steelShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


`,
        "custom": `${localStorage.getItem("customColors") || `:root {  }`}`,
    } ;
    ColorConfig.pageMargin = "var(--page-margin, black)";
    ColorConfig.editorBackground = "var(--editor-background, black)";
    ColorConfig.hoverPreview = "var(--hover-preview, white)";
    ColorConfig.playhead = "var(--playhead, white)";
    ColorConfig.primaryText = "var(--primary-text, white)";
    ColorConfig.secondaryText = "var(--secondary-text, #999)";
    ColorConfig.invertedText = "var(--inverted-text, black)";
    ColorConfig.textSelection = "var(--text-selection, rgba(119,68,255,0.99))";
    ColorConfig.boxSelectionFill = "var(--box-selection-fill, rgba(255,255,255,0.2))";
    ColorConfig.loopAccent = "var(--loop-accent, #74f)";
    ColorConfig.linkAccent = "var(--link-accent, #98f)";
    ColorConfig.uiWidgetBackground = "var(--ui-widget-background, #444)";
    ColorConfig.uiWidgetFocus = "var(--ui-widget-focus, #777)";
    ColorConfig.pitchBackground = "var(--pitch-background, #444)";
    ColorConfig.tonic = "var(--tonic, #864)";
    ColorConfig.fifthNote = "var(--fifth-note, #468)";
    ColorConfig.whitePianoKey = "var(--white-piano-key, #bbb)";
    ColorConfig.blackPianoKey = "var(--black-piano-key, #444)";
    ColorConfig.whitePianoKeyText = "var(--white-piano-key-text, #131200)";
    ColorConfig.blackPianoKeyText = "var(--black-piano-key-text, #fff)";
    ColorConfig.useColorFormula = "var(--use-color-formula, false)";
    ColorConfig.pitchSecondaryChannelHue = "var(--pitch-secondary-channel-hue)";
    ColorConfig.pitchSecondaryChannelHueScale = "var(--pitch-secondary-channel-hue-scale)";
    ColorConfig.pitchSecondaryChannelSat = "var(--pitch-secondary-channel-sat)";
    ColorConfig.pitchSecondaryChannelSatScale = "var(--pitch-secondary-channel-sat-scale)";
    ColorConfig.pitchSecondaryChannelLum = "var(--pitch-secondary-channel-lum)";
    ColorConfig.pitchSecondaryChannelLumScale = "var(--pitch-secondary-channel-lum-scale)";
    ColorConfig.pitchPrimaryChannelHue = "var(--pitch-primary-channel-hue)";
    ColorConfig.pitchPrimaryChannelHueScale = "var(--pitch-primary-channel-hue-scale)";
    ColorConfig.pitchPrimaryChannelSat = "var(--pitch-primary-channel-sat)";
    ColorConfig.pitchPrimaryChannelSatScale = "var(--pitch-primary-channel-sat-scale)";
    ColorConfig.pitchPrimaryChannelLum = "var(--pitch-primary-channel-lum)";
    ColorConfig.pitchPrimaryChannelLumScale = "var(--pitch-primary-channel-lum-scale)";
    ColorConfig.pitchSecondaryNoteHue = "var(--pitch-secondary-note-hue)";
    ColorConfig.pitchSecondaryNoteHueScale = "var(--pitch-secondary-note-hue-scale)";
    ColorConfig.pitchSecondaryNoteSat = "var(--pitch-secondary-note-sat)";
    ColorConfig.pitchSecondaryNoteSatScale = "var(--pitch-secondary-note-sat-scale)";
    ColorConfig.pitchSecondaryNoteLum = "var(--pitch-secondary-note-lum)";
    ColorConfig.pitchSecondaryNoteLumScale = "var(--pitch-secondary-note-lum-scale)";
    ColorConfig.pitchPrimaryNoteHue = "var(--pitch-primary-note-hue)";
    ColorConfig.pitchPrimaryNoteHueScale = "var(--pitch-primary-note-hue-scale)";
    ColorConfig.pitchPrimaryNoteSat = "var(--pitch-primary-note-sat)";
    ColorConfig.pitchPrimaryNoteSatScale = "var(--pitch-primary-note-sat-scale)";
    ColorConfig.pitchPrimaryNoteLum = "var(--pitch-primary-note-lum)";
    ColorConfig.pitchPrimaryNoteLumScale = "var(--pitch-primary-note-lum-scale)";
    ColorConfig.modSecondaryChannelHue = "var(--mod-secondary-channel-hue)";
    ColorConfig.modSecondaryChannelHueScale = "var(--mod-secondary-channel-hue-scale)";
    ColorConfig.modSecondaryChannelSat = "var(--mod-secondary-channel-sat)";
    ColorConfig.modSecondaryChannelSatScale = "var(--mod-secondary-channel-sat-scale)";
    ColorConfig.modSecondaryChannelLum = "var(--mod-secondary-channel-lum)";
    ColorConfig.modSecondaryChannelLumScale = "var(--mod-secondary-channel-lum-scale)";
    ColorConfig.modPrimaryChannelHue = "var(--mod-primary-channel-hue)";
    ColorConfig.modPrimaryChannelHueScale = "var(--mod-primary-channel-hue-scale)";
    ColorConfig.modPrimaryChannelSat = "var(--mod-primary-channel-sat)";
    ColorConfig.modPrimaryChannelSatScale = "var(--mod-primary-channel-sat-scale)";
    ColorConfig.modPrimaryChannelLum = "var(--mod-primary-channel-lum)";
    ColorConfig.modPrimaryChannelLumScale = "var(--mod-primary-channel-lum-scale)";
    ColorConfig.modSecondaryNoteHue = "var(--mod-secondary-note-hue)";
    ColorConfig.modSecondaryNoteHueScale = "var(--mod-secondary-note-hue-scale)";
    ColorConfig.modSecondaryNoteSat = "var(--mod-secondary-note-sat)";
    ColorConfig.modSecondaryNoteSatScale = "var(--mod-secondary-note-sat-scale)";
    ColorConfig.modSecondaryNoteLum = "var(--mod-secondary-note-lum)";
    ColorConfig.modSecondaryNoteLumScale = "var(--mod-secondary-note-lum-scale)";
    ColorConfig.modPrimaryNoteHue = "var(--mod-primary-note-hue)";
    ColorConfig.modPrimaryNoteHueScale = "var(--mod-primary-note-hue-scale)";
    ColorConfig.modPrimaryNoteSat = "var(--mod-primary-note-sat)";
    ColorConfig.modPrimaryNoteSatScale = "var(--mod-primary-note-sat-scale)";
    ColorConfig.modPrimaryNoteLum = "var(--mod-primary-note-lum)";
    ColorConfig.modPrimaryNoteLumScale = "var(--mod-primary-note-lum-scale)";
    ColorConfig.noiseSecondaryChannelHue = "var(--noise-secondary-channel-hue)";
    ColorConfig.noiseSecondaryChannelHueScale = "var(--noise-secondary-channel-hue-scale)";
    ColorConfig.noiseSecondaryChannelSat = "var(--noise-secondary-channel-sat)";
    ColorConfig.noiseSecondaryChannelSatScale = "var(--noise-secondary-channel-sat-scale)";
    ColorConfig.noiseSecondaryChannelLum = "var(--noise-secondary-channel-lum)";
    ColorConfig.noiseSecondaryChannelLumScale = "var(--noise-secondary-channel-lum-scale)";
    ColorConfig.noisePrimaryChannelHue = "var(--noise-primary-channel-hue)";
    ColorConfig.noisePrimaryChannelHueScale = "var(--noise-primary-channel-hue-scale)";
    ColorConfig.noisePrimaryChannelSat = "var(--noise-primary-channel-sat)";
    ColorConfig.noisePrimaryChannelSatScale = "var(--noise-primary-channel-sat-scale)";
    ColorConfig.noisePrimaryChannelLum = "var(--noise-primary-channel-lum)";
    ColorConfig.noisePrimaryChannelLumScale = "var(--noise-primary-channel-lum-scale)";
    ColorConfig.noiseSecondaryNoteHue = "var(--noise-secondary-note-hue)";
    ColorConfig.noiseSecondaryNoteHueScale = "var(--noise-secondary-note-hue-scale)";
    ColorConfig.noiseSecondaryNoteSat = "var(--noise-secondary-note-sat)";
    ColorConfig.noiseSecondaryNoteSatScale = "var(--noise-secondary-note-sat-scale)";
    ColorConfig.noiseSecondaryNoteLum = "var(--noise-secondary-note-lum)";
    ColorConfig.noiseSecondaryNoteLumScale = "var(--noise-secondary-note-lum-scale)";
    ColorConfig.noisePrimaryNoteHue = "var(--noise-primary-note-hue)";
    ColorConfig.noisePrimaryNoteHueScale = "var(--noise-primary-note-hue-scale)";
    ColorConfig.noisePrimaryNoteSat = "var(--noise-primary-note-sat)";
    ColorConfig.noisePrimaryNoteSatScale = "var(--noise-primary-note-sat-scale)";
    ColorConfig.noisePrimaryNoteLum = "var(--noise-primary-note-lum)";
    ColorConfig.noisePrimaryNoteLumScale = "var(--noise-primary-note-lum-scale)";
    ColorConfig.trackEditorBgPitch = "var(--track-editor-bg-pitch, #444)";
    ColorConfig.trackEditorBgPitchDim = "var(--track-editor-bg-pitch-dim, #333)";
    ColorConfig.trackEditorBgNoise = "var(--track-editor-bg-noise, #444)";
    ColorConfig.trackEditorBgNoiseDim = "var(--track-editor-bg-noise-dim, #333)";
    ColorConfig.trackEditorBgMod = "var(--track-editor-bg-mod, #234)";
    ColorConfig.trackEditorBgModDim = "var(--track-editor-bg-mod-dim, #123)";
    ColorConfig.multiplicativeModSlider = "var(--multiplicative-mod-slider, #456;)";
    ColorConfig.overwritingModSlider = "var(--overwriting-mod-slider, #654)";
    ColorConfig.indicatorPrimary = "var(--indicator-primary, #74f)";
    ColorConfig.indicatorSecondary = "var(--indicator-secondary, #444)";
    ColorConfig.select2OptGroup = "var(--select2-opt-group, #585858)";
    ColorConfig.inputBoxOutline = "var(--input-box-outline, #333)";
    ColorConfig.muteButtonNormal = "var(--mute-button-normal, #ffa033)";
    ColorConfig.muteButtonMod = "var(--mute-button-mod, #9a6bff)";
    ColorConfig.modLabelPrimary = "var(--mod-label-primary, #999)";
    ColorConfig.modLabelSecondaryText = "var(--mod-label-secondary-text, #333)";
    ColorConfig.modLabelPrimaryText = "var(--mod-label-primary-text, black)";
    ColorConfig.disabledNotePrimary = "var(--disabled-note-primary, #999)";
    ColorConfig.disabledNoteSecondary = "var(--disabled-note-secondary, #666)";
    ColorConfig.c_pitchSecondaryChannelHue = 0;
    ColorConfig.c_pitchSecondaryChannelHueScale = 0;
    ColorConfig.c_pitchSecondaryChannelSat = 0;
    ColorConfig.c_pitchSecondaryChannelSatScale = 0;
    ColorConfig.c_pitchSecondaryChannelLum = 0;
    ColorConfig.c_pitchSecondaryChannelLumScale = 0;
    ColorConfig.c_pitchPrimaryChannelHue = 0;
    ColorConfig.c_pitchPrimaryChannelHueScale = 0;
    ColorConfig.c_pitchPrimaryChannelSat = 0;
    ColorConfig.c_pitchPrimaryChannelSatScale = 0;
    ColorConfig.c_pitchPrimaryChannelLum = 0;
    ColorConfig.c_pitchPrimaryChannelLumScale = 0;
    ColorConfig.c_pitchSecondaryNoteHue = 0;
    ColorConfig.c_pitchSecondaryNoteHueScale = 0;
    ColorConfig.c_pitchSecondaryNoteSat = 0;
    ColorConfig.c_pitchSecondaryNoteSatScale = 0;
    ColorConfig.c_pitchSecondaryNoteLum = 0;
    ColorConfig.c_pitchSecondaryNoteLumScale = 0;
    ColorConfig.c_pitchPrimaryNoteHue = 0;
    ColorConfig.c_pitchPrimaryNoteHueScale = 0;
    ColorConfig.c_pitchPrimaryNoteSat = 0;
    ColorConfig.c_pitchPrimaryNoteSatScale = 0;
    ColorConfig.c_pitchPrimaryNoteLum = 0;
    ColorConfig.c_pitchPrimaryNoteLumScale = 0;
    ColorConfig.c_modSecondaryChannelHue = 0;
    ColorConfig.c_modSecondaryChannelHueScale = 0;
    ColorConfig.c_modSecondaryChannelSat = 0;
    ColorConfig.c_modSecondaryChannelSatScale = 0;
    ColorConfig.c_modSecondaryChannelLum = 0;
    ColorConfig.c_modSecondaryChannelLumScale = 0;
    ColorConfig.c_modPrimaryChannelHue = 0;
    ColorConfig.c_modPrimaryChannelHueScale = 0;
    ColorConfig.c_modPrimaryChannelSat = 0;
    ColorConfig.c_modPrimaryChannelSatScale = 0;
    ColorConfig.c_modPrimaryChannelLum = 0;
    ColorConfig.c_modPrimaryChannelLumScale = 0;
    ColorConfig.c_modSecondaryNoteHue = 0;
    ColorConfig.c_modSecondaryNoteHueScale = 0;
    ColorConfig.c_modSecondaryNoteSat = 0;
    ColorConfig.c_modSecondaryNoteSatScale = 0;
    ColorConfig.c_modSecondaryNoteLum = 0;
    ColorConfig.c_modSecondaryNoteLumScale = 0;
    ColorConfig.c_modPrimaryNoteHue = 0;
    ColorConfig.c_modPrimaryNoteHueScale = 0;
    ColorConfig.c_modPrimaryNoteSat = 0;
    ColorConfig.c_modPrimaryNoteSatScale = 0;
    ColorConfig.c_modPrimaryNoteLum = 0;
    ColorConfig.c_modPrimaryNoteLumScale = 0;
    ColorConfig.c_noiseSecondaryChannelHue = 0;
    ColorConfig.c_noiseSecondaryChannelHueScale = 0;
    ColorConfig.c_noiseSecondaryChannelSat = 0;
    ColorConfig.c_noiseSecondaryChannelSatScale = 0;
    ColorConfig.c_noiseSecondaryChannelLum = 0;
    ColorConfig.c_noiseSecondaryChannelLumScale = 0;
    ColorConfig.c_noisePrimaryChannelHue = 0;
    ColorConfig.c_noisePrimaryChannelHueScale = 0;
    ColorConfig.c_noisePrimaryChannelSat = 0;
    ColorConfig.c_noisePrimaryChannelSatScale = 0;
    ColorConfig.c_noisePrimaryChannelLum = 0;
    ColorConfig.c_noisePrimaryChannelLumScale = 0;
    ColorConfig.c_noiseSecondaryNoteHue = 0;
    ColorConfig.c_noiseSecondaryNoteHueScale = 0;
    ColorConfig.c_noiseSecondaryNoteSat = 0;
    ColorConfig.c_noiseSecondaryNoteSatScale = 0;
    ColorConfig.c_noiseSecondaryNoteLum = 0;
    ColorConfig.c_noiseSecondaryNoteLumScale = 0;
    ColorConfig.c_noisePrimaryNoteHue = 0;
    ColorConfig.c_noisePrimaryNoteHueScale = 0;
    ColorConfig.c_noisePrimaryNoteSat = 0;
    ColorConfig.c_noisePrimaryNoteSatScale = 0;
    ColorConfig.c_noisePrimaryNoteLum = 0;
    ColorConfig.c_noisePrimaryNoteLumScale = 0;
    ColorConfig.c_pitchChannelCountOverride = 40;
    ColorConfig.c_noiseChannelCountOverride = 16;
    ColorConfig.c_modChannelCountOverride = 12;
    ColorConfig.c_pitchLimit = 1;
    ColorConfig.c_noiseLimit = 1;
    ColorConfig.c_modLimit = 1;
    ColorConfig.c_colorFormulaPitchLimit = 1;
    ColorConfig.c_colorFormulaNoiseLimit = 1;
    ColorConfig.c_colorFormulaModLimit = 1;
    ColorConfig.c_invertedText = "";
    ColorConfig.c_trackEditorBgNoiseDim = "";
    ColorConfig.c_trackEditorBgNoise = "";
    ColorConfig.c_trackEditorBgModDim = "";
    ColorConfig.c_trackEditorBgMod = "";
    ColorConfig.c_trackEditorBgPitchDim = "";
    ColorConfig.c_trackEditorBgPitch = "";
    ColorConfig.pitchChannels = toNameMap([
        {
            name: "pitch1",
            secondaryChannel: "var(--pitch1-secondary-channel, #0099A1)",
            primaryChannel: "var(--pitch1-primary-channel, #25F3FF)",
            secondaryNote: "var(--pitch1-secondary-note, #00BDC7)",
            primaryNote: "var(--pitch1-primary-note, #92F9FF)",
        }, {
            name: "pitch2",
            secondaryChannel: "var(--pitch2-secondary-channel, #A1A100)",
            primaryChannel: "var(--pitch2-primary-channel, #FFFF25)",
            secondaryNote: "var(--pitch2-secondary-note, #C7C700)",
            primaryNote: "var(--pitch2-primary-note, #FFFF92)",
        }, {
            name: "pitch3",
            secondaryChannel: "var(--pitch3-secondary-channel, #C75000)",
            primaryChannel: "var(--pitch3-primary-channel, #FF9752)",
            secondaryNote: "var(--pitch3-secondary-note, #FF771C)",
            primaryNote: "var(--pitch3-primary-note, #FFCDAB)",
        }, {
            name: "pitch4",
            secondaryChannel: "var(--pitch4-secondary-channel, #00A100)",
            primaryChannel: "var(--pitch4-primary-channel, #50FF50)",
            secondaryNote: "var(--pitch4-secondary-note, #00C700)",
            primaryNote: "var(--pitch4-primary-note, #A0FFA0)",
        }, {
            name: "pitch5",
            secondaryChannel: "var(--pitch5-secondary-channel, #D020D0)",
            primaryChannel: "var(--pitch5-primary-channel, #FF90FF)",
            secondaryNote: "var(--pitch5-secondary-note, #E040E0)",
            primaryNote: "var(--pitch5-primary-note, #FFC0FF)",
        }, {
            name: "pitch6",
            secondaryChannel: "var(--pitch6-secondary-channel, #7777B0)",
            primaryChannel: "var(--pitch6-primary-channel, #A0A0FF)",
            secondaryNote: "var(--pitch6-secondary-note, #8888D0)",
            primaryNote: "var(--pitch6-primary-note, #D0D0FF)",
        }, {
            name: "pitch7",
            secondaryChannel: "var(--pitch7-secondary-channel, #8AA100)",
            primaryChannel: "var(--pitch7-primary-channel, #DEFF25)",
            secondaryNote: "var(--pitch7-secondary-note, #AAC700)",
            primaryNote: "var(--pitch7-primary-note, #E6FF92)",
        }, {
            name: "pitch8",
            secondaryChannel: "var(--pitch8-secondary-channel, #DF0019)",
            primaryChannel: "var(--pitch8-primary-channel, #FF98A4)",
            secondaryNote: "var(--pitch8-secondary-note, #FF4E63)",
            primaryNote: "var(--pitch8-primary-note, #FFB2BB)",
        }, {
            name: "pitch9",
            secondaryChannel: "var(--pitch9-secondary-channel, #00A170)",
            primaryChannel: "var(--pitch9-primary-channel, #50FFC9)",
            secondaryNote: "var(--pitch9-secondary-note, #00C78A)",
            primaryNote: "var(--pitch9-primary-note, #83FFD9)",
        }, {
            name: "pitch10",
            secondaryChannel: "var(--pitch10-secondary-channel, #A11FFF)",
            primaryChannel: "var(--pitch10-primary-channel, #CE8BFF)",
            secondaryNote: "var(--pitch10-secondary-note, #B757FF)",
            primaryNote: "var(--pitch10-primary-note, #DFACFF)",
        },
    ]);
    ColorConfig.noiseChannels = toNameMap([
        {
            name: "noise1",
            secondaryChannel: "var(--noise1-secondary-channel, #6F6F6F)",
            primaryChannel: "var(--noise1-primary-channel, #AAAAAA)",
            secondaryNote: "var(--noise1-secondary-note, #A7A7A7)",
            primaryNote: "var(--noise1-primary-note, #E0E0E0)",
        }, {
            name: "noise2",
            secondaryChannel: "var(--noise2-secondary-channel, #996633)",
            primaryChannel: "var(--noise2-primary-channel, #DDAA77)",
            secondaryNote: "var(--noise2-secondary-note, #CC9966)",
            primaryNote: "var(--noise2-primary-note, #F0D0BB)",
        }, {
            name: "noise3",
            secondaryChannel: "var(--noise3-secondary-channel, #4A6D8F)",
            primaryChannel: "var(--noise3-primary-channel, #77AADD)",
            secondaryNote: "var(--noise3-secondary-note, #6F9FCF)",
            primaryNote: "var(--noise3-primary-note, #BBD7FF)",
        }, {
            name: "noise4",
            secondaryChannel: "var(--noise4-secondary-channel, #7A4F9A)",
            primaryChannel: "var(--noise4-primary-channel, #AF82D2)",
            secondaryNote: "var(--noise4-secondary-note, #9E71C1)",
            primaryNote: "var(--noise4-primary-note, #D4C1EA)",
        }, {
            name: "noise5",
            secondaryChannel: "var(--noise5-secondary-channel, #607837)",
            primaryChannel: "var(--noise5-primary-channel, #A2BB77)",
            secondaryNote: "var(--noise5-secondary-note, #91AA66)",
            primaryNote: "var(--noise5-primary-note, #C5E2B2)",
        },
    ]);
    ColorConfig.modChannels = toNameMap([
        {
            name: "mod1",
            secondaryChannel: "var(--mod1-secondary-channel, #339955)",
            primaryChannel: "var(--mod1-primary-channel, #77fc55)",
            secondaryNote: "var(--mod1-secondary-note, #77ff8a)",
            primaryNote: "var(--mod1-primary-note, #cdffee)",
        }, {
            name: "mod2",
            secondaryChannel: "var(--mod2-secondary-channel, #993355)",
            primaryChannel: "var(--mod2-primary-channel, #f04960)",
            secondaryNote: "var(--mod2-secondary-note, #f057a0)",
            primaryNote: "var(--mod2-primary-note, #ffb8de)",
        }, {
            name: "mod3",
            secondaryChannel: "var(--mod3-secondary-channel, #553399)",
            primaryChannel: "var(--mod3-primary-channel, #8855fc)",
            secondaryNote: "var(--mod3-secondary-note, #aa64ff)",
            primaryNote: "var(--mod3-primary-note, #f8ddff)",
        }, {
            name: "mod4",
            secondaryChannel: "var(--mod4-secondary-channel, #a86436)",
            primaryChannel: "var(--mod4-primary-channel, #c8a825)",
            secondaryNote: "var(--mod4-secondary-note, #e8ba46)",
            primaryNote: "var(--mod4-primary-note, #fff6d3)",
        },
    ]);
    ColorConfig._styleElement = document.head.appendChild(HTML.style({ type: "text/css" }));

    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent);
    
    
    updateThemes = function() {
	if (CustomThemes) {
		ColorConfig.themes = { ...ColorConfig.themes, ...CustomThemes };
	}
}
updateThemes()
    
    
    EditorConfig.version = "0.5";
    EditorConfig.versionDisplayName = "Slarmoo's Box " + EditorConfig.version;
    EditorConfig.releaseNotesURL = "./patch_notes.html";
    EditorConfig.isOnMac = /^Mac/i.test(navigator.platform) || /Mac OS X/i.test(navigator.userAgent) || /^(iPhone|iPad|iPod)/i.test(navigator.platform) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    EditorConfig.ctrlSymbol = EditorConfig.isOnMac ? "⌘" : "Ctrl+";
    EditorConfig.ctrlName = EditorConfig.isOnMac ? "command" : "control";
    EditorConfig.presetCategories = toNameMap([
        {
            name: "Custom Instruments", presets: toNameMap([
                { name: TypePresets[0], customType: 0 },
                { name: TypePresets[1], customType: 1 },
                { name: TypePresets[2], customType: 2 },
                { name: TypePresets[3], customType: 3 },
                { name: TypePresets[4], customType: 4 },
                { name: TypePresets[5], customType: 5 },
                { name: TypePresets[6], customType: 6 },
                { name: TypePresets[7], customType: 7 },
                { name: TypePresets[8], customType: 8 },
                { name: TypePresets[9], customType: 9 },
                { name: TypePresets[11], customType: 11 },
            ])
        },
        {
            name: "Retro Presets", presets: toNameMap([
                { name: "square wave", midiProgram: 80, settings: { "type": "chip", "eqFilter": [], "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -1, "chord": "arpeggio", "wave": "square", "unison": "none", "envelopes": [] } },
                { name: "triangle wave", midiProgram: 71, settings: { "type": "chip", "eqFilter": [], "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -1, "chord": "arpeggio", "wave": "triangle", "unison": "none", "envelopes": [] } },
                { name: "square lead", midiProgram: 80, generalMidi: true, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "square", "unison": "hum", "envelopes": [] } },
                { name: "sawtooth lead 1", midiProgram: 81, generalMidi: true, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "sawtooth", "unison": "shimmer", "envelopes": [] } },
                { name: "sawtooth lead 2", midiProgram: 81, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1 }], "effects": ["vibrato", "aliasing"], "vibrato": "light", "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "hum", "envelopes": [] } },
                { name: "chip noise", midiProgram: 116, isNoise: true, settings: { "type": "noise", "transition": "hard", "effects": ["aliasing"], "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "steady", "wave": "retro" } },
                { name: "supersaw lead", midiProgram: 81, settings: { "type": "supersaw", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 2 }], "effects": ["reverb"], "reverb": 67, "fadeInSeconds": 0, "fadeOutTicks": -6, "pulseWidth": 50, "dynamism": 100, "spread": 58, "shape": 0, "envelopes": [] } },
                { name: "FM twang", midiProgram: 32, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }] } },
                { name: "FM bass", midiProgram: 36, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "2×", "amplitude": 11 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "20×", "amplitude": 3 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 3 }] } },
                { name: "FM flute", midiProgram: 73, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }] } },
                { name: "FM organ", midiProgram: 16, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato"], "vibrato": "delayed", "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "2×", "amplitude": 14 }, { "frequency": "1×", "amplitude": 11 }, { "frequency": "2×", "amplitude": 11 }], "envelopes": [] } },
                { name: "FM sine", midiProgram: 55, settings: { "type": "FM", "eqFilter": [], "eqFilterType": true, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "effects": [], "panDelay": 10, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1 2 3 4", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine" }, { "frequency": "1×", "amplitude": 0, "waveform": "sine" }, { "frequency": "1×", "amplitude": 0, "waveform": "sine" }, { "frequency": "1×", "amplitude": 0, "waveform": "sine" }], "envelopes": [] } },
                { name: "NES Pulse", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "vibrato": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -24, -23, -23, -23, -23, -22, -22, -22, -22, -21, -21, -21, -21, -20, -20, -20, -20, -19, -19, -19, -19, -18, -18, -18, -18, -17, -17, -17, -17, 24, 24, 24, 24, 23, 23, 23, 23, 22, 22, 22, 22, 21, 21, 21, 21, 20, 20, 20, 20, 19, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17] } },
                { name: "Gameboy Pulse", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -20, -17, -15, -13, -13, -11, -11, -11, -9, -9, -9, -9, -7, -7, -7, -7, -7, -5, -5, -5, -5, -5, -5, -3, -3, -3, -3, -3, -3, -3, -3, 24, 20, 17, 15, 13, 13, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3] } },
                { name: "VRC6 Sawtooth", midiProgram: 81, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -20, -16, -13, -10, -8, -6, -5, -4, -4, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 12, 12, 12, 12, 12, 12, 12, 12, 16, 16, 16, 16, 16, 16, 16, 16, 20, 20, 20, 20, 20, 20, 20, 20, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24] } },
                { name: "Atari Square", midiProgram: 80, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -23, -23, -23, -22, -22, -22, -21, -21, -21, -20, -20, -20, -19, -19, -19, -18, -18, -18, -17, -17, -17, -16, -16, -16, -15, -15, -15, -14, -14, -14, -13, -13, -13, 24, 24, 24, 23, 23, 23, 22, 22, 22, 21, 21, 21, 20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 15, 15] } },
                { name: "Atari Bass", midiProgram: 36, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "interrupt", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [-24, -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24, 24, -24, -24, -24, 24, 24, 24, -24, -24, -24, 24, 24, 24, -24, -24, -24, 24, 24, -24, -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24, 24, -24, -24, 24, 24, 24, 24, 24, -24, -24, -24, -24, 24, 24, -24, -24, 24, 24] } },
                { name: "Sunsoft Bass", midiProgram: 36, settings: { "type": "custom chip", "effects": ["aliasing"], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "arpeggio", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }], "unison": "none", "envelopes": [], "customChipWave": [24, 24, 15, 15, 9, 9, -4, -4, 0, 0, -13, -13, -19, -19, -24, -24, -24, -24, -10, -10, 0, 0, -7, -7, -7, -7, 0, 0, 6, 6, -4, -4, 3, 3, -4, -4, 3, 3, 3, 3, 9, 9, 15, 15, 15, 15, 6, 6, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 3, 3, 12, 12, 24, 24] } },
            ])
        },
        {
            name: "Keyboard Presets", presets: toNameMap([
                { name: "grand piano 1", midiProgram: 0, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.125 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 100, 86, 86, 86, 71, 71, 71, 0, 86, 71, 71, 71, 57, 57, 71, 57, 14, 57, 57, 57, 57, 57, 57, 57, 57, 29, 57], "unison": "piano", "stringSustain": 79, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }] } },
                { name: "bright piano", midiProgram: 1, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 1.4142 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "harmonics": [100, 100, 86, 86, 71, 71, 0, 71, 71, 71, 71, 71, 71, 14, 57, 57, 57, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 57], "unison": "piano", "stringSustain": 86, "envelopes": [] } },
                { name: "electric grand", midiProgram: 2, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "1/8 pulse", "unison": "shimmer", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "honky-tonk piano", midiProgram: 3, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 100, 86, 71, 86, 71, 43, 71, 43, 43, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 43, 57, 57, 57, 43, 43, 43, 43], "unison": "honky tonk", "stringSustain": 71, "envelopes": [] } },
                { name: "electric piano 1", midiProgram: 4, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "harmonics": [86, 100, 100, 71, 71, 57, 57, 43, 43, 43, 29, 29, 29, 14, 14, 14, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0], "unison": "none", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
                { name: "electric piano 2", midiProgram: 5, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "16×", "amplitude": 6 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 3 }] } },
                { name: "harpsichord", midiProgram: 6, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 250, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 2.8284 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "harmonics": [100, 100, 100, 86, 57, 86, 86, 86, 86, 57, 57, 71, 71, 86, 86, 71, 71, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71], "unison": "none", "stringSustain": 79, "envelopes": [] } },
                { name: "clavinet", midiProgram: 7, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.3536 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "3⟲", "feedbackAmplitude": 6, "operators": [{ "frequency": "3×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 6 }, { "frequency": "8×", "amplitude": 4 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }, { "target": "feedbackAmplitude", "envelope": "twang 2" }] } },
                { name: "dulcimer", midiProgram: 15, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 100, 100, 86, 100, 86, 57, 100, 100, 86, 100, 86, 100, 86, 100, 71, 57, 71, 71, 100, 86, 71, 86, 86, 100, 86, 86, 86], "unison": "piano", "stringSustain": 79, "envelopes": [] } },
                { name: "grand piano 2", midiProgram: 0, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.125 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [100, 86, 86, 86, 86, 71, 71, 57, 0, 57, 29, 43, 57, 57, 57, 43, 43, 0, 29, 43, 43, 43, 43, 43, 43, 29, 0, 29], "unison": "piano", "stringSustain": 79, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }] } },
                { name: "grand piano 3", midiProgram: 0, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 4 }, { "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.1768 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 4 }, { "type": "peak", "cutoffHz": 2378.41, "linearGain": 0.25 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 125, "linearGain": 0.0884 }], "reverb": 67, "fadeInSeconds": 0, "fadeOutTicks": 48, "harmonics": [100, 100, 86, 86, 86, 71, 71, 71, 0, 71, 71, 71, 71, 57, 57, 71, 57, 14, 57, 57, 57, 57, 57, 57, 57, 57, 29, 57], "unison": "piano", "stringSustain": 86, "stringSustainType": "acoustic", "envelopes": [{ "target": "noteFilterFreq", "envelope": "note size", "index": 0 }, { "target": "noteFilterFreq", "envelope": "twang 1", "index": 1 }, { "target": "noteFilterFreq", "envelope": "twang 1", "index": 1 }] } },
            ])
        },
        {
            name: "Idiophone Presets", presets: toNameMap([
                { name: "celesta", midiProgram: 8, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1×", "amplitude": 11, "envelope": "custom" }, { "frequency": "8×", "amplitude": 6, "envelope": "custom" }, { "frequency": "20×", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "3×", "amplitude": 1, "envelope": "twang 2" }] } },
                { name: "glockenspiel", midiProgram: 9, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 193, "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "fastTwoNoteArp": true, "arpeggioSpeed": 12, "noteFilterType": true, "noteSimpleCut": 9, "noteSimplePeak": 1, "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "1×", "amplitude": 7, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "5×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "8×", "amplitude": 7, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "20×", "amplitude": 2, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "feedbackAmplitude", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "music box 1", midiProgram: 10, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 71, 0], "unison": "none", "stringSustain": 64, "envelopes": [] } },
                { name: "music box 2", midiProgram: 10, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 0.7071 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 57, 57, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "none", "stringSustain": 29, "envelopes": [] } },
                { name: "vibraphone", midiProgram: 11, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 3, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "9×", "amplitude": 3, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }] } },
                { name: "marimba", midiProgram: 12, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 197, "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "fastTwoNoteArp": true, "arpeggioSpeed": 12, "noteFilterType": true, "noteSimpleCut": 6, "noteSimplePeak": 2, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.7071 }], "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "1 2←(3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 6, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "13×", "amplitude": 6, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }], "isDrum": false } },
                { name: "kalimba", midiProgram: 108, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 198, "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "fastTwoNoteArp": true, "arpeggioSpeed": 12, "noteFilterType": true, "noteSimpleCut": 7, "noteSimplePeak": 1, "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 0.5 }], "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "5×", "amplitude": 3, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "20×", "amplitude": 3, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }], "isDrum": false } },
                { name: "xylophone", midiProgram: 13, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "11×", "amplitude": 9, "envelope": "custom" }, { "frequency": "20×", "amplitude": 6, "envelope": "twang 1" }] } },
                { name: "tubular bell", midiProgram: 14, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.5 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 96, "chord": "strum", "harmonics": [43, 71, 0, 100, 0, 100, 0, 86, 0, 0, 86, 0, 14, 71, 14, 14, 57, 14, 14, 43, 14, 14, 43, 14, 14, 43, 14, 14], "unison": "shimmer", "stringSustain": 86, "envelopes": [] } },
                { name: "bell synth", midiProgram: 14, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "7×", "amplitude": 6, "envelope": "twang 3" }, { "frequency": "20×", "amplitude": 1, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "rain drop", midiProgram: 96, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "6×", "amplitude": 4, "envelope": "custom" }, { "frequency": "20×", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "1×", "amplitude": 6, "envelope": "tremolo1" }] } },
                { name: "crystal", midiProgram: 98, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "delayed", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "3×", "amplitude": 7, "envelope": "custom" }, { "frequency": "6×", "amplitude": 4, "envelope": "custom" }, { "frequency": "13×", "amplitude": 4, "envelope": "custom" }] } },
                { name: "tinkle bell", midiProgram: 112, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "~2×", "amplitude": 7, "envelope": "custom" }, { "frequency": "5×", "amplitude": 7, "envelope": "custom" }, { "frequency": "7×", "amplitude": 7, "envelope": "custom" }, { "frequency": "16×", "amplitude": 7, "envelope": "custom" }] } },
                { name: "agogo", midiProgram: 113, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 205, "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "fastTwoNoteArp": true, "arpeggioSpeed": 12, "noteFilterType": true, "noteSimpleCut": 8, "noteSimplePeak": 1, "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "1 2 3 4", "feedbackType": "1→4", "feedbackAmplitude": 15, "operators": [{ "frequency": "2×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "5×", "amplitude": 6, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "8×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "13×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "feedbackAmplitude", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
            ])
        },
        {
            name: "Guitar Presets", presets: toNameMap([
                { name: "nylon guitar", midiProgram: 24, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "3⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "5×", "amplitude": 2, "envelope": "steady" }, { "frequency": "7×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "steel guitar", midiProgram: 25, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "harmonics": [100, 100, 86, 71, 71, 71, 86, 86, 71, 57, 43, 43, 43, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43], "unison": "none", "stringSustain": 71, "envelopes": [] } },
                { name: "jazz guitar", midiProgram: 26, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 57, 71, 71, 43, 57, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "clean guitar", midiProgram: 27, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [86, 100, 100, 100, 86, 57, 86, 100, 100, 100, 71, 57, 43, 71, 86, 71, 57, 57, 71, 71, 71, 71, 57, 57, 57, 57, 57, 43] } },
                { name: "muted guitar", midiProgram: 28, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "4×", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "16×", "amplitude": 4, "envelope": "twang 1" }] } },
            ])
        },
        {
            name: "Picked Bass Presets", presets: toNameMap([
                { name: "acoustic bass", midiProgram: 32, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "fingered bass", midiProgram: 33, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 57, 71, 43, 57, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "picked bass", midiProgram: 34, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 5, "envelope": "steady" }, { "frequency": "11×", "amplitude": 1, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 9, "envelope": "steady" }] } },
                { name: "fretless bass", midiProgram: 35, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "flare 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 71, 57, 57, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 14] } },
                { name: "slap bass 1", midiProgram: 36, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 100, 100, 86, 71, 57, 29, 29, 43, 43, 57, 71, 57, 29, 29, 43, 57, 57, 57, 43, 43, 43, 57, 71, 71, 71, 71] } },
                { name: "slap bass 2", midiProgram: 37, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "3⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "3×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }, { "frequency": "13×", "amplitude": 3, "envelope": "steady" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "bass synth 1", midiProgram: 38, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "twang 1" }, { "frequency": "~1×", "amplitude": 13, "envelope": "twang 2" }] } },
                { name: "bass synth 2", midiProgram: 39, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 57, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1→2", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "1×", "amplitude": 9, "envelope": "steady" }, { "frequency": "3×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "bass & lead", midiProgram: 87, generalMidi: true, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 86, "filterEnvelope": "twang 2", "wave": "sawtooth", "interval": "shimmer", "vibrato": "none" } },
                { name: "dubstep yoi yoi", midiProgram: 87, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.7071 }], "effects": ["note filter", "bitcrusher"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 594.6, "linearGain": 11.3137 }], "bitcrusherOctave": 1.5, "bitcrusherQuantization": 0, "transition": "slide", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "arpeggio", "wave": "sawtooth", "unison": "none", "envelopes": [{ "target": "noteFilterFreq", "envelope": "flare 2", "index": 0 }] } },
            ])
        },
        {
            name: "Picked String Presets", presets: toNameMap([
                { name: "pizzicato strings", midiProgram: 45, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "3×", "amplitude": 11, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 10, "envelope": "steady" }] } },
                { name: "harp", midiProgram: 46, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "3⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "4×", "amplitude": 6, "envelope": "custom" }, { "frequency": "~2×", "amplitude": 3, "envelope": "steady" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }] } },
                { name: "sitar", midiProgram: 104, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 57, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "twang 3" }, { "frequency": "9×", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "16×", "amplitude": 9, "envelope": "swell 3" }] } },
                { name: "banjo", midiProgram: 105, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "2⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "steady" }, { "frequency": "11×", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "ukulele", midiProgram: 105, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "9×", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "1×", "amplitude": 11, "envelope": "steady" }] } },
                { name: "shamisen", midiProgram: 106, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "3⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "steady" }, { "frequency": "16×", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }] } },
                { name: "koto", midiProgram: 107, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "~1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "6×", "amplitude": 10, "envelope": "custom" }, { "frequency": "4×", "amplitude": 8, "envelope": "twang 3" }, { "frequency": "~2×", "amplitude": 8, "envelope": "twang 3" }] } },
            ])
        },
        {
            name: "Distortion Presets", presets: toNameMap([
                { name: "overdrive guitar", midiProgram: 29, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.5 }], "effects": ["note filter", "distortion"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 297.3, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.7071 }], "distortion": 71, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 12, "chord": "strum", "harmonics": [86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57], "unison": "none", "stringSustain": 71, "envelopes": [{ "target": "noteFilterFreq", "envelope": "note size", "index": 1 }] } },
                { name: "distortion guitar", midiProgram: 30, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 0.25 }], "effects": ["note filter", "distortion", "reverb"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 353.55, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 2000, "linearGain": 1 }], "distortion": 86, "reverb": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 12, "chord": "strum", "harmonics": [86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57], "unison": "none", "stringSustain": 71, "envelopes": [{ "target": "noteFilterFreq", "envelope": "note size", "index": 1 }] } },
                { name: "charango synth", midiProgram: 84, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 1 }], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2→3→4", "feedbackAmplitude": 8, "operators": [{ "frequency": "3×", "amplitude": 13 }, { "frequency": "~1×", "amplitude": 5 }, { "frequency": "4×", "amplitude": 6 }, { "frequency": "3×", "amplitude": 7 }], "envelopes": [{ "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "guitar harmonics", midiProgram: 31, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 2 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3)←4", "feedbackType": "1⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "4×", "amplitude": 12 }, { "frequency": "16×", "amplitude": 5 }, { "frequency": "1×", "amplitude": 2 }, { "frequency": "~1×", "amplitude": 12 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 1 }, { "target": "operatorAmplitude", "envelope": "punch", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 1", "index": 3 }] } },
                { name: "PWM overdrive", midiProgram: 29, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1.4142 }], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "pulseWidth": 17.67767, "envelopes": [{ "target": "pulseWidth", "envelope": "punch" }] } },
                { name: "PWM distortion", midiProgram: 30, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 2 }], "effects": ["vibrato"], "vibrato": "delayed", "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "pulseWidth": 50, "envelopes": [{ "target": "pulseWidth", "envelope": "swell 1" }] } },
                { name: "FM overdrive", midiProgram: 29, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 1 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2", "feedbackAmplitude": 2, "operators": [{ "frequency": "~1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 12 }, { "frequency": "~2×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 12 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "twang 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "punch" }] } },
                { name: "FM distortion", midiProgram: 30, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 2 }], "effects": ["reverb"], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "strum", "algorithm": "1←(2 3←4)", "feedbackType": "1→2", "feedbackAmplitude": 4, "operators": [{ "frequency": "~1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 11 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "~2×", "amplitude": 4 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 3 }] } },
            ])
        },
        {
            name: "Bellows Presets", presets: toNameMap([
                { name: "drawbar organ 1", midiProgram: 16, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 86, 0, 86, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "drawbar organ 2", midiProgram: 16, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 29, 71, 86, 71, 14, 0, 100, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 0, 57, 0, 0, 0, 29, 0, 0, 0, 0] } },
                { name: "percussive organ", midiProgram: 17, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 515, "effects": ["vibrato", "note filter", "chorus", "reverb"], "vibrato": "delayed", "vibratoDepth": 0.3, "vibratoDelay": 18.5, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": true, "noteSimpleCut": 8, "noteSimplePeak": 1, "noteFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 0.5 }], "chorus": 100, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -3, "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "1×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "6×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "punch", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "feedbackAmplitude", "envelope": "flare", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "rock organ", midiProgram: 18, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "delayed", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "flare 1", "operators": [{ "frequency": "1×", "amplitude": 9, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "6×", "amplitude": 9, "envelope": "custom" }, { "frequency": "2×", "amplitude": 5, "envelope": "steady" }] } },
                { name: "pipe organ", midiProgram: 19, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 8, "envelope": "custom" }, { "frequency": "2×", "amplitude": 9, "envelope": "custom" }, { "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "8×", "amplitude": 8, "envelope": "custom" }] } },
                { name: "reed organ", midiProgram: 20, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [71, 86, 100, 86, 71, 100, 57, 71, 71, 71, 43, 43, 43, 71, 43, 71, 57, 57, 57, 57, 57, 57, 57, 29, 43, 29, 29, 14] } },
                { name: "accordion", midiProgram: 21, generalMidi: true, settings: { "type": "chip", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "swell 1", "wave": "double saw", "interval": "honky tonk", "vibrato": "none" } },
                { name: "bandoneon", midiProgram: 23, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "interval": "hum", "vibrato": "none", "harmonics": [86, 86, 86, 57, 71, 86, 57, 71, 71, 71, 57, 43, 57, 43, 71, 43, 71, 57, 57, 43, 43, 43, 57, 43, 43, 29, 29, 29] } },
                { name: "bagpipe", midiProgram: 109, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "punch", "interval": "hum", "vibrato": "none", "harmonics": [71, 86, 86, 100, 100, 86, 57, 100, 86, 71, 71, 71, 57, 57, 57, 71, 57, 71, 57, 71, 43, 57, 57, 43, 43, 43, 43, 43] } },
            ])
        },
        {
            name: "String Presets", presets: toNameMap([
                { name: "violin 1", midiProgram: 40, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["vibrato", "reverb"], "vibrato": "delayed", "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 6, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "1→2", "feedbackAmplitude": 5, "operators": [{ "frequency": "4×", "amplitude": 9 }, { "frequency": "3×", "amplitude": 9 }, { "frequency": "2×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "viola", midiProgram: 41, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "7×", "amplitude": 7, "envelope": "custom" }, { "frequency": "13×", "amplitude": 4, "envelope": "custom" }, { "frequency": "1×", "amplitude": 5, "envelope": "steady" }] } },
                { name: "cello", midiProgram: 42, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 5.6569 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.0884 }], "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 12, "chord": "simultaneous", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "16×", "amplitude": 5 }, { "frequency": "~1×", "amplitude": 10 }, { "frequency": "1×", "amplitude": 9 }, { "frequency": "6×", "amplitude": 3 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 1" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }] } },
                { name: "contrabass", midiProgram: 43, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "16×", "amplitude": 5, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "steady" }, { "frequency": "6×", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "fiddle", midiProgram: 110, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1 2)←(3 4)", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "8×", "amplitude": 8, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "16×", "amplitude": 3, "envelope": "steady" }] } },
                { name: "tremolo strings", midiProgram: 44, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "effects": ["note filter", "chorus", "reverb"], "noteFilterType": true, "noteSimpleCut": 6, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 0.1768 }], "chorus": 100, "reverb": 0, "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "algorithm": "1 2 3 4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 12, "operators": [{ "frequency": "1×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "7×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 4, "perEnvelopeLowerBound": 0.5, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "strings", midiProgram: 48, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4×", "amplitude": 9, "envelope": "custom" }, { "frequency": "3×", "amplitude": 9, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "slow strings", midiProgram: 49, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 0, "filterEnvelope": "swell 2", "vibrato": "none", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "flare 3", "operators": [{ "frequency": "4×", "amplitude": 10, "envelope": "custom" }, { "frequency": "3×", "amplitude": 10, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 4, "envelope": "swell 1" }] } },
                { name: "strings synth 1", midiProgram: 50, generalMidi: true, settings: { "type": "chip", "transition": "soft fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 43, "filterEnvelope": "steady", "wave": "sawtooth", "interval": "hum", "vibrato": "delayed" } },
                { name: "strings synth 2", midiProgram: 51, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 12, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "3×", "amplitude": 6, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "custom" }, { "frequency": "1×", "amplitude": 9, "envelope": "custom" }] } },
                { name: "orchestra hit 1", midiProgram: 55, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "custom", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 14, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "twang 3" }, { "frequency": "2×", "amplitude": 15, "envelope": "flare 3" }, { "frequency": "4×", "amplitude": 15, "envelope": "flare 2" }, { "frequency": "8×", "amplitude": 15, "envelope": "flare 1" }] } },
                { name: "violin 2", midiProgram: 40, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 105.11, "linearGain": 0.3536 }], "effects": ["vibrato", "reverb"], "vibrato": "light", "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 6, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "3×", "amplitude": 13, "envelope": "custom" }, { "frequency": "2×", "amplitude": 7, "envelope": "steady" }, { "frequency": "7×", "amplitude": 8, "envelope": "swell 1" }] } },
                { name: "orchestra hit 2", midiProgram: 55, midiSubharmonicOctaves: 1, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 588, "effects": ["vibrato", "note filter", "chorus", "reverb"], "vibrato": "delayed", "vibratoDepth": 0.3, "vibratoDelay": 18.5, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": true, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.5 }], "chorus": 100, "reverb": 0, "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 14, "operators": [{ "frequency": "1×", "amplitude": 12, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 14, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "3×", "amplitude": 12, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 14, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "supersaw string", midiProgram: 41, settings: { "type": "supersaw", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 1.4142 }, { "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 0.1768 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 500, "linearGain": 0.1768 }], "reverb": 33, "fadeInSeconds": 0.0263, "fadeOutTicks": 6, "pulseWidth": 35.35534, "dynamism": 83, "spread": 8, "shape": 50, "envelopes": [{ "target": "noteFilterFreq", "envelope": "twang 1", "index": 0 }] } },
                { name: "supersaw string 2", midiProgram: 41, settings: { "type": "supersaw", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 2 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 2 }], "effects": ["note filter", "chorus", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 1 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 1 }], "chorus": 57, "reverb": 42, "fadeInSeconds": 0.0575, "fadeOutTicks": -6, "pulseWidth": 50, "dynamism": 67, "spread": 58, "shape": 0, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "punch" }, { "target": "pulseWidth", "envelope": "flare 2" }] } },
            ])
        },
        {
            name: "Vocal Presets", presets: toNameMap([
                { name: "choir soprano", midiProgram: 94, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 707.11, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.25 }, { "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 24, "harmonics": [100, 100, 86, 57, 29, 29, 57, 71, 57, 29, 14, 14, 14, 29, 43, 57, 43, 29, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "choir tenor", midiProgram: 52, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [{ "type": "peak", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "choir bass", midiProgram: 52, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 11.3137 }], "effects": ["vibrato", "chorus", "reverb"], "vibrato": "shaky", "chorus": 100, "reverb": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 48, "chord": "simultaneous", "harmonics": [71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "solo soprano", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 707.11, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.25 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "harmonics": [86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43, 57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "solo tenor", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "peak", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 297.3, "linearGain": 0.7071 }, { "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "harmonics": [86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "solo bass", midiProgram: 85, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 8 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 8 }, { "type": "high-pass", "cutoffHz": 210.22, "linearGain": 1.4142 }], "effects": ["vibrato", "reverb"], "vibrato": "shaky", "reverb": 33, "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": 12, "chord": "simultaneous", "harmonics": [71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14], "unison": "none", "envelopes": [] } },
                { name: "voice ooh", midiProgram: 53, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 57, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [100, 57, 43, 43, 14, 14, 0, 0, 0, 14, 29, 29, 14, 0, 14, 29, 29, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "voice synth", midiProgram: 54, generalMidi: true, settings: { "type": "chip", "transition": "medium fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 57, "filterEnvelope": "steady", "wave": "rounded", "interval": "union", "vibrato": "light" } },
                { name: "vox synth lead", midiProgram: 85, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "(1 2 3)←4", "feedbackType": "1→2→3→4", "feedbackAmplitude": 2, "feedbackEnvelope": "punch", "operators": [{ "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "9×", "amplitude": 5, "envelope": "custom" }, { "frequency": "20×", "amplitude": 1, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "tiny robot", midiProgram: 85, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "reverb"], "vibrato": "delayed", "reverb": 33, "transition": "slide", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "2×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "~1×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "punch", "index": 1 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "yowie", midiProgram: 85, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "effects": ["note filter", "reverb"], "noteFilterType": true, "noteSimpleCut": 6, "noteSimplePeak": 6, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2000, "linearGain": 4 }], "reverb": 0, "fadeInSeconds": 0.0413, "fadeOutTicks": 6, "algorithm": "1←2←(3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 12, "operators": [{ "frequency": "2×", "amplitude": 12, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "16×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0.5, "perEnvelopeUpperBound": 1 }, { "target": "feedbackAmplitude", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "mouse", midiProgram: 85, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "reverb"], "vibrato": "light", "reverb": 33, "transition": "slide in pattern", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "2×", "amplitude": 13 }, { "frequency": "5×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteVolume", "envelope": "note size" }, { "target": "feedbackAmplitude", "envelope": "flare 2" }] } },
                { name: "gumdrop", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2×", "amplitude": 15, "envelope": "punch" }, { "frequency": "4×", "amplitude": 15, "envelope": "punch" }, { "frequency": "7×", "amplitude": 15, "envelope": "punch" }, { "frequency": "1×", "amplitude": 10, "envelope": "twang 1" }] } },
                { name: "echo drop", midiProgram: 102, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "~1×", "amplitude": 5, "envelope": "steady" }, { "frequency": "11×", "amplitude": 2, "envelope": "steady" }, { "frequency": "16×", "amplitude": 5, "envelope": "swell 3" }] } },
                { name: "dark choir", midiProgram: 85, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "spectrum": [43, 14, 14, 14, 14, 14, 14, 100, 14, 14, 14, 57, 14, 14, 100, 14, 43, 14, 43, 14, 14, 43, 14, 29, 14, 29, 14, 14, 29, 0] } },
            ])
        },
        {
            name: "Brass Presets", presets: toNameMap([
                { name: "trumpet", midiProgram: 56, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 5, "envelope": "flare 2" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "trombone", midiProgram: 57, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "tuba", midiProgram: 58, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "muted trumpet", midiProgram: 59, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 4000, "linearGain": 2.8284 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }], "reverb": 33, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "1×", "amplitude": 13 }, { "frequency": "1×", "amplitude": 5 }, { "frequency": "9×", "amplitude": 5 }, { "frequency": "13×", "amplitude": 7 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 1" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "flare 2" }] } },
                { name: "french horn", midiProgram: 60, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 1 }, { "type": "peak", "cutoffHz": 2378.41, "linearGain": 2.8284 }], "effects": ["reverb"], "reverb": 33, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "~1×", "amplitude": 8 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "swell 1" }] } },
                { name: "brass section", midiProgram: 61, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "swell 1" }, { "frequency": "~1×", "amplitude": 10, "envelope": "swell 1" }] } },
                { name: "brass synth 1", midiProgram: 62, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 11, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 14, "envelope": "custom" }, { "frequency": "1×", "amplitude": 12, "envelope": "flare 1" }, { "frequency": "~1×", "amplitude": 8, "envelope": "flare 2" }] } },
                { name: "brass synth 2", midiProgram: 63, generalMidi: true, settings: { "type": "FM", "transition": "soft", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "flare 1" }, { "frequency": "~1×", "amplitude": 7, "envelope": "flare 1" }] } },
                { name: "pulse brass", midiProgram: 62, settings: { "type": "PWM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "pulseWidth": 50, "pulseEnvelope": "flare 3", "vibrato": "none" } },
            ])
        },
        {
            name: "Reed Presets", presets: toNameMap([
                { name: "soprano sax", midiProgram: 64, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "4⟲", "feedbackAmplitude": 5, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "4×", "amplitude": 4, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 7, "envelope": "steady" }, { "frequency": "5×", "amplitude": 4, "envelope": "punch" }] } },
                { name: "alto sax", midiProgram: 65, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "punch", "operators": [{ "frequency": "1×", "amplitude": 13, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "4×", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 12, "envelope": "steady" }] } },
                { name: "tenor sax", midiProgram: 66, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2×", "amplitude": 12, "envelope": "custom" }, { "frequency": "3×", "amplitude": 7, "envelope": "steady" }, { "frequency": "1×", "amplitude": 3, "envelope": "steady" }, { "frequency": "8×", "amplitude": 3, "envelope": "steady" }] } },
                { name: "baritone sax", midiProgram: 67, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "swell 2", "operators": [{ "frequency": "1×", "amplitude": 12, "envelope": "custom" }, { "frequency": "8×", "amplitude": 4, "envelope": "steady" }, { "frequency": "4×", "amplitude": 5, "envelope": "steady" }, { "frequency": "1×", "amplitude": 4, "envelope": "punch" }] } },
                { name: "sax synth", midiProgram: 64, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 15, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "shehnai", midiProgram: 111, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 3, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "oboe", midiProgram: 68, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1 2←(3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "tremolo5", "operators": [{ "frequency": "1×", "amplitude": 7, "envelope": "custom" }, { "frequency": "4×", "amplitude": 12, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "6×", "amplitude": 2, "envelope": "steady" }] } },
                { name: "english horn", midiProgram: 69, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2←(3 4)", "feedbackType": "2⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4×", "amplitude": 12, "envelope": "custom" }, { "frequency": "2×", "amplitude": 10, "envelope": "custom" }, { "frequency": "1×", "amplitude": 8, "envelope": "punch" }, { "frequency": "8×", "amplitude": 4, "envelope": "steady" }] } },
                { name: "bassoon", midiProgram: 70, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 707, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2×", "amplitude": 11, "envelope": "custom" }, { "frequency": "1×", "amplitude": 6, "envelope": "steady" }, { "frequency": "6×", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1×", "amplitude": 0, "envelope": "steady" }] } },
                { name: "clarinet", midiProgram: 71, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71, 71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0] } },
                { name: "harmonica", midiProgram: 22, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 778, "effects": ["note filter", "reverb"], "noteFilterType": true, "noteSimpleCut": 9, "noteSimplePeak": 2, "noteFilter": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "reverb": 0, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 9, "operators": [{ "frequency": "2×", "amplitude": 14, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 2, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }, { "target": "feedbackAmplitude", "envelope": "tremolo2", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
            ])
        },
        {
            name: "Flute Presets", presets: toNameMap([
                { name: "flute 1", midiProgram: 73, generalMidi: true, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 9656.85, "linearGain": 0.5 }], "eqFilterType": true, "eqSimpleCut": 9, "eqSimplePeak": 1, "envelopeSpeed": 12, "discreteEnvelope": false, "preset": 832, "eqSubFilters1": [], "effects": ["reverb"], "reverb": 0, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←(2 3 4)", "feedbackType": "4⟲", "feedbackAmplitude": 7, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 4, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 3, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 1, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "punch", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "feedbackAmplitude", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 7, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "recorder", midiProgram: 74, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 2", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 57, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "whistle", midiProgram: 78, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "delayed", "harmonics": [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "ocarina", midiProgram: 79, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 14, 57, 14, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "piccolo", midiProgram: 72, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1←3 2←4", "feedbackType": "4⟲", "feedbackAmplitude": 15, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "1×", "amplitude": 10, "envelope": "custom" }, { "frequency": "~2×", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1×", "amplitude": 5, "envelope": "punch" }] } },
                { name: "shakuhachi", midiProgram: 77, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1←(2 3←4)", "feedbackType": "3→4", "feedbackAmplitude": 15, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "2×", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1×", "amplitude": 4, "envelope": "twang 1" }, { "frequency": "20×", "amplitude": 15, "envelope": "steady" }] } },
                { name: "pan flute", midiProgram: 75, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 5.6569 }], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }], "reverb": 33, "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "spectrum": [100, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 71, 0, 0, 14, 0, 57, 0, 29, 14, 29, 14, 14, 29, 14, 29, 14, 14, 29, 14], "envelopes": [{ "target": "noteFilterFreq", "envelope": "twang 1", "index": 0 }, { "target": "noteVolume", "envelope": "punch" }] } },
                { name: "blown bottle", midiProgram: 76, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1×", "amplitude": 15, "envelope": "custom" }, { "frequency": "3×", "amplitude": 4, "envelope": "custom" }, { "frequency": "6×", "amplitude": 2, "envelope": "custom" }, { "frequency": "11×", "amplitude": 2, "envelope": "custom" }] } },
                { name: "calliope", midiProgram: 82, generalMidi: true, settings: { "type": "spectrum", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "steady", "spectrum": [100, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 57, 0, 43, 0, 29, 14, 14, 29, 14, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "chiffer", midiProgram: 83, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "punch", "spectrum": [86, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 71, 0, 0, 57, 0, 57, 0, 43, 14, 14, 43, 14, 29, 14, 29, 29, 29, 29, 14] } },
                { name: "breath noise", midiProgram: 121, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [], "effects": ["chord type", "note filter", "reverb"], "chord": "strum", "noteFilter": [{ "type": "high-pass", "cutoffHz": 840.9, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.3536 }], "reverb": 33, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "spectrum": [71, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 71, 0, 0, 29, 0, 100, 29, 14, 29, 100, 29, 100, 14, 14, 71, 0, 29, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }] } },
                { name: "flute 2", midiProgram: 73, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "seamless", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "delayed", "harmonics": [100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71, 71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0] } },
            ])
        },
        {
            name: "Pad Presets", presets: toNameMap([
                { name: "new age pad", midiProgram: 88, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "2×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 4 }, { "frequency": "6×", "amplitude": 3 }, { "frequency": "13×", "amplitude": 3 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "swell 3" }] } },
                { name: "warm pad", midiProgram: 89, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 7, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "1×", "amplitude": 6 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 3" }, { "target": "operatorAmplitude", "envelope": "swell 1", "index": 1 }] } },
                { name: "polysynth pad", midiProgram: 90, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["vibrato", "note filter", "chorus"], "vibrato": "delayed", "noteFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 1 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "sawtooth", "unison": "honky tonk", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "space voice pad", midiProgram: 91, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 2828.43, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 1414.21, "linearGain": 0.1768 }], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "1×", "amplitude": 10 }, { "frequency": "2×", "amplitude": 8 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "11×", "amplitude": 2 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "punch", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "swell 2" }] } },
                { name: "bowed glass pad", midiProgram: 92, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 10 }, { "frequency": "2×", "amplitude": 12 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 4 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 3", "index": 3 }] } },
                { name: "metallic pad", midiProgram: 93, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 13, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 9 }, { "frequency": "1×", "amplitude": 7 }, { "frequency": "11×", "amplitude": 7 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "swell 2", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "sweep pad", midiProgram: 95, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 4 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "wave": "sawtooth", "unison": "hum", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 3" }] } },
                { name: "atmosphere", midiProgram: 99, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 1 }], "effects": ["chorus", "reverb"], "chorus": 100, "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "strum", "algorithm": "1←(2 3 4)", "feedbackType": "3⟲ 4⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 10 }, { "frequency": "3×", "amplitude": 7 }, { "frequency": "1×", "amplitude": 7 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "swell 3", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 3 }] } },
                { name: "brightness", midiProgram: 100, generalMidi: true, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 2 }], "effects": ["chorus"], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "harmonics": [100, 86, 86, 86, 43, 57, 43, 71, 43, 43, 43, 57, 43, 43, 57, 71, 57, 43, 29, 43, 57, 57, 43, 29, 29, 29, 29, 14], "unison": "octave", "stringSustain": 86, "envelopes": [] } },
                { name: "goblins", midiProgram: 101, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 11.3137 }], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.5 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "simultaneous", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 10, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "4×", "amplitude": 5 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 2" }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 1 }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 2 }, { "target": "feedbackAmplitude", "envelope": "flare 3" }] } },
                { name: "sci-fi", midiProgram: 103, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 9513.66, "linearGain": 2.8284 }], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "(1 2)←3←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 8, "operators": [{ "frequency": "~1×", "amplitude": 13 }, { "frequency": "2×", "amplitude": 10 }, { "frequency": "5×", "amplitude": 5 }, { "frequency": "11×", "amplitude": 8 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "tremolo5", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "twang 3" }] } },
                { name: "flutter pad", midiProgram: 90, settings: { "type": "FM", "eqFilter": [], "effects": ["vibrato", "note filter", "chorus"], "vibrato": "delayed", "noteFilter": [{ "type": "low-pass", "cutoffHz": 4000, "linearGain": 4 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "algorithm": "(1 2)←(3 4)", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 9, "operators": [{ "frequency": "1×", "amplitude": 13 }, { "frequency": "5×", "amplitude": 7 }, { "frequency": "7×", "amplitude": 5 }, { "frequency": "~1×", "amplitude": 6 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "punch", "index": 3 }] } },
                { name: "feedback pad", midiProgram: 89, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 2378.41, "linearGain": 8 }], "effects": [], "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": 96, "chord": "custom interval", "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 8, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 15 }, { "frequency": "~1×", "amplitude": 15 }], "envelopes": [{ "target": "feedbackAmplitude", "envelope": "swell 2" }] } },
                { name: "supersaw pad", midiProgram: 93, settings: { "type": "supersaw", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.1768 }], "effects": ["reverb"], "reverb": 100, "fadeInSeconds": 0.0263, "fadeOutTicks": 24, "pulseWidth": 50, "dynamism": 100, "spread": 58, "shape": 0, "envelopes": [] } },
            ])
        },
        {
            name: "Drum Presets", presets: toNameMap([
                { name: "standard drumset", midiProgram: 116, isNoise: true, settings: { "type": "drumset", "effects": "reverb", "drums": [{ "filterEnvelope": "twang 1", "spectrum": [57, 71, 71, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 100, 71, 71, 57, 86, 57, 57, 57, 71, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 100, 57, 43, 43, 29, 57, 43, 29, 71, 43, 43, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 0, 71, 57, 43, 43, 43, 57, 57, 43, 29, 57, 43, 43, 43, 29, 43, 57, 43, 43, 43, 43, 43, 43, 29, 43, 43] }, { "filterEnvelope": "decay 2", "spectrum": [0, 14, 29, 43, 86, 71, 29, 43, 43, 43, 43, 29, 71, 29, 71, 29, 43, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 57, 57, 57] }, { "filterEnvelope": "decay 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43] }, { "filterEnvelope": "twang 3", "spectrum": [43, 43, 43, 71, 29, 29, 43, 43, 43, 29, 43, 43, 43, 29, 29, 43, 43, 29, 29, 29, 57, 14, 57, 43, 43, 57, 43, 43, 57, 57] }, { "filterEnvelope": "decay 3", "spectrum": [29, 43, 43, 43, 43, 29, 29, 43, 29, 29, 43, 29, 14, 29, 43, 29, 43, 29, 57, 29, 43, 57, 43, 71, 43, 71, 57, 57, 71, 71] }, { "filterEnvelope": "twang 3", "spectrum": [43, 29, 29, 43, 29, 29, 29, 57, 29, 29, 29, 57, 43, 43, 29, 29, 57, 43, 43, 43, 71, 43, 43, 71, 57, 71, 71, 71, 71, 71] }, { "filterEnvelope": "decay 3", "spectrum": [57, 57, 57, 43, 57, 57, 43, 43, 57, 43, 43, 43, 71, 57, 43, 57, 86, 71, 57, 86, 71, 57, 86, 100, 71, 86, 86, 86, 86, 86] }, { "filterEnvelope": "flare 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 71, 71, 86, 86, 100, 100, 100, 100, 100, 100, 100, 100, 86, 57, 29, 0] }, { "filterEnvelope": "decay 2", "spectrum": [14, 14, 14, 14, 29, 14, 14, 29, 14, 43, 14, 43, 57, 86, 57, 57, 100, 57, 43, 43, 57, 100, 57, 43, 29, 14, 0, 0, 0, 0] }] } },
                { name: "steel pan", midiProgram: 114, generalMidi: true, settings: { "type": "FM", "eqFilter": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.1768 }], "effects": ["note filter", "chorus", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "chorus": 67, "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 24, "chord": "simultaneous", "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "~1×", "amplitude": 14 }, { "frequency": "7×", "amplitude": 3 }, { "frequency": "3×", "amplitude": 5 }, { "frequency": "4×", "amplitude": 4 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "decay 2" }, { "target": "operatorAmplitude", "envelope": "flare 1", "index": 1 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 2 }, { "target": "operatorAmplitude", "envelope": "swell 2", "index": 3 }] } },
                { name: "steel pan synth", midiProgram: 114, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -3, "chord": "simultaneous", "algorithm": "1 2 3←4", "feedbackType": "1⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "~1×", "amplitude": 12 }, { "frequency": "2×", "amplitude": 15 }, { "frequency": "4×", "amplitude": 14 }, { "frequency": "~1×", "amplitude": 3 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }, { "target": "operatorAmplitude", "envelope": "note size", "index": 0 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 1 }, { "target": "operatorAmplitude", "envelope": "flare 1", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 2", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "flare 1" }] } },
                { name: "timpani", midiProgram: 47, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "peak", "cutoffHz": 6727.17, "linearGain": 5.6569 }], "effects": ["pitch shift", "note filter", "reverb"], "pitchShiftSemitones": 15, "noteFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.5 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "spectrum": [100, 0, 0, 0, 86, 0, 0, 71, 0, 14, 43, 14, 43, 43, 0, 29, 43, 29, 29, 29, 43, 29, 43, 29, 43, 43, 43, 43, 43, 43], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 1" }, { "target": "pitchShift", "envelope": "twang 1" }] } },
                { name: "dark strike", midiProgram: 47, settings: { "type": "spectrum", "eqFilter": [], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.7071 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "spectrum": [0, 0, 14, 14, 14, 29, 29, 43, 43, 86, 43, 43, 43, 29, 86, 29, 29, 29, 86, 29, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
                { name: "woodblock", midiProgram: 115, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [0, 14, 29, 43, 43, 57, 86, 86, 71, 57, 57, 43, 43, 57, 86, 86, 43, 43, 71, 57, 57, 57, 57, 57, 86, 86, 71, 71, 71, 71] } },
                { name: "taiko drum", midiProgram: 116, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [71, 100, 100, 43, 43, 71, 71, 43, 43, 43, 43, 43, 43, 57, 29, 57, 43, 57, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43] } },
                { name: "melodic drum", midiProgram: 117, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "twang 1", "spectrum": [100, 71, 71, 57, 57, 43, 43, 71, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "drum synth", midiProgram: 118, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "decay 1", "spectrum": [100, 86, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "tom-tom", midiProgram: 116, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [100, 29, 14, 0, 0, 86, 14, 43, 29, 86, 29, 14, 29, 57, 43, 43, 43, 43, 57, 43, 43, 43, 29, 57, 43, 43, 43, 43, 43, 43] } },
                { name: "metal pipe", midiProgram: 117, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 2", "spectrum": [29, 43, 86, 43, 43, 43, 43, 43, 100, 29, 14, 14, 100, 14, 14, 0, 0, 0, 0, 0, 14, 29, 29, 14, 0, 0, 14, 29, 0, 0] } },
                { name: "synth kick", midiProgram: 47, settings: { "type": "FM", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -6, "chord": "simultaneous", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "8×", "amplitude": 15 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "operatorFrequency", "envelope": "twang 1", "index": 0 }, { "target": "noteVolume", "envelope": "twang 2" }] } },
            ])
        },
        {
            name: "Novelty Presets", presets: toNameMap([
                { name: "guitar fret noise", midiProgram: 120, generalMidi: true, settings: { "type": "spectrum", "eqFilter": [{ "type": "high-pass", "cutoffHz": 1000, "linearGain": 0.1768 }], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 5.6569 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "simultaneous", "spectrum": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 29, 14, 0, 0, 43, 0, 43, 0, 71, 43, 0, 57, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 1" }, { "target": "noteVolume", "envelope": "twang 2" }] } },
                { name: "fifth saw lead", midiProgram: 86, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 1.4142 }], "chorus": 67, "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": 48, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 3" }] } },
                { name: "fifth swell", midiProgram: 86, midiSubharmonicOctaves: 1, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2000, "linearGain": 2 }], "chorus": 100, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell 3" }] } },
                { name: "soundtrack", midiProgram: 97, generalMidi: true, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter", "chorus"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "chorus": 67, "transition": "normal", "fadeInSeconds": 0.0413, "fadeOutTicks": 72, "chord": "simultaneous", "wave": "sawtooth", "unison": "fifth", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 3" }] } },
                { name: "reverse cymbal", midiProgram: 119, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "none", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [29, 57, 57, 29, 57, 57, 29, 29, 43, 29, 29, 43, 29, 29, 57, 57, 14, 57, 14, 57, 71, 71, 57, 86, 57, 100, 86, 86, 86, 86] } },
                { name: "seashore", midiProgram: 122, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "transition": "soft fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 43, 43, 43, 57, 57, 57, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57] } },
                { name: "bird tweet", midiProgram: 123, generalMidi: true, settings: { "type": "harmonics", "eqFilter": [], "effects": ["chord type", "vibrato", "reverb"], "chord": "strum", "vibrato": "heavy", "reverb": 67, "fadeInSeconds": 0.0575, "fadeOutTicks": -6, "harmonics": [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "hum", "envelopes": [{ "target": "noteVolume", "envelope": "decay 1" }] } },
                { name: "telephone ring", midiProgram: 124, generalMidi: true, settings: { "type": "FM", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 1 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "arpeggio", "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "2×", "amplitude": 12 }, { "frequency": "1×", "amplitude": 4 }, { "frequency": "20×", "amplitude": 1 }, { "frequency": "1×", "amplitude": 0 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "tremolo4" }, { "target": "operatorAmplitude", "envelope": "tremolo1", "index": 1 }] } },
                { name: "helicopter", midiProgram: 125, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "seamless", "chord": "arpeggio", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "tremolo4", "spectrum": [14, 43, 43, 57, 57, 57, 71, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 57, 57] } },
                { name: "applause", midiProgram: 126, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 29, 43, 43, 57, 71, 71, 86, 86, 86, 71, 71, 57, 57, 57, 71, 86, 86, 86, 86, 86, 71, 71, 57, 57, 57, 57] } },
                { name: "gunshot", midiProgram: 127, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1414, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [14, 29, 43, 43, 57, 57, 57, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43] } },
                { name: "scoot", midiProgram: 92, settings: { "type": "chip", "eqFilter": [], "effects": ["note filter"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 707.11, "linearGain": 4 }], "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": -3, "chord": "simultaneous", "wave": "double saw", "unison": "shimmer", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "flare 1" }] } },
                { name: "buzz saw", midiProgram: 30, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.5 }], "effects": [], "transition": "normal", "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "chord": "custom interval", "algorithm": "1←2←3←4", "feedbackType": "1⟲", "feedbackAmplitude": 4, "operators": [{ "frequency": "5×", "amplitude": 13 }, { "frequency": "1×", "amplitude": 10 }, { "frequency": "~1×", "amplitude": 6 }, { "frequency": "11×", "amplitude": 12 }], "envelopes": [] } },
                { name: "mosquito", midiProgram: 93, settings: { "type": "PWM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 2 }], "effects": ["vibrato"], "vibrato": "shaky", "transition": "normal", "fadeInSeconds": 0.0575, "fadeOutTicks": -6, "chord": "simultaneous", "pulseWidth": 4.41942, "envelopes": [{ "target": "pulseWidth", "envelope": "tremolo6" }] } },
                { name: "breathing", midiProgram: 126, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 2", "spectrum": [14, 14, 14, 29, 29, 29, 29, 29, 43, 29, 29, 43, 43, 43, 29, 29, 71, 43, 86, 86, 57, 100, 86, 86, 86, 86, 71, 86, 71, 57] } },
                { name: "klaxon synth", midiProgram: 125, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "noise", "effects": "reverb", "transition": "slide", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 86, "filterEnvelope": "steady", "wave": "buzz" } },
                { name: "theremin", midiProgram: 40, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.7071 }], "effects": ["vibrato", "reverb"], "vibrato": "heavy", "reverb": 33, "transition": "slide in pattern", "fadeInSeconds": 0.0263, "fadeOutTicks": -6, "chord": "simultaneous", "harmonics": [100, 71, 57, 43, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "none", "envelopes": [] } },
                { name: "sonar ping", midiProgram: 121, settings: { "type": "spectrum", "eqFilter": [], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.5 }], "reverb": 33, "transition": "normal", "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "chord": "simultaneous", "spectrum": [100, 43, 29, 29, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang 2" }] } },
            ])
        },
        {
            name: "UltraBox Presets", presets: toNameMap([
                { name: "nes white", midiProgram: 116, generalMidi: true, isNoise: true, settings: { "type": "noise", "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 8, "eqSimplePeak": 0, "eqSubFilters1": [], "effects": [], "fadeInSeconds": 0, "fadeOutTicks": 0, "wave": "1-bit white", "envelopes": [] } },
                { name: "nes ping", midiProgram: 116, generalMidi: true, isNoise: true, settings: { "type": "noise", "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 8, "eqSimplePeak": 0, "eqSubFilters1": [], "effects": [], "fadeInSeconds": 0, "fadeOutTicks": 0, "wave": "1-bit metallic", "envelopes": [] } },
                { name: "distorted pulse vocal", generalMidi: false, settings: { "type": "chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }], "effects": ["transition type", "pitch shift", "vibrato", "note filter", "bitcrusher", "echo", "reverb"], "transition": "normal", "clicklessTransition": false, "pitchShiftSemitones": 0, "vibrato": "delayed", "vibratoDepth": 0.3, "vibratoDelay": 18.5, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "high-pass", "cutoffHz": 840.9, "linearGain": 11.3137 }, { "type": "low-pass", "cutoffHz": 297.3, "linearGain": 8 }, { "type": "peak", "cutoffHz": 500, "linearGain": 11.3137 }, { "type": "high-pass", "cutoffHz": 62.5, "linearGain": 1.4142 }, { "type": "peak", "cutoffHz": 176.78, "linearGain": 11.3137 }, { "type": "high-pass", "cutoffHz": 250, "linearGain": 11.3137 }], "noteSubFilters0": [{ "type": "high-pass", "cutoffHz": 840.9, "linearGain": 11.3137 }, { "type": "low-pass", "cutoffHz": 297.3, "linearGain": 8 }, { "type": "peak", "cutoffHz": 500, "linearGain": 11.3137 }, { "type": "high-pass", "cutoffHz": 62.5, "linearGain": 1.4142 }, { "type": "peak", "cutoffHz": 176.78, "linearGain": 11.3137 }, { "type": "high-pass", "cutoffHz": 250, "linearGain": 11.3137 }], "bitcrusherOctave": 6.5, "bitcrusherQuantization": 71, "echoSustain": 14, "echoDelayBeats": 0.167, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -3, "wave": "1/8 pulse", "unison": "none", "envelopes": [] } },
                { name: "dubstep bwah", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.7071 }], "eqFilterType": true, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters1": [], "effects": ["panning", "transition type", "chord type"], "transition": "interrupt", "clicklessTransition": false, "chord": "custom interval", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "pan": 0, "panDelay": 10, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 10, "operators": [{ "frequency": "2×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteVolume", "envelope": "note size" }, { "target": "operatorAmplitude", "envelope": "swell 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "punch", "index": 2 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 3 }] } },
                { name: "FM cool bass", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 1 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 0.7071 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 1 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 0.7071 }], "effects": ["transition type", "note filter", "reverb"], "transition": "interrupt", "clicklessTransition": false, "noteFilterType": true, "noteSimpleCut": 9, "noteSimplePeak": 2, "noteFilter": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1←(2 3←4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "2×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 7, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "13×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "punch" }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang 3", "index": 2 }, { "target": "operatorAmplitude", "envelope": "twang 2", "index": 3 }] } },
                { name: "FM funky bass", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.1768 }], "eqFilterType": true, "eqSimpleCut": 5, "eqSimplePeak": 0, "eqSubFilters1": [], "effects": ["transition type", "reverb"], "transition": "normal", "clicklessTransition": false, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -3, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteVolume", "envelope": "punch" }, { "target": "noteVolume", "envelope": "note size" }] } },
                { name: "talking bass", generalMidi: false, settings: { "type": "FM", "eqFilter": [], "effects": ["chord type"], "chord": "custom interval", "fadeInSeconds": 0, "fadeOutTicks": -3, "algorithm": "1←(2 3)←4", "feedbackType": "1⟲", "feedbackAmplitude": 15, "operators": [{ "frequency": "1×", "amplitude": 15 }, { "frequency": "2×", "amplitude": 8 }, { "frequency": "2×", "amplitude": 5 }, { "frequency": "1×", "amplitude": 12 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "note size", "index": 2 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "note size" }] } },
                { name: "synth marimba", generalMidi: false, settings: { "type": "Picked String", "eqFilter": [{ "type": "high-pass", "cutoffHz": 176.78, "linearGain": 1 }, { "type": "peak", "cutoffHz": 4000, "linearGain": 0.5 }], "effects": ["note filter", "echo"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1.4142 }], "echoSustain": 71, "echoDelayBeats": 0.5, "fadeInSeconds": 0, "fadeOutTicks": -1, "harmonics": [86, 100, 29, 29, 0, 0, 0, 100, 0, 0, 0, 86, 29, 0, 14, 100, 0, 0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 86], "unison": "fifth", "stringSustain": 7, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "punch" }] } },
                { name: "italian accordian", generalMidi: false, settings: { "type": "custom chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 6000, "linearGain": 0.5 }], "eqFilterType": true, "eqSimpleCut": 8, "eqSimplePeak": 1, "eqSubFilters1": [], "effects": ["chorus", "reverb"], "chorus": 71, "reverb": 45, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "wave": "square", "unison": "honky tonk", "customChipWave": { "0": -24, "1": -24, "2": -24, "3": -24, "4": -24, "5": -24, "6": -24, "7": -24, "8": -24, "9": -24, "10": -24, "11": -24, "12": -24, "13": -24, "14": -24, "15": -24, "16": 24, "17": 24, "18": 24, "19": 24, "20": 24, "21": 24, "22": 24, "23": 24, "24": -24, "25": -24, "26": -24, "27": -24, "28": -24, "29": -24, "30": -24, "31": -24, "32": -24, "33": -24, "34": -24, "35": -24, "36": -24, "37": -24, "38": -24, "39": -24, "40": 24, "41": 24, "42": 24, "43": 24, "44": 24, "45": 24, "46": 24, "47": 24, "48": -24, "49": -24, "50": -24, "51": -24, "52": -24, "53": -24, "54": -24, "55": -24, "56": -24, "57": -24, "58": -24, "59": -24, "60": -24, "61": -24, "62": -24, "63": -24 }, "customChipWaveIntegral": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0, "46": 0, "47": 0, "48": 0, "49": 0, "50": 0, "51": 0, "52": 0, "53": 0, "54": 0, "55": 0, "56": 0, "57": 0, "58": 0, "59": 0, "60": 0, "61": 0, "62": 0, "63": 0, "64": 0 }, "envelopes": [] } },
                { name: "chip supersaw", generalMidi: false, settings: { "type": "custom chip", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.7071 }], "eqFilterType": true, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters1": [], "effects": ["transition type", "vibrato", "chorus", "reverb"], "transition": "interrupt", "clicklessTransition": false, "vibrato": "delayed", "vibratoDepth": 0.3, "vibratoDelay": 18.5, "vibratoSpeed": 10, "vibratoType": 0, "chorus": 29, "reverb": 29, "fadeInSeconds": 0, "fadeOutTicks": -1, "wave": "square", "unison": "dissonant", "customChipWave": { "0": 22, "1": 22, "2": 16, "3": 6, "4": 0, "5": -3, "6": -8, "7": -10, "8": -13, "9": -16, "10": -19, "11": -19, "12": -20, "13": -22, "14": -22, "15": -24, "16": -24, "17": -24, "18": -24, "19": -24, "20": -24, "21": -24, "22": -24, "23": -24, "24": -24, "25": -24, "26": -24, "27": -24, "28": -24, "29": -24, "30": -24, "31": 24, "32": 24, "33": 16, "34": 9, "35": 6, "36": 4, "37": 2, "38": 0, "39": -1, "40": -3, "41": -4, "42": -4, "43": -6, "44": -6, "45": -6, "46": -6, "47": -5, "48": -5, "49": -4, "50": -2, "51": -2, "52": 1, "53": 4, "54": 6, "55": 8, "56": 10, "57": 12, "58": 14, "59": 16, "60": 18, "61": 19, "62": 22, "63": 24 }, "customChipWaveIntegral": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0, "46": 0, "47": 0, "48": 0, "49": 0, "50": 0, "51": 0, "52": 0, "53": 0, "54": 0, "55": 0, "56": 0, "57": 0, "58": 0, "59": 0, "60": 0, "61": 0, "62": 0, "63": 0, "64": 0 }, "envelopes": [] } },
                { name: "fm supersaw", generalMidi: false, settings: { "type": "FM6op", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.7071 }], "effects": ["transition type", "pitch shift", "note filter", "chorus", "reverb"], "transition": "continue", "clicklessTransition": false, "pitchShiftSemitones": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [], "noteSubFilters0": [], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 1 }], "chorus": 71, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1 2 3 4 5 6", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 13, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 15, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 10, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "3×", "amplitude": 7, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 9, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "8×", "amplitude": 6, "waveform": "sawtooth", "pulseWidth": 5 }], "envelopes": [] } },
                { name: "wind", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 250.03, "linearGain": 11.3137 }], "eqFilterType": true, "eqSimpleCut": 0, "eqSimplePeak": 7, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["transition type", "reverb"], "transition": "continue", "clicklessTransition": false, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1←(2 3 4)", "feedbackType": "1→3 2→4", "feedbackAmplitude": 15, "operators": [{ "frequency": "16×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "16×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "16×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "16×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [] } },
                { name: "mrow", generalMidi: false, settings: { "type": "FM", "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "eqSubFilters0": [], "effects": ["chord type", "reverb"], "chord": "custom interval", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "reverb": 35, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←3 2←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "4×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "flare 1", "index": 0 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 1 }, { "target": "operatorAmplitude", "envelope": "note size", "index": 2 }, { "target": "operatorAmplitude", "envelope": "flare 3", "index": 3 }, { "target": "feedbackAmplitude", "envelope": "flare 1" }] } },
                { name: "vocal why", generalMidi: false, settings: { "type": "harmonics", "eqFilter": [], "effects": ["note filter", "reverb"], "noteFilter": [{ "type": "low-pass", "cutoffHz": 840.9, "linearGain": 11.3137 }], "reverb": 0, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "harmonics": [100, 86, 29, 29, 14, 14, 0, 14, 14, 43, 71, 100, 100, 86, 71, 71, 57, 57, 43, 43, 43, 43, 43, 0, 0, 0, 0, 0], "unison": "octave", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }] } },
            ])
        },
        {
            name: "Slarmoo's Box Presets", presets: toNameMap([
                { name: "radio fm", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 1189.21, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 74.33, "linearGain": 0.3536 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 1189.21, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 74.33, "linearGain": 0.3536 }], "effects": ["detune", "vibrato", "bitcrusher", "reverb"], "detuneCents": 0, "vibrato": "none", "vibratoDepth": 0, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "bitcrusherOctave": 6.5, "bitcrusherQuantization": 43, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": 6, "algorithm": "1 2 3 4", "feedbackType": "1⟲ 2⟲", "feedbackAmplitude": 4, "operators": [{ "frequency": "1×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "0.12×", "amplitude": 7, "waveform": "trapezoid", "pulseWidth": 5 }, { "frequency": "0.5×", "amplitude": 10, "waveform": "triangle", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 5, "waveform": "triangle", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "anguished underworld", generalMidi: false, settings: { "type": "FM6op", "eqFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }], "effects": ["note filter", "distortion", "bitcrusher", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 2828.43, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 1681.79, "linearGain": 0.5 }], "distortion": 43, "aliases": false, "bitcrusherOctave": 4.5, "bitcrusherQuantization": 43, "reverb": 0, "fadeInSeconds": 0.075, "fadeOutTicks": 6, "algorithm": "1 2←4 3←(5 6)", "feedbackType": "1→5 2→6 3→4", "feedbackAmplitude": 4, "operators": [{ "frequency": "0.25×", "amplitude": 14, "waveform": "triangle", "pulseWidth": 5 }, { "frequency": "0.5×", "amplitude": 13, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 12, "waveform": "trapezoid", "pulseWidth": 5 }, { "frequency": "8×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "0.75×", "amplitude": 3, "waveform": "ramp", "pulseWidth": 5 }], "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "punch" }, { "target": "operatorAmplitude", "envelope": "decay -1", "index": 5 }, { "target": "feedbackAmplitude", "envelope": "wibble 3" }], "isDrum": false } },
                { name: "faint sorrow", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4240.89, "linearGain": 2 }], "eqFilterType": true, "eqSimpleCut": 8, "eqSimplePeak": 4, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["detune", "vibrato", "echo", "reverb"], "detuneCents": 22, "vibrato": "light", "vibratoDepth": 0.15, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "echoSustain": 100, "echoDelayBeats": 0.667, "reverb": 87, "fadeInSeconds": 0.075, "fadeOutTicks": 48, "algorithm": "1 2 3 4", "feedbackType": "1⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "bright sorrow fm", generalMidi: false, settings: { "type": "FM", "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [], "effects": ["chord type", "note filter", "echo", "reverb"], "chord": "strum", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2000, "linearGain": 2.8284 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 2000, "linearGain": 2.8284 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 1414.21, "linearGain": 1.4142 }], "echoSustain": 71, "echoDelayBeats": 1.333, "reverb": 61, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲", "feedbackAmplitude": 2, "operators": [{ "frequency": "1×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "5×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "5×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 7, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "wet sorrow fm", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.7071 }], "eqFilterType": true, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["vibrato", "reverb"], "vibrato": "light", "vibratoDepth": 0.15, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "reverb": 23, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 4, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 3, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 2, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "decay 3", "index": 2 }], "isDrum": false } },
                { name: "scream fm", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 250, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.7071 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 250, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.7071 }], "effects": ["detune", "note filter", "distortion", "reverb"], "detuneCents": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "high-pass", "cutoffHz": 1681.79, "linearGain": 0.125 }, { "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 11.3137 }], "noteSubFilters0": [{ "type": "high-pass", "cutoffHz": 1681.79, "linearGain": 0.125 }, { "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 11.3137 }], "distortion": 0, "aliases": false, "reverb": 87, "fadeInSeconds": 0.135, "fadeOutTicks": -3, "algorithm": "(1 2 3)←4", "feedbackType": "1⟲ 2⟲ 3⟲ 4⟲", "feedbackAmplitude": 11, "operators": [{ "frequency": "4×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 3, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "7×", "amplitude": 5, "waveform": "triangle", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "detune", "envelope": "swell 1" }, { "target": "feedbackAmplitude", "envelope": "tremolo4" }], "isDrum": false } },
                { name: "anguished radio fm pad", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 9513.66, "linearGain": 4 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 62.5, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 9513.66, "linearGain": 4 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.0884 }], "eqSubFilters4": [], "effects": ["detune", "note filter", "bitcrusher", "chorus", "echo", "reverb"], "detuneCents": -16, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [], "noteSubFilters0": [], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 11.3137 }], "noteSubFilters2": [{ "type": "low-pass", "cutoffHz": 105.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 11.3137 }], "noteSubFilters4": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 11.3137 }], "bitcrusherOctave": 5.5, "bitcrusherQuantization": 43, "chorus": 29, "echoSustain": 43, "echoDelayBeats": 1, "reverb": 58, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "1←3 2←4", "feedbackType": "1→3", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 7, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "juicy kick", generalMidi: false, settings: { "type": "FM", "eqFilter": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 11.3137 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 11.3137 }, { "type": "low-pass", "cutoffHz": 5656.85, "linearGain": 0.3536 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 594.6, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }], "effects": [], "fadeInSeconds": 0, "fadeOutTicks": -6, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "20×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorFrequency", "envelope": "twang 1", "index": 0 }, { "target": "noteVolume", "envelope": "twang 2" }], "isDrum": false } },
                { name: "good vibes supersaw", generalMidi: false, settings: { "type": "supersaw", "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 6, "discreteEnvelope": false, "pitchEnvelopeStart": 37, "pitchEnvelopeEnd": 96, "pitchEnvelopeInverse": true, "eqSubFilters0": [], "effects": ["transition type", "detune", "chorus", "reverb"], "transition": "interrupt", "clicklessTransition": false, "detuneCents": 30, "chorus": 14, "reverb": 23, "fadeInSeconds": 0.0263, "fadeOutTicks": 12, "pulseWidth": 26, "decimalOffset": 0, "dynamism": 33, "spread": 33, "shape": 17, "envelopes": [{ "target": "supersawShape", "envelope": "pitch" }, { "target": "detune", "envelope": "tremolo2" }], "isDrum": false } },
                { name: "ethereal", generalMidi: false, isNoise: false, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "peak", "cutoffHz": 4000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 1.4142 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 4, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "peak", "cutoffHz": 4000, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 1.4142 }], "eqSubFilters1": [], "effects": ["transition type", "chord type", "pitch shift", "detune", "vibrato", "note filter", "bitcrusher", "chorus", "reverb"], "transition": "continue", "clicklessTransition": false, "chord": "simultaneous", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "pitchShiftSemitones": 12, "detuneCents": 36, "vibrato": "custom", "vibratoDepth": 0.12, "vibratoDelay": 36, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.7071 }], "noteSubFilters0": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2000, "linearGain": 0.0884 }, { "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.7071 }], "bitcrusherOctave": 4.5, "bitcrusherQuantization": 43, "chorus": 71, "reverb": 100, "fadeInSeconds": 0, "fadeOutTicks": -1, "spectrum": [43, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 57, 0, 0, 57, 0, 43, 0, 43, 0, 0, 29, 0, 29, 0, 14, 14, 14, 0, 0], "unison": "none", "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "pitchEnvelopeStart1": 0, "pitchEnvelopeEnd1": 96, "envelopeInverse1": false, "pitchEnvelopeStart2": 0, "pitchEnvelopeEnd2": 96, "envelopeInverse2": false, "envelopes": [{ "target": "noteVolume", "envelope": "note size" }, { "target": "detune", "envelope": "tremolo3" }, { "target": "bitcrusherQuantization", "envelope": "note size" }], "isDrum": false } },
                { name: "walrus wuh", generalMidi: false, settings: { "type": "supersaw", "eqFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 2 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 74.33, "linearGain": 2.8284 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "pitchEnvelopeInverse": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 2 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 74.33, "linearGain": 2.8284 }], "effects": ["note filter", "bitcrusher", "chorus", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 0.125 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 0.125 }], "bitcrusherOctave": 4, "bitcrusherQuantization": 71, "chorus": 86, "reverb": 32, "fadeInSeconds": 0.0263, "fadeOutTicks": 48, "pulseWidth": 50, "decimalOffset": 0, "dynamism": 100, "spread": 50, "shape": 0, "envelopes": [{ "target": "noteVolume", "envelope": "punch" }, { "target": "bitcrusherQuantization", "envelope": "decay 3" }], "isDrum": false } },
                { name: "saturnic", generalMidi: false, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 4240.89, "linearGain": 2 }], "eqFilterType": true, "eqSimpleCut": 8, "eqSimplePeak": 4, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["vibrato", "chorus", "echo", "reverb"], "vibrato": "light", "vibratoDepth": 0.15, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "chorus": 100, "echoSustain": 71, "echoDelayBeats": 0.5, "reverb": 45, "fadeInSeconds": 0.0125, "fadeOutTicks": 72, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 15, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "glassy harmonics", generalMidi: false, settings: { "type": "harmonics", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 11.3137 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 0.5 }], "effects": ["detune", "note filter", "chorus", "reverb"], "detuneCents": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [], "noteSubFilters0": [], "chorus": 14, "reverb": 29, "fadeInSeconds": 0, "fadeOutTicks": -3, "harmonics": [100, 0, 43, 29, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 14, 29, 14, 0, 14, 0, 0, 0, 0, 100, 0, 0, 14, 0], "unison": "none", "envelopes": [], "isDrum": false } },
                { name: "plucked", generalMidi: false, settings: { "type": "Picked String", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.0884 }], "effects": ["transition type", "echo", "reverb"], "transition": "interrupt", "clicklessTransition": false, "echoSustain": 100, "echoDelayBeats": 1.333, "reverb": 26, "fadeInSeconds": 0, "fadeOutTicks": 24, "harmonics": [100, 86, 57, 0, 0, 57, 57, 57, 86, 57, 57, 43, 43, 43, 29, 29, 14, 14, 29, 14, 14, 14, 29, 100, 57, 43, 14, 14], "unison": "none", "stringSustain": 14, "envelopes": [], "isDrum": false } },
                { name: "spectrum wind", generalMidi: false, isNoise: true, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 19027.31, "linearGain": 0.7071 }], "eqFilterType": true, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["note filter", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 1.4142 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 1.4142 }], "reverb": 87, "fadeInSeconds": 0, "fadeOutTicks": 12, "spectrum": [29, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 14, 57, 14, 0, 57, 57, 0, 0, 57, 0, 71, 14, 29, 100, 71, 0, 100, 14, 86], "unison": "none", "envelopes": [], "isDrum": true } },
                { name: "hi-hat", generalMidi: false, isNoise: true, settings: { "type": "noise", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.1768 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.1768 }], "eqSubFilters1": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.1768 }], "eqSubFilters2": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.1768 }], "eqSubFilters3": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 4756.83, "linearGain": 0.1768 }], "effects": [], "fadeInSeconds": 0, "fadeOutTicks": -3, "wave": "white", "unison": "none", "envelopes": [], "isDrum": true } },
                { name: "jungle bass", generalMidi: false, isNoise: false, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 148.65, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 148.65, "linearGain": 0.0884 }], "effects": ["vibrato", "note filter", "chorus", "reverb"], "vibrato": "none", "vibratoDepth": 0, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 297.3, "linearGain": 1 }, { "type": "peak", "cutoffHz": 74.33, "linearGain": 0.0884 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 297.3, "linearGain": 1 }, { "type": "peak", "cutoffHz": 74.33, "linearGain": 0.0884 }], "chorus": 14, "reverb": 3, "fadeInSeconds": 0, "fadeOutTicks": 48, "algorithm": "1←3 2←4", "feedbackType": "1↔2 3↔4", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 13, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "8×", "amplitude": 11, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "pitchEnvelopeStart1": 0, "pitchEnvelopeEnd1": 96, "envelopeInverse1": false, "pitchEnvelopeStart2": 12, "pitchEnvelopeEnd2": 28, "envelopeInverse2": false, "envelopes": [{ "target": "operatorFrequency", "envelope": "swell 3", "index": 0 }, { "target": "operatorAmplitude", "envelope": "swell 3", "index": 1 }, { "target": "noteFilterFreq", "envelope": "pitch", "index": 0 }], "isDrum": false } },
                { name: "beach tide", generalMidi: false, isNoise: false, settings: { "type": "harmonics", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.1768 }, { "type": "peak", "cutoffHz": 8000, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.1768 }, { "type": "peak", "cutoffHz": 8000, "linearGain": 0.0884 }], "effects": ["transition type", "chord type", "note filter", "chorus", "reverb"], "transition": "continue", "clicklessTransition": false, "chord": "simultaneous", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "high-pass", "cutoffHz": 420.45, "linearGain": 1 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.1768 }], "noteSubFilters0": [{ "type": "high-pass", "cutoffHz": 420.45, "linearGain": 1 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.1768 }], "chorus": 14, "reverb": 32, "fadeInSeconds": 0.0938, "fadeOutTicks": 72, "harmonics": [86, 86, 71, 57, 57, 43, 43, 43, 29, 29, 14, 14, 14, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "unison": "none", "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "pitch" }], "isDrum": false } },
                { name: "starlight", generalMidi: false, isNoise: false, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.0884 }], "effects": ["transition type", "vibrato", "bitcrusher", "echo", "reverb"], "transition": "continue", "clicklessTransition": false, "vibrato": "light", "vibratoDepth": 0.15, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "bitcrusherOctave": 5.5, "bitcrusherQuantization": 29, "echoSustain": 29, "echoDelayBeats": 1, "reverb": 13, "fadeInSeconds": 0, "fadeOutTicks": 24, "algorithm": "1←(2 3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 6, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "distant monument", generalMidi: false, isNoise: false, settings: { "type": "chip", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 500, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 210.22, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 5.6569 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 1 }, { "type": "peak", "cutoffHz": 11313.71, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 500, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 210.22, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 5.6569 }], "effects": ["transition type", "chord type", "detune", "bitcrusher", "chorus", "echo", "reverb"], "transition": "normal", "clicklessTransition": false, "chord": "strum", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "detuneCents": 24, "bitcrusherOctave": 2.5, "bitcrusherQuantization": 14, "chorus": 86, "echoSustain": 71, "echoDelayBeats": 1, "reverb": 35, "fadeInSeconds": 0.0413, "fadeOutTicks": 12, "wave": "modbox pnryshk a (u5)", "unison": "detune", "isUsingAdvancedLoopControls": false, "chipWaveLoopStart": 0, "chipWaveLoopEnd": 11, "chipWaveLoopMode": 0, "chipWavePlayBackwards": false, "chipWaveStartOffset": 0, "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "pitchEnvelopeStart1": 0, "pitchEnvelopeEnd1": 96, "envelopeInverse1": false, "envelopes": [{ "target": "noteVolume", "envelope": "punch" }, { "target": "noteVolume", "envelope": "twang 1" }], "isDrum": false } },
                { name: "mercurial", generalMidi: false, isNoise: false, settings: { "type": "FM6op", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 88.39, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.1768 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 88.39, "linearGain": 2.8284 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.1768 }], "eqSubFilters1": [], "effects": ["distortion", "chorus"], "distortion": 43, "aliases": false, "chorus": 43, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "Custom", "feedbackType": "1⟲", "feedbackAmplitude": 8, "customAlgorithm": { "mods": [[3], [5], [4], [], [6], []], "carrierCount": 2 }, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "0.5×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "~2×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 9, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 2, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteVolume", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorFrequency", "envelope": "linear", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "distortion", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 20, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "air hiss", generalMidi: false, isNoise: true, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.25 }], "eqFilterType": true, "eqSimpleCut": 7, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["note filter", "distortion", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 2828.43, "linearGain": 0.3536 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 2828.43, "linearGain": 0.3536 }], "distortion": 71, "aliases": false, "reverb": 6, "fadeInSeconds": 0, "fadeOutTicks": -24, "spectrum": [57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 43, 57, 71, 86, 100, 100, 100, 100, 86, 71, 71, 43], "unison": "none", "envelopes": [], "isDrum": true } },
                { name: "spectral phaser", generalMidi: false, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 74.33, "linearGain": 0.25 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 10, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["note filter", "distortion", "bitcrusher", "chorus", "echo", "reverb"], "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "peak", "cutoffHz": 9513.66, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2828.43, "linearGain": 4 }, { "type": "peak", "cutoffHz": 1414.21, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 4 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.1768 }, { "type": "peak", "cutoffHz": 148.65, "linearGain": 4 }, { "type": "peak", "cutoffHz": 88.39, "linearGain": 0.1768 }], "noteSubFilters0": [{ "type": "peak", "cutoffHz": 9513.66, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 2828.43, "linearGain": 4 }, { "type": "peak", "cutoffHz": 1414.21, "linearGain": 0.125 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 4 }, { "type": "peak", "cutoffHz": 353.55, "linearGain": 0.1768 }, { "type": "peak", "cutoffHz": 148.65, "linearGain": 4 }, { "type": "peak", "cutoffHz": 88.39, "linearGain": 0.1768 }], "distortion": 14, "aliases": false, "bitcrusherOctave": 6, "bitcrusherQuantization": 14, "chorus": 100, "echoSustain": 86, "echoDelayBeats": 1, "reverb": 32, "fadeInSeconds": 0, "fadeOutTicks": 48, "spectrum": [86, 0, 0, 0, 57, 0, 0, 71, 0, 0, 0, 86, 0, 0, 57, 0, 43, 0, 43, 0, 0, 43, 0, 29, 0, 29, 14, 14, 29, 14], "unison": "piano", "envelopes": [{ "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.07, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 0 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.06, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 1 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.05, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.04, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.09, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 4 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.08, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 5 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 6 }, { "target": "noteFilterFreq", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0.03, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 7 }, { "target": "distortion", "envelope": "none", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 0.3 }], "isDrum": false } },
                { name: "shaker", generalMidi: false, isNoise: true, settings: { "type": "noise", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 4000, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 0.0884 }, { "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 8 }, { "type": "peak", "cutoffHz": 2378.41, "linearGain": 0.25 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 6, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 4000, "linearGain": 5.6569 }, { "type": "peak", "cutoffHz": 4756.83, "linearGain": 0.0884 }, { "type": "low-pass", "cutoffHz": 11313.71, "linearGain": 8 }, { "type": "peak", "cutoffHz": 2378.41, "linearGain": 0.25 }], "effects": ["transition type", "detune", "distortion", "bitcrusher", "chorus", "echo", "reverb"], "transition": "interrupt", "clicklessTransition": false, "detuneCents": 30, "distortion": 43, "aliases": false, "bitcrusherOctave": 2.5, "bitcrusherQuantization": 43, "chorus": 43, "echoSustain": 29, "echoDelayBeats": 1, "reverb": 23, "fadeInSeconds": 0.0263, "fadeOutTicks": 96, "wave": "deep", "unison": "none", "envelopes": [{ "target": "detune", "envelope": "tremolo2", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "bitcrusherQuantization", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "noteVolume", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "noteVolume", "envelope": "flare", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 12, "inverse": false, "perEnvelopeSpeed": 64, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": true } },
                { name: "distant sorrow", generalMidi: false, settings: { "type": "harmonics", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 707.11, "linearGain": 4 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 707.11, "linearGain": 4 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.5 }], "effects": ["transition type", "detune", "vibrato", "note filter", "echo", "reverb"], "transition": "interrupt", "clicklessTransition": false, "detuneCents": 0, "vibrato": "custom", "vibratoDepth": 0.2, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }], "echoSustain": 100, "echoDelayBeats": 1, "reverb": 74, "fadeInSeconds": 0, "fadeOutTicks": 24, "harmonics": [86, 71, 57, 43, 43, 29, 57, 0, 14, 0, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 57, 57, 57, 0, 57, 57, 0, 0], "unison": "none", "envelopes": [{ "target": "noteVolume", "envelope": "fall", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 10, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "noteFilterAllFreqs", "envelope": "swell", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2.5, "perEnvelopeLowerBound": 0.5, "perEnvelopeUpperBound": 2 }], "isDrum": false } },
                { name: "metallic kick", generalMidi: false, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 28, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.5 }], "effects": [], "panDelay": 0, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1←(2 3 4)", "feedbackType": "1→2→3→4", "feedbackAmplitude": 15, "operators": [{ "frequency": "8×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "256x", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "128x", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "256x", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorFrequency", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 16, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 0 }, { "target": "noteVolume", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 3.5, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "feedbackAmplitude", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 256, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 256, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 1 }, { "target": "operatorAmplitude", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 256, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "operatorAmplitude", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 256, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }], "isDrum": false } },
                { name: "chimes", generalMidi: false, settings: { "type": "Picked String", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 8000, "linearGain": 2.8284 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 8000, "linearGain": 2.8284 }], "effects": ["chord type", "detune", "note filter", "bitcrusher", "chorus", "echo", "reverb"], "chord": "strum", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "detuneCents": 24, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 0.5 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 2378.41, "linearGain": 1 }], "bitcrusherOctave": 4, "bitcrusherQuantization": 29, "panDelay": 0, "chorus": 29, "echoSustain": 86, "echoDelayBeats": 0.667, "reverb": 84, "fadeInSeconds": 0, "fadeOutTicks": 48, "harmonics": [0, 100, 71, 71, 29, 0, 57, 86, 0, 0, 0, 0, 71, 29, 0, 0, 57, 0, 0, 86, 0, 0, 0, 100, 0, 100, 0, 57], "unison": "none", "stringSustain": 36, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 2, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "bitcrusherQuantization", "envelope": "swell", "inverse": false, "perEnvelopeSpeed": 4.5, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "bitcrusherQuantization", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "noteVolume", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "stringSustain", "envelope": "random", "inverse": false, "perEnvelopeSpeed": 16, "perEnvelopeLowerBound": 0.5, "perEnvelopeUpperBound": 1, "steps": 14, "seed": 2, "waveform": 0 }, { "target": "detune", "envelope": "pitch", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96 }], "isDrum": false } },
                { name: "supersaw bass", generalMidi: false, settings: { "type": "supersaw", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.5 }], "effects": ["note filter", "distortion", "chorus", "reverb"], "noteFilterType": true, "noteSimpleCut": 9, "noteSimplePeak": 2, "noteFilter": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 7231.23, "linearGain": 1 }], "distortion": 14, "aliases": false, "chorus": 29, "reverb": 0, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "pulseWidth": 50, "decimalOffset": 0, "dynamism": 100, "spread": 67, "shape": 0, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "swell", "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "ascension", generalMidi: false, isNoise: false, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.25 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 420.45, "linearGain": 0.25 }], "eqSubFilters1": [], "effects": ["granular", "chorus", "reverb"], "granular": 7, "grainSize": 44, "grainAmounts": 9, "grainRange": 37, "chorus": 71, "reverb": 19, "fadeInSeconds": 0, "fadeOutTicks": 24, "spectrum": [43, 0, 0, 57, 0, 0, 14, 100, 29, 0, 0, 100, 29, 0, 100, 0, 57, 29, 86, 14, 14, 100, 14, 0, 14, 14, 0, 0, 43, 0], "unison": "voiced", "envelopes": [{ "target": "noteVolume", "envelope": "swell", "inverse": false, "perEnvelopeSpeed": 0.7, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "panning", "envelope": "lfo", "inverse": false, "perEnvelopeSpeed": 0.3, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false, "waveform": 2, "steps": 6 }], "isDrum": false } },
                { name: "liminal", generalMidi: false, isNoise: false, settings: { "type": "supersaw", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 840.9, "linearGain": 0.25 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 1.4142 }, { "type": "high-pass", "cutoffHz": 840.9, "linearGain": 0.25 }], "effects": ["detune", "vibrato", "note filter", "granular", "distortion", "bitcrusher", "chorus", "reverb"], "detuneCents": 8, "vibrato": "custom", "vibratoDepth": 0.48, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": true, "noteSimpleCut": 6, "noteSimplePeak": 2, "noteFilter": [{ "type": "low-pass", "cutoffHz": 2196.8, "linearGain": 1 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 2196.8, "linearGain": 1 }], "granular": 6, "grainSize": 49, "grainAmounts": 10, "grainRange": 40, "distortion": 57, "aliases": false, "bitcrusherOctave": 5, "bitcrusherQuantization": 0, "chorus": 29, "reverb": 48, "fadeInSeconds": 0, "fadeOutTicks": 72, "pulseWidth": 30, "decimalOffset": 0, "dynamism": 17, "spread": 83, "shape": 67, "envelopes": [{ "target": "noteVolume", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 17, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "pulseWidth", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 1.3333, "perEnvelopeLowerBound": 0.1, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "distortion", "envelope": "random", "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0.2, "perEnvelopeUpperBound": 1, "discrete": true, "steps": 8, "seed": 2, "waveform": 2 }, { "target": "panning", "envelope": "lfo", "inverse": false, "perEnvelopeSpeed": 0.3333, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false, "waveform": 2, "steps": 2 }, { "target": "noteVolume", "envelope": "swell", "inverse": false, "perEnvelopeSpeed": 18, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "noteVolume", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "granular", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }], "isDrum": false } },
            ])
        },
        {
            name: "Slarmoo's Box Chip Presets", presets: toNameMap([
                { name: "Slarmoo's Pulse", midiProgram: 80, settings: { "type": "PWM", "volume": 0, "eqFilter": [], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [], "effects": ["transition type", "chord type", "detune"], "transition": "interrupt", "clicklessTransition": false, "chord": "arpeggio", "fastTwoNoteArp": true, "arpeggioSpeed": 8, "detuneCents": 24, "fadeInSeconds": 0, "fadeOutTicks": -1, "pulseWidth": 50, "decimalOffset": 0, "unison": "none", "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "envelopes": [{ "target": "detune", "envelope": "pitch" }], "isDrum": false } },
                { name: "discovery square", midiProgram: 80, settings: { "type": "chip", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.3536 }], "effects": ["bitcrusher"], "bitcrusherOctave": 5.5, "bitcrusherQuantization": 57, "fadeInSeconds": 0, "fadeOutTicks": -3, "wave": "square", "unison": "octave", "isUsingAdvancedLoopControls": false, "chipWaveLoopStart": 0, "chipWaveLoopEnd": 2, "chipWaveLoopMode": 0, "chipWavePlayBackwards": false, "chipWaveStartOffset": 0, "envelopes": [], "isDrum": false } },
                { name: "VRC6 Sawtooth alt", midiProgram: 81, settings: { "type": "custom chip", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.5 }], "effects": ["transition type", "chord type", "pitch shift", "detune", "vibrato", "distortion"], "transition": "interrupt", "clicklessTransition": false, "chord": "arpeggio", "fastTwoNoteArp": true, "arpeggioSpeed": 12, "pitchShiftSemitones": 12, "detuneCents": 0, "vibrato": "none", "vibratoDepth": 0, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 0, "distortion": 0, "aliases": false, "fadeInSeconds": 0, "fadeOutTicks": -1, "wave": "square", "unison": "none", "customChipWave": { "0": -1, "1": -1, "2": -1, "3": -1, "4": -1, "5": -1, "6": -1, "7": -1, "8": -1, "9": -5, "10": -5, "11": -5, "12": -4, "13": -4, "14": -4, "15": -3, "16": -3, "17": -3, "18": -7, "19": -7, "20": -6, "21": -6, "22": -5, "23": -5, "24": -4, "25": -4, "26": -4, "27": -7, "28": -7, "29": -6, "30": -6, "31": -5, "32": -5, "33": -4, "34": -4, "35": -4, "36": -8, "37": -8, "38": -7, "39": -7, "40": -6, "41": -6, "42": -5, "43": -5, "44": -4, "45": -4, "46": 21, "47": 20, "48": 18, "49": 17, "50": 16, "51": 14, "52": 13, "53": 12, "54": 11, "55": 7, "56": 6, "57": 6, "58": 5, "59": 5, "60": 5, "61": 4, "62": 4, "63": 4 }, "customChipWaveIntegral": { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0, "46": 0, "47": 0, "48": 0, "49": 0, "50": 0, "51": 0, "52": 0, "53": 0, "54": 0, "55": 0, "56": 0, "57": 0, "58": 0, "59": 0, "60": 0, "61": 0, "62": 0, "63": 0, "64": 0 }, "envelopes": [], "isDrum": false } },
                { name: "pulse arps", midiProgram: 80, settings: { "type": "PWM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.125 }, { "type": "high-pass", "cutoffHz": 840.9, "linearGain": 2 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 7, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 16000, "linearGain": 0.125 }, { "type": "high-pass", "cutoffHz": 840.9, "linearGain": 2 }], "effects": ["transition type", "chord type", "detune", "chorus", "echo"], "transition": "interrupt", "clicklessTransition": false, "chord": "arpeggio", "fastTwoNoteArp": true, "arpeggioSpeed": 8, "detuneCents": 64, "chorus": 43, "echoSustain": 71, "echoDelayBeats": 0.333, "fadeInSeconds": 0, "fadeOutTicks": -1, "pulseWidth": 50, "decimalOffset": 0, "unison": "none", "envelopes": [{ "target": "detune", "envelope": "pitch", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96 }, { "target": "pulseWidth", "envelope": "pitch", "inverse": true, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "pitchEnvelopeStart": 24, "pitchEnvelopeEnd": 83 }, { "target": "panning", "envelope": "lfo", "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "waveform": 0, "steps": 2 }, { "target": "noteVolume", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "chorus", "envelope": "twang", "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
            ])
        },
        {
            name: "Slarmoo's Box Instrumental Presets", presets: toNameMap([
                { name: "rusty flute", midiProgram: 73, settings: { "type": "FM", "eqFilter": [{ "type": "peak", "cutoffHz": 13454.34, "linearGain": 2.8284 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "peak", "cutoffHz": 13454.34, "linearGain": 2.8284 }], "effects": ["transition type", "detune", "distortion", "reverb"], "transition": "normal", "clicklessTransition": false, "detuneCents": -7, "distortion": 14, "aliases": false, "reverb": 100, "fadeInSeconds": 0, "fadeOutTicks": 96, "algorithm": "1←2←3←4", "feedbackType": "3→4", "feedbackAmplitude": 8, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 4, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "20×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [], "isDrum": false } },
                { name: "bitcrushed piano", midiProgram: 4, settings: { "type": "chip", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2.8284 }, { "type": "high-pass", "cutoffHz": 74.33, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2.8284 }, { "type": "high-pass", "cutoffHz": 74.33, "linearGain": 0.5 }], "effects": ["transition type", "detune", "distortion", "bitcrusher", "reverb"], "transition": "continue", "clicklessTransition": false, "detuneCents": 0, "distortion": 29, "aliases": true, "bitcrusherOctave": 4, "bitcrusherQuantization": 43, "panDelay": 0, "reverb": 0, "fadeInSeconds": 0, "fadeOutTicks": -3, "wave": "triangle", "unison": "none", "isUsingAdvancedLoopControls": true, "chipWaveLoopStart": 0, "chipWaveLoopEnd": 32, "chipWaveLoopMode": 0, "chipWavePlayBackwards": false, "chipWaveStartOffset": 0, "envelopes": [{ "target": "bitcrusherQuantization", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0.6, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "noteVolume", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }], "isDrum": false } },
                { name: "detuned piano", midiProgram: 3, settings: { "type": "Picked String", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2.8284 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 840.9, "linearGain": 2.8284 }], "effects": ["transition type", "detune", "vibrato", "note filter", "bitcrusher"], "transition": "continue", "clicklessTransition": false, "detuneCents": 44, "vibrato": "custom", "vibratoDepth": 0.04, "vibratoDelay": 13, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "high-pass", "cutoffHz": 420.45, "linearGain": 1 }], "noteSubFilters0": [{ "type": "high-pass", "cutoffHz": 420.45, "linearGain": 1 }], "bitcrusherOctave": 4, "bitcrusherQuantization": 14, "fadeInSeconds": 0, "fadeOutTicks": -3, "harmonics": [86, 86, 71, 71, 57, 57, 43, 29, 14, 29, 29, 29, 29, 29, 29, 29, 29, 43, 43, 43, 43, 43, 29, 14, 14, 0, 0, 0], "unison": "custom", "unisonVoices": 2, "unisonSpread": 0.26, "unisonOffset": 0, "unisonExpression": 1, "unisonSign": 1, "stringSustain": 79, "envelopes": [{ "target": "detune", "envelope": "random", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 49, "waveform": 1 }, { "target": "noteVolume", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 1.6667, "perEnvelopeLowerBound": 0.4, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 2, "waveform": 0 }, { "target": "unison", "envelope": "random", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 20, "waveform": 1 }, { "target": "noteFilterAllFreqs", "envelope": "pitch", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": true, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 2, "waveform": 0 }], "isDrum": false } },
                { name: "pan flute 2", midiProgram: 75, isNoise: false, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "peak", "cutoffHz": 2828.43, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.5 }], "effects": ["transition type", "note filter", "bitcrusher", "reverb"], "transition": "continue", "clicklessTransition": false, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.5 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.5 }], "noteSubFilters1": [{ "type": "low-pass", "cutoffHz": 9513.66, "linearGain": 0.5 }], "bitcrusherOctave": 6, "bitcrusherQuantization": 57, "reverb": 16, "fadeInSeconds": 0.0125, "fadeOutTicks": -6, "spectrum": [100, 29, 14, 14, 57, 0, 0, 71, 0, 86, 57, 43, 57, 71, 14, 29, 14, 14, 14, 100, 71, 14, 14, 14, 14, 86, 43, 14, 0, 0], "unison": "none", "pitchEnvelopeStart0": 0, "pitchEnvelopeEnd0": 96, "envelopeInverse0": false, "pitchEnvelopeStart1": 0, "pitchEnvelopeEnd1": 96, "envelopeInverse1": false, "pitchEnvelopeStart2": 0, "pitchEnvelopeEnd2": 96, "envelopeInverse2": false, "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "note size" }, { "target": "bitcrusherQuantization", "envelope": "note size" }, { "target": "noteVolume", "envelope": "note size" }], "isDrum": false } },
                { name: "trumpet 2", midiProgram: 56, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 3049.17, "linearGain": 1.4142 }], "eqFilterType": true, "eqSimpleCut": 7, "eqSimplePeak": 3, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["detune", "vibrato", "note filter", "distortion", "chorus", "reverb"], "detuneCents": -64, "vibrato": "custom", "vibratoDepth": 0.68, "vibratoDelay": 17, "vibratoSpeed": 12, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 1000, "linearGain": 0.1768 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 3363.59, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 1000, "linearGain": 0.1768 }], "distortion": 29, "aliases": false, "chorus": 14, "reverb": 0, "fadeInSeconds": 0.0263, "fadeOutTicks": -3, "algorithm": "1 2←(3 4)", "feedbackType": "1⟲", "feedbackAmplitude": 9, "operators": [{ "frequency": "0.75×", "amplitude": 14, "waveform": "pulse width", "pulseWidth": 2 }, { "frequency": "1×", "amplitude": 14, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 8, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "operatorAmplitude", "envelope": "flare", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 3 }, { "target": "feedbackAmplitude", "envelope": "swell", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 32, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorFrequency", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 128, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 0 }, { "target": "noteFilterFreq", "envelope": "swell", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 2.5, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 2 }, { "target": "noteVolume", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "detune", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": true, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "harp 2", midiProgram: 46, settings: { "type": "FM6op", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 2.8284 }, { "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 1000, "linearGain": 2.8284 }, { "type": "high-pass", "cutoffHz": 62.5, "linearGain": 0.25 }, { "type": "high-pass", "cutoffHz": 148.65, "linearGain": 0.5 }], "eqSubFilters1": [], "effects": ["detune", "note filter", "echo", "reverb"], "detuneCents": -23, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 105.11, "linearGain": 2.8284 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 6727.17, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 105.11, "linearGain": 2.8284 }], "echoSustain": 29, "echoDelayBeats": 1.083, "reverb": 74, "fadeInSeconds": 0, "fadeOutTicks": -1, "algorithm": "1←4 2←5 3←6", "feedbackType": "1⟲", "feedbackAmplitude": 5, "operators": [{ "frequency": "1×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 5, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 6, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "6×", "amplitude": 12, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 2, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteVolume", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 4, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "operatorFrequency", "envelope": "tremolo", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 1 }, { "target": "detune", "envelope": "decay", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 7, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }, { "target": "noteFilterFreq", "envelope": "tremolo2", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 1, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 0 }, { "target": "operatorAmplitude", "envelope": "twang", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "index": 4 }, { "target": "operatorAmplitude", "envelope": "swell", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": true, "perEnvelopeSpeed": 8, "perEnvelopeLowerBound": 0.4, "perEnvelopeUpperBound": 1, "index": 0 }, { "target": "noteVolume", "envelope": "punch", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "electric guitar 1", midiProgram: 30, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 1189.21, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 4000, "linearGain": 1.4142 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 1189.21, "linearGain": 2 }, { "type": "low-pass", "cutoffHz": 4000, "linearGain": 1.4142 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 420.45, "linearGain": 0.0884 }], "effects": ["chord type", "vibrato", "note filter", "distortion", "reverb"], "chord": "monophonic", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "monoChordTone": 0, "vibrato": "delayed", "vibratoDepth": 0.3, "vibratoDelay": 18.5, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 1414.21, "linearGain": 4 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 1 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 1414.21, "linearGain": 4 }, { "type": "high-pass", "cutoffHz": 594.6, "linearGain": 1 }], "distortion": 100, "aliases": false, "panDelay": 0, "reverb": 6, "fadeInSeconds": 0, "fadeOutTicks": 24, "algorithm": "1 2 3 4", "feedbackType": "1⟲", "feedbackAmplitude": 0, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "2×", "amplitude": 0, "waveform": "sawtooth", "pulseWidth": 5 }, { "frequency": "4×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "0.25×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "noteVolume", "envelope": "punch", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "vibratoDepth", "envelope": "rise", "inverse": false, "perEnvelopeSpeed": 9, "perEnvelopeLowerBound": 1, "perEnvelopeUpperBound": 2, "discrete": false }, { "target": "noteVolume", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "distortion", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }], "isDrum": false } },
                { name: "electric guitar 2", midiProgram: 30, settings: { "type": "PWM", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 1681.79, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 2 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 3363.59, "linearGain": 5.6569 }, { "type": "high-pass", "cutoffHz": 1681.79, "linearGain": 0.25 }, { "type": "peak", "cutoffHz": 5656.85, "linearGain": 2 }], "effects": ["chord type", "vibrato", "note filter", "distortion", "bitcrusher", "chorus", "reverb"], "chord": "monophonic", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "monoChordTone": 0, "vibrato": "custom", "vibratoDepth": 0.68, "vibratoDelay": 22, "vibratoSpeed": 10, "vibratoType": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 2.8284 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 2.8284 }], "distortion": 43, "aliases": false, "bitcrusherOctave": 6.5, "bitcrusherQuantization": 71, "panDelay": 0, "chorus": 14, "reverb": 13, "fadeInSeconds": 0, "fadeOutTicks": 24, "pulseWidth": 50, "decimalOffset": 0, "unison": "none", "envelopes": [{ "target": "noteFilterAllFreqs", "envelope": "rise", "inverse": false, "perEnvelopeSpeed": 0.3333, "perEnvelopeLowerBound": 0.8, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "pulseWidth", "envelope": "twang", "inverse": true, "perEnvelopeSpeed": 2.25, "perEnvelopeLowerBound": 0.5, "perEnvelopeUpperBound": 0.9, "discrete": false }, { "target": "noteVolume", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }, { "target": "bitcrusherQuantization", "envelope": "note size", "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "discrete": false }], "isDrum": false } },
            ])
        },
        {
            name: "Slarmoo's Box Novelty Presets", presets: toNameMap([
                { name: "bitcrushed artifacts", generalMidi: false, settings: { "type": "Picked String", "eqFilter": [{ "type": "low-pass", "cutoffHz": 9656.85, "linearGain": 0.5 }], "eqFilterType": true, "eqSimpleCut": 9, "eqSimplePeak": 1, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["distortion", "bitcrusher", "echo"], "distortion": 71, "aliases": false, "bitcrusherOctave": 2, "bitcrusherQuantization": 86, "echoSustain": 0, "echoDelayBeats": 1, "fadeInSeconds": 0, "fadeOutTicks": -6, "harmonics": [0, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 100, 43, 0, 0, 14, 86, 0, 14, 0, 0, 0, 0, 0, 86], "unison": "none", "stringSustain": 14, "envelopes": [], "isDrum": false } },
                { name: "whistle 2", midiProgram: 78, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 2110.37, "linearGain": 1.4142 }], "eqFilterType": true, "eqSimpleCut": 6, "eqSimplePeak": 3, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters1": [], "effects": ["transition type", "pitch shift", "note filter", "distortion", "echo", "reverb"], "transition": "normal", "clicklessTransition": false, "pitchShiftSemitones": 11, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 1414.21, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 4 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 1414.21, "linearGain": 2 }, { "type": "high-pass", "cutoffHz": 88.39, "linearGain": 2 }, { "type": "peak", "cutoffHz": 1681.79, "linearGain": 4 }], "distortion": 43, "aliases": false, "echoSustain": 57, "echoDelayBeats": 1.083, "reverb": 87, "fadeInSeconds": 0.0575, "fadeOutTicks": -1, "harmonics": [57, 0, 0, 0, 0, 0, 0, 0, 0, 86, 57, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 57, 29, 0, 29, 100, 0], "unison": "none", "envelopes": [{ "target": "pitchShift", "envelope": "decay 1" }], "isDrum": false } },
                { name: "frog wuh", generalMidi: false, settings: { "type": "spectrum", "eqFilter": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 8 }, { "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.125 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 594.6, "linearGain": 0.5 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 8 }, { "type": "low-pass", "cutoffHz": 13454.34, "linearGain": 0.125 }], "eqSubFilters1": [], "effects": ["pitch shift", "note filter"], "pitchShiftSemitones": 0, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 1 }], "noteSubFilters0": [{ "type": "low-pass", "cutoffHz": 1000, "linearGain": 1 }], "fadeInSeconds": 0, "fadeOutTicks": -3, "spectrum": [100, 29, 14, 29, 0, 14, 0, 71, 0, 43, 14, 71, 0, 0, 71, 14, 100, 0, 71, 0, 43, 86, 43, 0, 43, 0, 0, 43, 29, 29], "envelopes": [{ "target": "pitchShift", "envelope": "twang 1" }, { "target": "noteFilterAllFreqs", "envelope": "twang 1" }], "isDrum": false } },
                { name: "stationary harmonics", generalMidi: false, settings: { "type": "harmonics", "eqFilter": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 1 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.5 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 4756.83, "linearGain": 0.3536 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 1 }, { "type": "peak", "cutoffHz": 1189.21, "linearGain": 0.5 }], "effects": ["transition type", "chord type", "vibrato"], "transition": "continue", "clicklessTransition": false, "chord": "simultaneous", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "vibrato": "shaky", "vibratoDepth": 0.1, "vibratoDelay": 0, "vibratoSpeed": 10, "vibratoType": 1, "fadeInSeconds": 0, "fadeOutTicks": 12, "harmonics": [100, 0, 57, 29, 14, 57, 29, 29, 14, 14, 29, 43, 14, 14, 14, 0, 14, 29, 29, 14, 0, 0, 14, 0, 0, 29, 14, 14], "unison": "stationary", "envelopes": [], "isDrum": false } },
                { name: "dead souls", generalMidi: false, settings: { "type": "spectrum", "volume": 0, "eqFilter": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 1.4142 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": true, "eqSubFilters0": [{ "type": "low-pass", "cutoffHz": 8000, "linearGain": 0.1768 }, { "type": "high-pass", "cutoffHz": 353.55, "linearGain": 0.0884 }, { "type": "peak", "cutoffHz": 707.11, "linearGain": 1.4142 }], "effects": ["transition type", "chord type", "pitch shift", "detune", "distortion", "chorus", "reverb"], "transition": "interrupt", "clicklessTransition": false, "chord": "arpeggio", "fastTwoNoteArp": false, "arpeggioSpeed": 12, "pitchShiftSemitones": 24, "detuneCents": -200, "distortion": 100, "aliases": false, "chorus": 14, "reverb": 35, "fadeInSeconds": 0, "fadeOutTicks": -1, "spectrum": [100, 71, 43, 43, 29, 29, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 14, 14, 0, 0], "unison": "none", "envelopes": [{ "target": "pitchShift", "envelope": "random", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 24, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1.2, "steps": 16, "seed": 37, "waveform": 0 }, { "target": "noteVolume", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 2, "waveform": 0 }, { "target": "detune", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": true, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 2, "waveform": 0 }, { "target": "distortion", "envelope": "note size", "pitchEnvelopeStart": 0, "pitchEnvelopeEnd": 96, "inverse": false, "perEnvelopeSpeed": 0, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1, "steps": 2, "seed": 2, "waveform": 0 }], "isDrum": false } },
                { name: "flutter", generalMidi: false, settings: { "type": "FM", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 707.11, "linearGain": 1 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 2.8284 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 707.11, "linearGain": 1 }, { "type": "peak", "cutoffHz": 6727.17, "linearGain": 2.8284 }], "effects": ["transition type", "chorus", "reverb", "ring mod"], "transition": "interrupt", "clicklessTransition": false, "ringMod": 100, "ringModHz": 100, "ringModWaveformIndex": 0, "panDelay": 0, "chorus": 14, "reverb": 10, "fadeInSeconds": 0, "fadeOutTicks": 12, "algorithm": "1←3 2←4", "feedbackType": "1⟲", "feedbackAmplitude": 3, "operators": [{ "frequency": "1×", "amplitude": 15, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 10, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }, { "frequency": "1×", "amplitude": 0, "waveform": "sine", "pulseWidth": 5 }], "envelopes": [{ "target": "ringModulationHz", "envelope": "fall", "inverse": false, "perEnvelopeSpeed": 1.5, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1.9 }, { "target": "noteVolume", "envelope": "blip", "inverse": false, "perEnvelopeSpeed": 0.25, "perEnvelopeLowerBound": 0, "perEnvelopeUpperBound": 1 }], "isDrum": false } },
                { name: "vinyl", generalMidi: false, settings: { "type": "noise", "volume": 0, "eqFilter": [{ "type": "high-pass", "cutoffHz": 1414.21, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 1189.21, "linearGain": 0.25 }], "eqFilterType": false, "eqSimpleCut": 10, "eqSimplePeak": 0, "envelopeSpeed": 12, "discreteEnvelope": false, "eqSubFilters0": [{ "type": "high-pass", "cutoffHz": 1414.21, "linearGain": 0.3536 }, { "type": "low-pass", "cutoffHz": 1189.21, "linearGain": 0.25 }], "effects": ["transition type", "note filter", "distortion", "bitcrusher", "chorus", "echo", "reverb"], "transition": "interrupt", "clicklessTransition": false, "noteFilterType": false, "noteSimpleCut": 10, "noteSimplePeak": 0, "noteFilter": [{ "type": "high-pass", "cutoffHz": 250, "linearGain": 0.5 }, { "type": "low-pass", "cutoffHz": 8000, "linearGain": 1 }], "noteSubFilters0": [{ "type": "high-pass", "cutoffHz": 250, "linearGain": 0.5 }, { "type": "low-pass", "cutoffHz": 8000, "linearGain": 1 }], "distortion": 14, "aliases": false, "bitcrusherOctave": 5.5, "bitcrusherQuantization": 14, "chorus": 29, "echoSustain": 14, "echoDelayBeats": 0.083, "reverb": 32, "fadeInSeconds": 0, "fadeOutTicks": 24, "wave": "crackling", "unison": "none", "envelopes": [], "isDrum": false } },
            ])
        }
    ]);

    function scaleElementsByFactor(array, factor) {
        for (let i = 0; i < array.length; i++) {
            array[i] *= factor;
        }
    }
    function isPowerOf2(n) {
        return !!n && !(n & (n - 1));
    }
    function countBits(n) {
        if (!isPowerOf2(n))
            throw new Error("FFT array length must be a power of 2.");
        return Math.round(Math.log(n) / Math.log(2));
    }
    function reverseIndexBits(array, fullArrayLength) {
        const bitCount = countBits(fullArrayLength);
        if (bitCount > 16)
            throw new Error("FFT array length must not be greater than 2^16.");
        const finalShift = 16 - bitCount;
        for (let i = 0; i < fullArrayLength; i++) {
            let j;
            j = ((i & 0xaaaa) >> 1) | ((i & 0x5555) << 1);
            j = ((j & 0xcccc) >> 2) | ((j & 0x3333) << 2);
            j = ((j & 0xf0f0) >> 4) | ((j & 0x0f0f) << 4);
            j = ((j >> 8) | ((j & 0xff) << 8)) >> finalShift;
            if (j > i) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    function inverseRealFourierTransform(array, fullArrayLength) {
        const totalPasses = countBits(fullArrayLength);
        if (fullArrayLength < 4)
            throw new Error("FFT array length must be at least 4.");
        for (let pass = totalPasses - 1; pass >= 2; pass--) {
            const subStride = 1 << pass;
            const midSubStride = subStride >> 1;
            const stride = subStride << 1;
            const radiansIncrement = Math.PI * 2.0 / stride;
            const cosIncrement = Math.cos(radiansIncrement);
            const sinIncrement = Math.sin(radiansIncrement);
            const oscillatorMultiplier = 2.0 * cosIncrement;
            for (let startIndex = 0; startIndex < fullArrayLength; startIndex += stride) {
                const startIndexA = startIndex;
                const midIndexA = startIndexA + midSubStride;
                const startIndexB = startIndexA + subStride;
                const midIndexB = startIndexB + midSubStride;
                const stopIndex = startIndexB + subStride;
                const realStartA = array[startIndexA];
                const imagStartB = array[startIndexB];
                array[startIndexA] = realStartA + imagStartB;
                array[midIndexA] *= 2;
                array[startIndexB] = realStartA - imagStartB;
                array[midIndexB] *= 2;
                let c = cosIncrement;
                let s = -sinIncrement;
                let cPrev = 1.0;
                let sPrev = 0.0;
                for (let index = 1; index < midSubStride; index++) {
                    const indexA0 = startIndexA + index;
                    const indexA1 = startIndexB - index;
                    const indexB0 = startIndexB + index;
                    const indexB1 = stopIndex - index;
                    const real0 = array[indexA0];
                    const real1 = array[indexA1];
                    const imag0 = array[indexB0];
                    const imag1 = array[indexB1];
                    const tempA = real0 - real1;
                    const tempB = imag0 + imag1;
                    array[indexA0] = real0 + real1;
                    array[indexA1] = imag1 - imag0;
                    array[indexB0] = tempA * c - tempB * s;
                    array[indexB1] = tempB * c + tempA * s;
                    const cTemp = oscillatorMultiplier * c - cPrev;
                    const sTemp = oscillatorMultiplier * s - sPrev;
                    cPrev = c;
                    sPrev = s;
                    c = cTemp;
                    s = sTemp;
                }
            }
        }
        for (let index = 0; index < fullArrayLength; index += 4) {
            const index1 = index + 1;
            const index2 = index + 2;
            const index3 = index + 3;
            const real0 = array[index];
            const real1 = array[index1] * 2;
            const imag2 = array[index2];
            const imag3 = array[index3] * 2;
            const tempA = real0 + imag2;
            const tempB = real0 - imag2;
            array[index] = tempA + real1;
            array[index1] = tempA - real1;
            array[index2] = tempB + imag3;
            array[index3] = tempB - imag3;
        }
        reverseIndexBits(array, fullArrayLength);
    }

    

    
     class EventManager {
        constructor() {
            this.activeEvents = [];
            this.listeners = {};
            this.activeEvents = [];
            this.listeners = {};
        }
        raise(eventType, eventData, extraEventData) {
            if (this.listeners[eventType] == undefined) {
                return;
            }
            this.activeEvents.push(eventType);
            for (let i = 0; i < this.listeners[eventType].length; i++) {
                this.listeners[eventType][i](eventData, extraEventData);
            }
            this.activeEvents.pop();
        }
        listen(eventType, callback) {
            if (this.listeners[eventType] == undefined) {
                this.listeners[eventType] = [];
            }
            this.listeners[eventType].push(callback);
        }
        unlisten(eventType, callback) {
            if (this.listeners[eventType] == undefined) {
                return;
            }
            const lisen = this.listeners[eventType].indexOf(callback);
            if (lisen != -1) {
                this.listeners[eventType].splice(lisen, 1);
            }
        }
        unlistenAll(eventType) {
            if (this.listeners[eventType] == undefined) {
                return;
            }
            this.listeners[eventType] = [];
        }
    }
    events = new EventManager();


    
    
    
    function warpInfinityToNyquist(radians) {
        return 2.0 * Math.atan(radians * 0.5);
    }

    const PRIME32_1 = 2654435761;
    const PRIME32_2 = 2246822519;
    const PRIME32_3 = 3266489917;
    const PRIME32_4 = 668265263;
    const PRIME32_5 = 374761393;
    let encoder;
    /**
     *
     * @param input - byte array or string
     * @param seed - optional seed (32-bit unsigned);
     */
    function xxHash32(input, seed = 0) {
        const buffer = typeof input === 'string' ? (encoder ??= new TextEncoder()).encode(input) : input;
        const b = buffer;
        /*
            Step 1. Initialize internal accumulators
            Each accumulator gets an initial value based on optional seed input. Since the seed is optional, it can be 0.

            ```
                u32 acc1 = seed + PRIME32_1 + PRIME32_2;
                u32 acc2 = seed + PRIME32_2;
                u32 acc3 = seed + 0;
                u32 acc4 = seed - PRIME32_1;
            ```
            Special case : input is less than 16 bytes
            When input is too small (< 16 bytes), the algorithm will not process any stripe. Consequently, it will not
            make use of parallel accumulators.

            In which case, a simplified initialization is performed, using a single accumulator :

            u32 acc  = seed + PRIME32_5;
            The algorithm then proceeds directly to step 4.
        */
        let acc = (seed + PRIME32_5) & 0xffffffff;
        let offset = 0;
        if (b.length >= 16) {
            const accN = [
                (seed + PRIME32_1 + PRIME32_2) & 0xffffffff,
                (seed + PRIME32_2) & 0xffffffff,
                (seed + 0) & 0xffffffff,
                (seed - PRIME32_1) & 0xffffffff,
            ];
            /*
                Step 2. Process stripes
                A stripe is a contiguous segment of 16 bytes. It is evenly divided into 4 lanes, of 4 bytes each.
                The first lane is used to update accumulator 1, the second lane is used to update accumulator 2, and so on.

                Each lane read its associated 32-bit value using little-endian convention.

                For each {lane, accumulator}, the update process is called a round, and applies the following formula :

                ```
                accN = accN + (laneN * PRIME32_2);
                accN = accN <<< 13;
                accN = accN * PRIME32_1;
                ```

                This shuffles the bits so that any bit from input lane impacts several bits in output accumulator.
                All operations are performed modulo 2^32.

                Input is consumed one full stripe at a time. Step 2 is looped as many times as necessary to consume
                the whole input, except the last remaining bytes which cannot form a stripe (< 16 bytes). When that
                happens, move to step 3.
            */
            const b = buffer;
            const limit = b.length - 16;
            let lane = 0;
            for (offset = 0; (offset & 0xfffffff0) <= limit; offset += 4) {
                const i = offset;
                const laneN0 = b[i + 0] + (b[i + 1] << 8);
                const laneN1 = b[i + 2] + (b[i + 3] << 8);
                const laneNP = laneN0 * PRIME32_2 + ((laneN1 * PRIME32_2) << 16);
                let acc = (accN[lane] + laneNP) & 0xffffffff;
                acc = (acc << 13) | (acc >>> 19);
                const acc0 = acc & 0xffff;
                const acc1 = acc >>> 16;
                accN[lane] = (acc0 * PRIME32_1 + ((acc1 * PRIME32_1) << 16)) & 0xffffffff;
                lane = (lane + 1) & 0x3;
            }
            /*
                Step 3. Accumulator convergence
                All 4 lane accumulators from previous steps are merged to produce a single remaining accumulator
                of same width (32-bit). The associated formula is as follows :

                ```
                acc = (acc1 <<< 1) + (acc2 <<< 7) + (acc3 <<< 12) + (acc4 <<< 18);
                ```
            */
            acc =
                (((accN[0] << 1) | (accN[0] >>> 31)) +
                    ((accN[1] << 7) | (accN[1] >>> 25)) +
                    ((accN[2] << 12) | (accN[2] >>> 20)) +
                    ((accN[3] << 18) | (accN[3] >>> 14))) &
                    0xffffffff;
        }
        /*
            Step 4. Add input length
            The input total length is presumed known at this stage. This step is just about adding the length to
            accumulator, so that it participates to final mixing.

            ```
            acc = acc + (u32)inputLength;
            ```
        */
        acc = (acc + buffer.length) & 0xffffffff;
        /*
            Step 5. Consume remaining input
            There may be up to 15 bytes remaining to consume from the input. The final stage will digest them according
            to following pseudo-code :
            ```
            while (remainingLength >= 4) {
                lane = read_32bit_little_endian(input_ptr);
                acc = acc + lane * PRIME32_3;
                acc = (acc <<< 17) * PRIME32_4;
                input_ptr += 4; remainingLength -= 4;
            }
            ```
            This process ensures that all input bytes are present in the final mix.
        */
        const limit = buffer.length - 4;
        for (; offset <= limit; offset += 4) {
            const i = offset;
            const laneN0 = b[i + 0] + (b[i + 1] << 8);
            const laneN1 = b[i + 2] + (b[i + 3] << 8);
            const laneP = laneN0 * PRIME32_3 + ((laneN1 * PRIME32_3) << 16);
            acc = (acc + laneP) & 0xffffffff;
            acc = (acc << 17) | (acc >>> 15);
            acc = ((acc & 0xffff) * PRIME32_4 + (((acc >>> 16) * PRIME32_4) << 16)) & 0xffffffff;
        }
        /*
            ```
            while (remainingLength >= 1) {
                lane = read_byte(input_ptr);
                acc = acc + lane * PRIME32_5;
                acc = (acc <<< 11) * PRIME32_1;
                input_ptr += 1; remainingLength -= 1;
            }
            ```
        */
        for (; offset < b.length; ++offset) {
            const lane = b[offset];
            acc = acc + lane * PRIME32_5;
            acc = (acc << 11) | (acc >>> 21);
            acc = ((acc & 0xffff) * PRIME32_1 + (((acc >>> 16) * PRIME32_1) << 16)) & 0xffffffff;
        }
        /*
            Step 6. Final mix (avalanche)
            The final mix ensures that all input bits have a chance to impact any bit in the output digest,
            resulting in an unbiased distribution. This is also called avalanche effect.
            ```
            acc = acc xor (acc >> 15);
            acc = acc * PRIME32_2;
            acc = acc xor (acc >> 13);
            acc = acc * PRIME32_3;
            acc = acc xor (acc >> 16);
            ```
        */
        acc = acc ^ (acc >>> 15);
        acc = (((acc & 0xffff) * PRIME32_2) & 0xffffffff) + (((acc >>> 16) * PRIME32_2) << 16);
        acc = acc ^ (acc >>> 13);
        acc = (((acc & 0xffff) * PRIME32_3) & 0xffffffff) + (((acc >>> 16) * PRIME32_3) << 16);
        acc = acc ^ (acc >>> 16);
        // turn any negatives back into a positive number;
        return acc < 0 ? acc + 4294967296 : acc;
    }

    const epsilon = (1.0e-24);
    function clamp(min, max, val) {
        max = max - 1;
        if (val <= max) {
            if (val >= min)
                return val;
            else
                return min;
        }
        else {
            return max;
        }
    }
    function validateRange(min, max, val) {
        if (min <= val && val <= max)
            return val;
        throw new Error(`Value ${val} not in range [${min}, ${max}]`);
    }
    function parseFloatWithDefault(s, defaultValue) {
        let result = parseFloat(s);
        if (Number.isNaN(result))
            result = defaultValue;
        return result;
    }
    function parseIntWithDefault(s, defaultValue) {
        let result = parseInt(s);
        if (Number.isNaN(result))
            result = defaultValue;
        return result;
    }
    function encode32BitNumber(buffer, x) {
        buffer.push(base64IntToCharCode[(x >>> (6 * 5)) & 0x3]);
        buffer.push(base64IntToCharCode[(x >>> (6 * 4)) & 0x3f]);
        buffer.push(base64IntToCharCode[(x >>> (6 * 3)) & 0x3f]);
        buffer.push(base64IntToCharCode[(x >>> (6 * 2)) & 0x3f]);
        buffer.push(base64IntToCharCode[(x >>> (6 * 1)) & 0x3f]);
        buffer.push(base64IntToCharCode[(x >>> (6 * 0)) & 0x3f]);
    }
    function decode32BitNumber(compressed, charIndex) {
        let x = 0;
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 5);
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 4);
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 3);
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 2);
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 1);
        x |= base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << (6 * 0);
        return x;
    }
    function encodeUnisonSettings(buffer, v, s, o, e, i) {
        buffer.push(base64IntToCharCode[v]);
        buffer.push(base64IntToCharCode[Number((s > 0))]);
        let cleanS = Math.round(Math.abs(s) * 1000);
        let cleanSDivided = Math.floor(cleanS / 63);
        buffer.push(base64IntToCharCode[cleanS % 63], base64IntToCharCode[cleanSDivided % 63], base64IntToCharCode[Math.floor(cleanSDivided / 63)]);
        buffer.push(base64IntToCharCode[Number((o > 0))]);
        let cleanO = Math.round(Math.abs(o) * 1000);
        let cleanODivided = Math.floor(cleanO / 63);
        buffer.push(base64IntToCharCode[cleanO % 63], base64IntToCharCode[cleanODivided % 63], base64IntToCharCode[Math.floor(cleanODivided / 63)]);
        buffer.push(base64IntToCharCode[Number((e > 0))]);
        let cleanE = Math.round(Math.abs(e) * 1000);
        buffer.push(base64IntToCharCode[cleanE % 63], base64IntToCharCode[Math.floor(cleanE / 63)]);
        buffer.push(base64IntToCharCode[Number((i > 0))]);
        let cleanI = Math.round(Math.abs(i) * 1000);
        buffer.push(base64IntToCharCode[cleanI % 63], base64IntToCharCode[Math.floor(cleanI / 63)]);
    }
    function convertLegacyKeyToKeyAndOctave(rawKeyIndex) {
        let key = clamp(0, Config.keys.length, rawKeyIndex);
        let octave = 0;
        if (rawKeyIndex === 12) {
            key = 0;
            octave = 1;
        }
        else if (rawKeyIndex === 13) {
            key = 6;
            octave = -1;
        }
        else if (rawKeyIndex === 14) {
            key = 0;
            octave = -1;
        }
        else if (rawKeyIndex === 15) {
            key = 5;
            octave = -1;
        }
        return [key, octave];
    }
    const base64IntToCharCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95];
    const base64CharCodeToInt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 63, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0, 0];
    
    
    function makeNotePin(interval, time, size) {
        return { interval: interval, time: time, size: size };
    }
   
    
    
    
    
    
    
    
    
    
    
    
    
  
    
     
    Song._format = Config.jsonFormat;
    Song._oldestBeepboxVersion = 2;
    Song._latestBeepboxVersion = 9;
    Song._oldestJummBoxVersion = 1;
    Song._latestJummBoxVersion = 6;
    Song._oldestGoldBoxVersion = 1;
    Song._latestGoldBoxVersion = 4;
    Song._oldestUltraBoxVersion = 1;
    Song._latestUltraBoxVersion = 5;
    Song._oldestSlarmoosBoxVersion = 1;
    Song._latestSlarmoosBoxVersion = 5;
    Song._variant = 0x74;
    
    
  
  
    
     
    Synth.tempFilterStartCoefficients = new FilterCoefficients();
    Synth.tempFilterEndCoefficients = new FilterCoefficients();
    Synth.fmSynthFunctionCache = {};
    Synth.fm6SynthFunctionCache = {};
    Synth.effectsFunctionCache = Array(1 << 7).fill(undefined);
    Synth.pickedStringFunctionCache = Array(3).fill(undefined);
    Synth.spectrumFunctionCache = [];
    Synth.noiseFunctionCache = [];
    Synth.drumFunctionCache = [];
    Synth.chipFunctionCache = [];
    Synth.pulseFunctionCache = [];
    Synth.supersawFunctionCache = [];
    Synth.harmonicsFunctionCache = [];
    Synth.loopableChipFunctionCache = Array(Config.unisonVoicesMax + 1).fill(undefined);
    Synth.fmSourceTemplate = (`
		const data = synth.tempMonoInstrumentSampleBuffer;
		const sineWave = Config.sineWave;
			
		// I'm adding 1000 to the phase to ensure that it's never negative even when modulated by other waves because negative numbers don't work with the modulus operator very well.
		let operator#Phase       = +((tone.phases[#] - (tone.phases[#] | 0)) + 1000) * ` + Config.sineWaveLength + `;
		let operator#PhaseDelta  = +tone.phaseDeltas[#] * ` + Config.sineWaveLength + `;
		let operator#PhaseDeltaScale = +tone.phaseDeltaScales[#];
		let operator#OutputMult  = +tone.operatorExpressions[#];
		const operator#OutputDelta = +tone.operatorExpressionDeltas[#];
		let operator#Output      = +tone.feedbackOutputs[#];
        const operator#Wave      = tone.operatorWaves[#].samples;
		let feedbackMult         = +tone.feedbackMult;
		const feedbackDelta        = +tone.feedbackDelta;
        let expression = +tone.expression;
		const expressionDelta = +tone.expressionDelta;
		
		const filters = tone.noteFilters;
		const filterCount = tone.noteFilterCount|0;
		let initialFilterInput1 = +tone.initialNoteFilterInput1;
		let initialFilterInput2 = +tone.initialNoteFilterInput2;
		const applyFilters = Synth.applyFilters;
		
		const stopIndex = bufferIndex + roundedSamplesPerTick;
		for (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {
				// INSERT OPERATOR COMPUTATION HERE
				const fmOutput = (/*operator#Scaled*/); // CARRIER OUTPUTS
				
			const inputSample = fmOutput;
			const sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);
			initialFilterInput2 = initialFilterInput1;
			initialFilterInput1 = inputSample;
				
				feedbackMult += feedbackDelta;
				operator#OutputMult += operator#OutputDelta;
				operator#Phase += operator#PhaseDelta;
			operator#PhaseDelta *= operator#PhaseDeltaScale;
			
			const output = sample * expression;
			expression += expressionDelta;

			data[sampleIndex] += output;
			}
			
			tone.phases[#] = operator#Phase / ` + Config.sineWaveLength + `;
			tone.phaseDeltas[#] = operator#PhaseDelta / ` + Config.sineWaveLength + `;
			tone.operatorExpressions[#] = operator#OutputMult;
		    tone.feedbackOutputs[#] = operator#Output;
		    tone.feedbackMult = feedbackMult;
		    tone.expression = expression;
			
		synth.sanitizeFilters(filters);
		tone.initialNoteFilterInput1 = initialFilterInput1;
		tone.initialNoteFilterInput2 = initialFilterInput2;
		`).split("\n");
    Synth.operatorSourceTemplate = (`
				const operator#PhaseMix = operator#Phase/* + operator@Scaled*/;
				const operator#PhaseInt = operator#PhaseMix|0;
				const operator#Index    = operator#PhaseInt & ` + Config.sineWaveMask + `;
                const operator#Sample   = operator#Wave[operator#Index];
                operator#Output         = operator#Sample + (operator#Wave[operator#Index + 1] - operator#Sample) * (operator#PhaseMix - operator#PhaseInt);
				const operator#Scaled   = operator#OutputMult * operator#Output;
		`).split("\n");


    class oscilloscopeCanvas {
        constructor(canvas, scale = 1) {
            this.canvas = canvas;
            this.scale = scale;
            this._EventUpdateCanvas = function (directlinkL, directlinkR) {
                if (directlinkR) {
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = ColorConfig.getComputed("--editor-background");
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = ColorConfig.getComputed("--oscilloscope-line-L");
                    for (let i = directlinkL.length - 1; i >= directlinkL.length - 1 - (canvas.width / scale); i--) {
                        let x = i - (directlinkL.length - 1) + (canvas.width / scale);
                        let yl = (directlinkL[i] * (canvas.height / scale / 2) + (canvas.height / scale / 2));
                        ctx.fillRect((x - 1) * scale, (yl - 1) * scale, 1 * scale, 1.5 * scale);
                        if (x == 0)
                            break;
                    }
                    ctx.fillStyle = ColorConfig.getComputed("--oscilloscope-line-R");
                    for (let i = directlinkR.length - 1; i >= directlinkR.length - 1 - (canvas.width / scale); i--) {
                        let x = i - (directlinkR.length - 1) + (canvas.width / scale);
                        let yr = (directlinkR[i] * (canvas.height / scale / 2) + (canvas.height / scale / 2));
                        ctx.fillRect((x - 1) * scale, (yr - 1) * scale, 1 * scale, 1.5 * scale);
                        if (x == 0)
                            break;
                    }
                }
            };
            events.listen("oscilloscopeUpdate", this._EventUpdateCanvas);
        }
    }

class SongPlayerLayout {
        static setLayout(layout) {
            this._styleElement.textContent = this._spLayoutMap[layout];
        }
    }
    SongPlayerLayout.layoutLookup = new Map();
    SongPlayerLayout._spLayoutMap = { 
        "classic": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        height: 0;
        display: none;
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        } 
        `,
        "top": `
        body {
            display: flex;
            flex-direction: column-reverse;
            height: 100%;
        }
        .piano {
        height: 0;
        display: none;
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }    
        `,
        "shitbox4": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        height: 0;
        display: none;
        }
        div.visualizer {
            transform: skew(30deg,20deg) scale(0.5);
            }
        .timelineContainer {
            transform: translateX(0);
        }    
        `,
        "boxbeep": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        height: 0;
        display: none;
        }
        div.visualizer {
            transform: scale(-1);
        }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
        "piano": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
        "vertical": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        min-height: 140px;
        display: flex;
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
        "vertical-reversed": `
        body {
            display: flex;
            flex-direction: column-reverse;
            height: 100%;
        }
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        min-height: 140px;
        display: flex;
        }
        div.visualizer {
            transform: scale(-1);
        }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
        "middle": `
        .songPlayerContainer {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .piano {
        height: 0;
        display: none;
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(50vw);
        }
        `,
    };
    SongPlayerLayout._styleElement = document.head.appendChild(HTML.style({ type: "text/css" }));
    
    const { a, button, div, h1, input, canvas, form, label, h2 } = HTML;
    const { svg, circle, rect, path } = SVG;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent); 
    document.head.appendChild(HTML.style({ type: "text/css" }, `
		:root {
		--button-size: 26px;
		--settings-area-width: 192px;
		--play-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path d="M -5 -8 L -5 8 L 8 0 z" fill="gray"/></svg>');
		--pause-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><rect x="-5" y="-7" width="4" height="14" fill="gray"/><rect x="3" y="-7" width="4" height="14" fill="gray"/></svg>');
		--record-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><circle cx="0" cy="0" r="6" fill="gray"/></svg>');
		--stop-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><rect x="-6" y="-6" width="12" height="12" fill="gray"/></svg>');
		--prev-bar-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><rect x="-6" y="-6" width="2" height="12" fill="gray"/><path d="M 6 -6 L 6 6 L -3 0 z" fill="gray"/></svg>');
		--next-bar-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><rect x="4" y="-6" width="2" height="12" fill="gray"/><path d="M -6 -6 L -6 6 L 3 0 z" fill="gray"/></svg>');
		--volume-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M 4 16 L 4 10 L 8 10 L 13 5 L 13 21 L 8 16 z M 15 11 L 16 10 A 7.2 7.2 0 0 1 16 16 L 15 15 A 5.8 5.8 0 0 0 15 12 z M 18 8 L 19 7 A 11.5 11.5 0 0 1 19 19 L 18 18 A 10.1 10.1 0 0 0 18 8 z" fill="gray"/></svg>');
		--unmuted-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="3 3 20 20"><path d="M 4 16 L 4 10 L 8 10 L 13 5 L 13 21 L 8 16 z M 15 11 L 16 10 A 7.2 7.2 0 0 1 16 16 L 15 15 A 5.8 5.8 0 0 0 15 12 z M 18 8 L 19 7 A 11.5 11.5 0 0 1 19 19 L 18 18 A 10.1 10.1 0 0 0 18 8 z" fill="gray"/></svg>');
		--muted-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="3 3 20 20"><path d="M 4 16 L 4 10 L 8 10 L 13 5 L 13 21 L 8 16 z" fill="gray"/></svg>');
		--menu-down-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path d="M -4 -2 L 4 -2 L 0 3 z" fill="gray"/></svg>');
		--select-arrows-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path d="M -4 -3 L 4 -3 L 0 -8 z M -4 3 L 4 3 L 0 8 z" fill="gray"/></svg>');
		--file-page-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-5 -21 26 26"><path d="M 2 0 L 2 -16 L 10 -16 L 14 -12 L 14 0 z M 3 -1 L 13 -1 L 13 -11 L 9 -11 L 9 -15 L 3 -15 z" fill="gray"/></svg>');
		--edit-pencil-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-5 -21 26 26"><path d="M 0 0 L 1 -4 L 4 -1 z M 2 -5 L 10 -13 L 13 -10 L 5 -2 zM 11 -14 L 13 -16 L 14 -16 L 16 -14 L 16 -13 L 14 -11 z" fill="gray"/></svg>');
		--preferences-gear-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path d="M 5.78 -1.6 L 7.93 -0.94 L 7.93 0.94 L 5.78 1.6 L 4.85 3.53 L 5.68 5.61 L 4.21 6.78 L 2.36 5.52 L 0.27 5.99 L -0.85 7.94 L -2.68 7.52 L -2.84 5.28 L -4.52 3.95 L -6.73 4.28 L -7.55 2.59 L -5.9 1.07 L -5.9 -1.07 L -7.55 -2.59 L -6.73 -4.28 L -4.52 -3.95 L -2.84 -5.28 L -2.68 -7.52 L -0.85 -7.94 L 0.27 -5.99 L 2.36 -5.52 L 4.21 -6.78 L 5.68 -5.61 L 4.85 -3.53 M 2.92 0.67 L 2.92 -0.67 L 2.35 -1.87 L 1.3 -2.7 L 0 -3 L -1.3 -2.7 L -2.35 -1.87 L -2.92 -0.67 L -2.92 0.67 L -2.35 1.87 L -1.3 2.7 L -0 3 L 1.3 2.7 L 2.35 1.87 z" fill="gray"/></svg>');
		--customize-dial-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"> \
				<g transform="translate(0,1)" fill="gray"> \
					<circle cx="0" cy="0" r="6.5" stroke="gray" stroke-width="1" fill="none"/> \
					<rect x="-1" y="-5" width="2" height="4" transform="rotate(30)"/> \
					<circle cx="-7.79" cy="4.5" r="0.75"/> \
					<circle cx="-9" cy="0" r="0.75"/> \
					<circle cx="-7.79" cy="-4.5" r="0.75"/> \
					<circle cx="-4.5" cy="-7.79" r="0.75"/> \
					<circle cx="0" cy="-9" r="0.75"/> \
					<circle cx="4.5" cy="-7.79" r="0.75"/> \
					<circle cx="7.79" cy="-4.5" r="0.75"/> \
					<circle cx="9" cy="0" r="0.75"/> \
					<circle cx="7.79" cy="4.5" r="0.75"/> \
				</g> \
			</svg>');
		--instrument-copy-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-5 -21 26 26"><path d="M 0 -15 L 1 -15 L 1 0 L 13 0 L 13 1 L 0 1 L 0 -15 z M 2 -1 L 2 -17 L 10 -17 L 14 -13 L 14 -1 z M 3 -2 L 13 -2 L 13 -12 L 9 -12 L 9 -16 L 3 -16 z" fill="currentColor"></path></svg>');
		--instrument-paste-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M 8 18 L 6 18 L 6 5 L 17 5 L 17 7 M 9 8 L 16 8 L 20 12 L 20 22 L 9 22 z" stroke="currentColor" fill="none"></path><path d="M 9 3 L 14 3 L 14 6 L 9 6 L 9 3 z M 16 8 L 20 12 L 16 12 L 16 8 z" fill="currentColor"></path></svg>');
		--export-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="gray" d="M -8 3 L -8 8 L 8 8 L 8 3 L 6 3 L 6 6 L -6 6 L -6 3 z M 0 2 L -4 -2 L -1 -2 L -1 -8 L 1 -8 L 1 -2 L 4 -2 z"/></svg>');
		--close-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="gray" d="M -7.07 -5.66 L -5.66 -7.07 L 0 -1.4 L 5.66 -7.07 L 7.07 -5.66 L 1.4 0 L 7.07 5.66 L 5.66 7.07 L 0 1.4 L -5.66 7.07 L -7.07 5.66 L -1.4 0 z"/></svg>');
		--add-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="gray" d="M -8 -1 L -1 -1 L -1 -8  L 1 -8 L 1 -1 L 8 -1 L 8 1 L 1 1 L 1 8 L -1 8 L -1 1 L -8 1 z"/></svg>');
		--zoom-in-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-10 -10 20 20"><circle cx="-1" cy="-1" r="6" stroke-width="2" stroke="gray" fill="none"></circle><path stroke="gray" stroke-width="2" d="M 3 3 L 7 7 M -1 -4 L -1 2 M -4 -1 L 2 -1" fill="none"></path></svg>');
		--zoom-out-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-10 -10 20 20"><circle cx="-1" cy="-1" r="6" stroke-width="2" stroke="gray" fill="none"></circle><path stroke="gray" stroke-width="2" d="M 3 3 L 7 7 M -4 -1 L 2 -1" fill="none"></path></svg>');
		--undo-symbol: url("https://choptop84.github.io/abyssbox-app/icon-undo.png");
		--redo-symbol: url("https://choptop84.github.io/abyssbox-app/icon-redo.png");
		--copy-symbol: url("https://choptop84.github.io/abyssbox-app/icon-copy.png");
		--paste-symbol: url("https://choptop84.github.io/abyssbox-app/icon-paste.png");
		--insert-channel-symbol: url("https://choptop84.github.io/abyssbox-app/icon-insertChannel.png");
		--delete-channel-symbol: url("https://choptop84.github.io/abyssbox-app/icon-deleteChannel.png");
		--select-all-symbol: url("https://choptop84.github.io/abyssbox-app/icon-SelectAll.png");
		--duplicate-symbol: url("https://choptop84.github.io/abyssbox-app/icon-duplicate.png");
		--notes-up-symbol: url("https://choptop84.github.io/abyssbox-app/moveNotesUp.png");
		--notes-down-symbol: url("https://choptop84.github.io/abyssbox-app/moveNotesDown.png");
		--loop-bar-symbol: url("https://choptop84.github.io/abyssbox-app/icon-singleBarLoop.png");
		--fullscreen-symbol: url("https://choptop84.github.io/abyssbox-app/icon-fullscreen.png");
		--checkmark-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="gray" d="M -9 -2 L -8 -3 L -3 2 L 9 -8 L 10 -7 L -3 8 z"/></svg>');
		--drum-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"> \
				<defs> \
					<linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="0%"> \
						<stop offset="0%" stop-color="%237e3302"/> \
						<stop offset="40%" stop-color="%23ffec6b"/> \
						<stop offset="100%" stop-color="%237e3302"/> \
					</linearGradient> \
					<linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="0%"> \
						<stop offset="0%" stop-color="%23faaf7d"/> \
						<stop offset="15%" stop-color="%23fffba9"/> \
						<stop offset="40%" stop-color="%23ffffe3"/> \
						<stop offset="65%" stop-color="%23fffba9"/> \
						<stop offset="100%" stop-color="%23faaf7d"/> \
					</linearGradient> \
					<radialGradient id="gold3" cx="0%" cy="0%" r="100%"> \
						<stop offset="0%" stop-color="%23ffffe3"/> \
						<stop offset="50%" stop-color="%23ffec6b"/> \
						<stop offset="100%" stop-color="%237e3302"/> \
					</radialGradient> \
					<linearGradient id="red" x1="0%" y1="0%" x2="100%" y2="0%"> \
						<stop offset="0%" stop-color="%23641919"/> \
						<stop offset="40%" stop-color="%23cd2c2c"/> \
						<stop offset="100%" stop-color="%23641919"/> \
					</linearGradient> \
					<radialGradient id="membrane"> \
						<stop offset="10%" stop-color="%23cccccc" /> \
						<stop offset="90%" stop-color="%23f6f6f7" /> \
						<stop offset="100%" stop-color="%23999" /> \
					</radialGradient> \
				</defs> \
				<ellipse cx="16" cy="26" rx="16" ry="14" fill="rgba(0,0,0,0.5)"/> \
				<ellipse cx="16" cy="25" rx="16" ry="14" fill="url(%23gold1)"/> \
				<rect x="0" y="23" width="32" height="2" fill="url(%23gold1)"/> \
				<ellipse cx="16" cy="23" rx="16" ry="14" fill="url(%23gold2)"/> \
				<ellipse cx="16" cy="23" rx="15" ry="13" fill="url(%23red)"/> \
				<rect x="1" y="17" width="30" height="6" fill="url(%23red)"/> \
				<rect x="5" y="27" width="1" height="5" rx="0.5" fill="rgba(0,0,0,0.5)"/> \
				<rect x="15" y="31" width="2" height="5" rx="1" fill="rgba(0,0,0,0.5)"/> \
				<rect x="26" y="27" width="1" height="5" rx="0.5" fill="rgba(0,0,0,0.5)"/> \
				<rect x="5" y="26" width="1" height="5" rx="0.5" fill="url(%23gold3)"/> \
				<rect x="15" y="30" width="2" height="5" rx="1" fill="url(%23gold3)"/> \
				<rect x="26" y="26" width="1" height="5" rx="0.5" fill="url(%23gold3)"/> \
				<ellipse cx="16" cy="18" rx="15" ry="13" fill="rgba(0,0,0,0.5)"/> \
				<ellipse cx="16" cy="16" rx="16" ry="14" fill="url(%23gold1)"/> \
				<rect x="0" y="14" width="32" height="2" fill="url(%23gold1)"/> \
				<ellipse cx="16" cy="14" rx="16" ry="14" fill="url(%23gold2)"/> \
				<ellipse cx="16" cy="14" rx="15" ry="13" fill="url(%23membrane)"/> \
			</svg>');
		--piano-key-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="15" preserveAspectRatio="none" viewBox="0 -1 32 15"> \
				<defs> \
					<linearGradient id="shadow" x1="0%" y1="0%" x2="100%" y2="0%"> \
						<stop offset="0%" stop-color="rgba(0,0,0,0.5)"/> \
						<stop offset="100%" stop-color="transparent"/> \
					</linearGradient> \
				</defs> \
				<rect x="-1" y="1" width="31" height="1" rx="0.6" fill="rgba(255,255,255,0.4)"/> \
				<path d="M -1 11 L 30 11 L 30 2 L 33 -1 L 33 14 L -1 14 z" fill="rgba(0,0,0,0.7)"/> \
				<rect x="-1" y="-1" width="19" height="15" fill="url(%23shadow)"/> \
			</svg>');
	--mod-key-symbol: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="80" preserveAspectRatio="none" viewBox="0 -1 32 80"> \
				<defs> \
					<linearGradient id="shadow" x1="0%" y1="0%" x2="100%" y2="0%"> \
						<stop offset="0%" stop-color="rgba(0,0,0,0.4)"/> \
						<stop offset="100%" stop-color="transparent"/> \
					</linearGradient> \
				</defs> \
				<rect x="-1" y="1" width="31" height="1" rx="0.6" fill="rgba(255,255,255,0.2)"/> \
				<path d="M -1 76 L 30 76 L 30 1 L 33 -1 L 33 80 L -1 80 z" fill="rgba(0,0,0,0.7)"/> \
				<rect x="-1" y="-1" width="19" height="80" fill="url(%23shadow)"/> \
			</svg>');
	}

	body {
		color: ${ColorConfig.primaryText};
		background: ${ColorConfig.songPlayerMargin};
	}
	.songPlayerContainer {
		display:flex; 
		flex-direction: column;
		height: 100%;
	}
	.piano {
	display: none;
	min-height = 0px;
	}
	.layout-option {
		width: 25%;
	}
	.timeline-bar-progress {
		background: var(--progress-bar, var(--text-selection, rgb(0, 255, 0)));
	}
	.layout-option input:checked ~ * {
		color:white !important;
	}
	.layout-option:has(input:checked) {
    opacity: 1 !important;
 }
	h1 {
		font-weight: bold;
		font-size: 14px;
		line-height: 22px;
		text-align: initial;
		margin: 0;
	}
	button.closePrompt::before {
		content: "";
		position: absolute;
		width: 32px;
		height: 32px;
		left: 0;
		top: 0;
		pointer-events: none;
		background: currentColor;
		mask-image: var(--close-symbol);
		mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-image: var(--close-symbol);
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
	}
	a {
		font-weight: bold;
		font-size: 12px;
		line-height: 22px;
		white-space: nowrap;
		color: ${ColorConfig.linkAccent};
	}
	button {
		margin: 0;
		padding: 0;
		position: relative;
		border: none;
		border-radius: 5px;
		background: ${ColorConfig.uiWidgetBackground};
		color: ${ColorConfig.primaryText};
		cursor: pointer;
		font-size: 14px;
		font-family: inherit;
	}
	button:hover, button:focus {
		background: ${ColorConfig.uiWidgetFocus};
	}
	.playButton, .pauseButton {
		padding-left: 24px;
		padding-right: 6px;
	}
	.playButton::before {
		content: "";
		position: absolute;
		left: 6px;
		top: 50%;
		margin-top: -6px;
		width: 12px;
		height: 12px;
		pointer-events: none;
		background: ${ColorConfig.primaryText};
		-webkit-mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-6 -6 12 12"><path d="M 6 0 L -5 6 L -5 -6 z" fill="gray"/></svg>');
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-6 -6 12 12"><path d="M 6 0 L -5 6 L -5 -6 z" fill="gray"/></svg>');
		mask-repeat: no-repeat;
		mask-position: center;
	}
	.pauseButton::before {
		content: "";
		position: absolute;
		left: 6px;
		top: 50%;
		margin-top: -6px;
		width: 12px;
		height: 12px;
		pointer-events: none;
		background: ${ColorConfig.primaryText};
		-webkit-mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-6 -6 12 12"><rect x="-5" y="-6" width="3" height="12" fill="gray"/><rect x="2"  y="-6" width="3" height="12" fill="gray"/></svg>');
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-6 -6 12 12"><rect x="-5" y="-6" width="3" height="12" fill="gray"/><rect x="2"  y="-6" width="3" height="12" fill="gray"/></svg>');
		mask-repeat: no-repeat;
		mask-position: center;
	}
	
	input[type=range] {
		-webkit-appearance: none;
		appearance: none;
		height: 16px;
		margin: 0;
		cursor: pointer;
		background-color: ${ColorConfig.editorBackground};
		touch-action: pan-y;
	}
	input[type=range]:focus {
		outline: none;
	}
	input[type=range]::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: ${ColorConfig.uiWidgetBackground};
	}
	input[type=range]::-webkit-slider-thumb {
		height: 16px;
		width: 4px;
		border-radius: 2px;
		background: ${ColorConfig.primaryText};
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -6px;
	}
	input[type=range]:focus::-webkit-slider-runnable-track, input[type=range]:hover::-webkit-slider-runnable-track {
		background: ${ColorConfig.uiWidgetFocus};
	}
	input[type=range]::-moz-range-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: ${ColorConfig.uiWidgetBackground};
	}
	input[type=range]:focus::-moz-range-track, input[type=range]:hover::-moz-range-track  {
		background: ${ColorConfig.uiWidgetFocus};
	}
	input[type=range]::-moz-range-thumb {
		height: 16px;
		width: 4px;
		border-radius: 2px;
		border: none;
		background: ${ColorConfig.primaryText};
		cursor: pointer;
	}
	input[type=range]::-ms-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: ${ColorConfig.uiWidgetBackground};
		border-color: transparent;
	}
	input[type=range]:focus::-ms-track, input[type=range]:hover::-ms-track {
		background: ${ColorConfig.uiWidgetFocus};
	}
	input[type=range]::-ms-thumb {
		height: 16px;
		width: 4px;
		border-radius: 2px;
		background: ${ColorConfig.primaryText};
		cursor: pointer;
	} 
`));
    const colorTheme = getLocalStorage("colorTheme");
    ColorConfig.setTheme(colorTheme === null ? ColorConfig.defaultTheme : colorTheme);
    let prevHash = null;
    let id = ((Math.random() * 0xffffffff) >>> 0).toString(16);
    let pauseButtonDisplayed = false;
    let animationRequest;
    let zoomEnabled = false;
    let zoomEnabled2 = true;
    let timelineWidth = 1;
    let outVolumeHistoricTimer = 0;
    let outVolumeHistoricCap = 0;
    const synth = new Synth();
    let oscilloscope = new oscilloscopeCanvas(canvas({ width: 400, height: 64, style: `width:8pc; height:45px; border: 2px solid ${ColorConfig.uiWidgetBackground};margin:2px; position: static;`, id: "oscilloscopeAll" }), 1);
    function resizeOscilloscope(){
    if(innerWidth>innerHeight*1.1){
     oscilloscope.canvas.width=800;
     oscilloscope.canvas.style= `width:400px; height:45px; border: 2px solid ${ColorConfig.uiWidgetBackground};margin:2px; position: static;`
    }else{
     oscilloscope.canvas.width = 400;
     oscilloscope.canvas.style = `width:8pc; height:45px; border: 2px solid ${ColorConfig.uiWidgetBackground};margin:2px; position: static;`
    };
    }
    window.addEventListener("resize",()=>{resizeOscilloscope()})
    const showOscilloscope = getLocalStorage("showOscilloscope") != "false";
    if (!showOscilloscope) {
        oscilloscope.canvas.style.display = "none";
        synth.oscEnabled = false;
    }
    let titleText = h1({ style: "flex-grow: 1; margin: 0 1px; margin-left: 10px; overflow: hidden;" }, "");
let layoutStuffs = button({
			class: "songPlayerLayoutsButton",
			style: "margin: 0 1px; height: auto; padding:3px; width: 42px !important; border-radius:0px; display: block;"
},"");

layoutStuffs.innerHTML = `
<svg style="width:30px; height:30px; fill: none; stroke: var(--primary-text); stroke-width:1;" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" role="img" aria-hidden="true">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.25 3L21 3.75V20.25L20.25 21H3.75L3 20.25V3.75L3.75 3H20.25ZM19.5 4.5L4.5 4.5L4.5 19.5H8.25L8.25 9.75H4.5V8.25H8.25H9.75H19.5V4.5ZM19.5 9.75H9.75L9.75 19.5H19.5V9.75Z" fill="var(--primary-text)" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

    let editLink = a({ target: "_top", style: "margin: 0 4px;" }, "✎ Edit");
    let copyLink = a({ href: "javascript:void(0)", style: "margin: 0 4px;" }, "⎘ Copy URL");
    let shareLink = a({ href: "javascript:void(0)", style: "margin: 0 4px;" }, "⤳ Share");
    let fullscreenLink = a({ target: "_top", style: "margin: 0 4px;" }, "⇱ Fullscreen");
    let draggingPlayhead = false;
    const playButton = button({ style: "width: 100%; height: 100%; max-height: 50px;" });
    const playButtonContainer = div({ style: "flex-shrink: 0; display: flex; padding: 2px; width: 80px; height: 100%; box-sizing: border-box; align-items: center;" }, playButton);
    const loopIcon = path({ d: "M 4 2 L 4 0 L 7 3 L 4 6 L 4 4 Q 2 4 2 6 Q 2 8 4 8 L 4 10 Q 0 10 0 6 Q 0 2 4 2 M 8 10 L 8 12 L 5 9 L 8 6 L 8 8 Q 10 8 10 6 Q 10 4 8 4 L 8 2 Q 12 2 12 6 Q 12 10 8 10 z" });
    const loopButton = button({ title: "loop", style: "background: none; flex: 0 0 12px; margin: 0 3px; width: 12px; height: 12px; display: flex;" }, svg({ width: 12, height: 12, viewBox: "0 0 12 12" }, loopIcon));
    const volumeIcon = svg({ style: "flex: 0 0 12px; margin: 0 1px; width: 12px; height: 12px;", viewBox: "0 0 12 12" }, path({ fill: ColorConfig.uiWidgetBackground, d: "M 1 9 L 1 3 L 4 3 L 7 0 L 7 12 L 4 9 L 1 9 M 9 3 Q 12 6 9 9 L 8 8 Q 10.5 6 8 4 L 9 3 z" }));
    const volumeSlider = input({ title: "volume", type: "range", value: "75", min: 0, max: "75", step: 1, style: "width: 12vw; max-width: 100px; margin: 0 1px;" }); 
    const zoomIcon = svg({ width: 12, height: 12, viewBox: "0 0 12 12" }, circle({ cx: "5", cy: "5", r: "4.5", "stroke-width": "1", stroke: "currentColor", fill: "none" }), path({ stroke: "currentColor", "stroke-width": "2", d: "M 8 8 L 11 11 M 5 2 L 5 8 M 2 5 L 8 5", fill: "none" }));
    const zoomIcon2 = svg(
  { width: 12, height: 12, viewBox: "0 0 12 12" },
  circle({ cx: "5", cy: "5", r: "4.5", "stroke-width": "1", stroke: "currentColor", fill: "none" }),
  path({ stroke: "currentColor", "stroke-width": "3", d: "M 8 8 L 11 11 M 5 2 L 5 8 M 2 5 L 8 5", fill: "none" })
);
    const zoomButton = button({ title: "zoom", style: "background: none; flex: 0 0 12px; margin: 0 3px; width: 12px; height: 12px; display: flex;" }, zoomIcon);
    const zoomButton2 = button({ title: "zoom", style: "background: none; flex: 0 0 12px; margin: 0 3px; width: 12px; height: 12px; display: flex;" }, zoomIcon2);
    const timeline = svg({ style: "min-width: 0; min-height: 0; touch-action: pan-y pinch-zoom;" });
    const playhead = div({ style: `position: absolute; left: 0; top: 0; width: 2px; height: 100%; background: ${ColorConfig.playhead}; pointer-events: none;` });
    const timelineContainer = div({  class:"timelineContainer" ,style: "display: flex; flex-grow: 1; flex-shrink: 1; position: relative;" }, timeline, playhead);
    const visualizationContainer = div({ class: "visualizer",style: "display: flex; flex-grow: 1; flex-shrink: 1; height: 0; position: relative; align-items: center; overflow: hidden;" }, timelineContainer);
    let noteFlashElementsPerBar;
    let currentNoteFlashElements = [];
    let currentNoteFlashBar = -1;
    const notesFlashWhenPlayed = getLocalStorage("notesFlashWhenPlayed") == "true";
    const outVolumeBarBg = SVG.rect({ "pointer-events": "none", width: "90%", height: "50%", x: "5%", y: "25%", fill: ColorConfig.uiWidgetBackground });
    const outVolumeBar = SVG.rect({ "pointer-events": "none", height: "50%", width: "0%", x: "5%", y: "25%", fill: "url('#volumeGrad2')" });
    const outVolumeCap = SVG.rect({ "pointer-events": "none", width: "2px", height: "50%", x: "5%", y: "25%", fill: ColorConfig.uiWidgetFocus });
    const stop1 = SVG.stop({ "stop-color": "lime", offset: "60%" });
    const stop2 = SVG.stop({ "stop-color": "orange", offset: "90%" });
    const stop3 = SVG.stop({ "stop-color": "red", offset: "100%" });
    const gradient = SVG.linearGradient({ id: "volumeGrad2", gradientUnits: "userSpaceOnUse" }, stop1, stop2, stop3);
    const defs = SVG.defs({}, gradient);
    const volumeBarContainer = SVG.svg({ style: `touch-action: none; overflow: hidden; margin: auto;`, width: "160px", height: "10px", preserveAspectRatio: "none" }, defs, outVolumeBarBg, outVolumeBar, outVolumeCap);
    const sampleLoadingBar = div({ style: `width: 0%; height: 100%; background-color: ${ColorConfig.indicatorPrimary};` });
    const sampleLoadingBarContainer = div({ class: `sampleLoadingContainer`, style: `overflow: hidden; margin: auto; width: 90%; height: 50%; background-color: var(--empty-sample-bar, ${ColorConfig.indicatorSecondary});`, preserveAspectRatio: "none" }, sampleLoadingBar);
    const sampleLoadingStatusContainer = div({}, div({ class: "selectRow", style: "overflow: hidden; margin: auto; width: 160px; height: 10px; " }, sampleLoadingBarContainer));
    const volumeBarContainerDiv = div({ class: `volBarContainer`, style: "display:flex; flex-direction:column; touch-action: none; overflow: hidden; margin: auto" }, volumeBarContainer, sampleLoadingStatusContainer);
    

    const closePrompt = button({ class: "closePrompt", style: "width: 32px; height: 32px; float: right; position: absolute;top: 8px;right: 8px;" });
    const _okayButton = button({ class: "okayButton", style: "width:45%; height: 32px;" }, "Okay");
    const _form = form({ style: "display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;" }, label({ class: "layout-option", style: "width:90px; color: var(--secondary-text); opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "classic", style: "display:none;" }), SVG(`\
					<svg viewBox="-1 -1 28 22">
					<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
					<rect x="2" y="3" width="22" height="1" fill="currentColor"/>
					<rect x="2" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="23" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="2" y="11" width="22" height="1" fill="currentColor"/>

					<rect x="2" y="5" width="22" height="1" fill="currentColor"/>
					<rect x="2" y="7" width="22" height="1" fill="currentColor"/>
					<rect x="2" y="9" width="22" height="1" fill="currentColor"/>

					<rect x="2" y="15" width="22" height="3" fill="currentColor"/>
					</svg>
				`), div("Classic")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "top", style: "display:none;" }), SVG(`\
					<svg viewBox="-1 -1 28 22">
						<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
						<rect x="2" y="2" width="22" height="3" fill="currentColor"/>

						<rect x="2" y="8" width="22" height="1" fill="currentColor"/>
						<rect x="2" y="9" width="1" height="7" fill="currentColor"/>
						<rect x="23" y="9" width="1" height="7" fill="currentColor"/>
						<rect x="2" y="16" width="22" height="1" fill="currentColor"/>
	
						<rect x="2" y="10" width="22" height="1" fill="currentColor"/>
						<rect x="2" y="12" width="22" height="1" fill="currentColor"/>
						<rect x="2" y="14" width="22" height="1" fill="currentColor"/>
					</svg>
				`), div("Top")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "shitbox4", style: "display:none;" }), SVG(`\
					<svg viewBox="-1 -1 28 22">
						<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
						<rect x="2" y="15" width="22" height="3" fill="currentColor"/>

						<rect x="2" y="2"  width="22" height="1" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
						<rect x="2" y="3"  width="1"  height="5" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
						<rect x="23" y="3" width="1" height="5" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
						<rect x="2" y="8"  width="22" height="1" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
	
						<rect x="2" y="6" width="22" height="1" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
						<rect x="2" y="4" width="22" height="1" fill="currentColor" style="transform: skew(0.1deg,10deg);"/>
					</svg>
				`), div("shitBox4")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "boxbeep", style: "display:none;" }), SVG(`\
				<svg viewBox="-1 -1 28 22">
				<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
					<rect x="2" y="3" width="22" height="1" fill="currentColor"/>
					<rect x="2" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="23" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="2" y="11" width="22" height="1" fill="currentColor"/>

					<rect x="2" y="5" width="18" height="1" fill="currentColor"/>
					<rect x="2" y="7" width="18" height="1" fill="currentColor"/>
					<rect x="2" y="9" width="18" height="1" fill="currentColor"/>

					<rect x="21" y="5" width="1" height="5" fill="currentColor"/>

					<rect x="2" y="15" width="22" height="3" fill="currentColor"/>
				</svg>
				`), div("BoxBeep")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "piano", style: "display:none;" }), SVG(`\
				<svg viewBox="-1 -1 28 22">
					<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
					<rect x="4" y="3" width="20" height="1" fill="currentColor"/>
					<rect x="2" y="3" width="1" height="9" fill="currentColor"/>
					<rect x="23" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="4" y="11" width="20" height="1" fill="currentColor"/>

					<rect x="4" y="5" width="20" height="1" fill="currentColor"/>
					<rect x="4" y="7" width="20" height="1" fill="currentColor"/>
					<rect x="4" y="9" width="20" height="1" fill="currentColor"/>

					<rect x="2" y="15" width="22" height="3" fill="currentColor"/>
					</svg>
				`), div("Music Box")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "vertical", style: "display:none;" }), SVG(`\
				<svg viewBox="-1 -1 28 22">
					<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
					<rect x="2" y="3" width="22" height="1" fill="currentColor"/>
					<rect x="2" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="23" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="2" y="11" width="22" height="1" fill="currentColor"/>

					<rect x="5" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="8" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="12" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="16" y="4" width="1" height="7" fill="currentColor"/>
					<rect x="20" y="4" width="1" height="7" fill="currentColor"/>

					<rect x="2" y="15" width="22" height="3" fill="currentColor"/>
					</svg>
				`), div("Vertical")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "vertical-reversed", style: "display:none;" }), SVG(`\
<svg viewBox="-1 -1 28 22">
  <g transform="rotate(180 13 10)">
    <rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
    <rect x="2" y="3" width="22" height="1" fill="currentColor"/>
    <rect x="2" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="23" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="2" y="11" width="22" height="1" fill="currentColor"/>

    <rect x="5" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="8" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="12" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="16" y="4" width="1" height="7" fill="currentColor"/>
    <rect x="20" y="4" width="1" height="7" fill="currentColor"/>

    <rect x="2" y="15" width="22" height="3" fill="currentColor"/>
  </g>
</svg>
				`), div("Vertical Reversed")), label({ class: "layout-option", style: "width:90px; color: var(--secondary-text);opacity:0.7;" }, input({ type: "radio", name: "spLayout", value: "middle", style: "display:none;" }), SVG(`\
				<svg viewBox="-1 -1 28 22">
				<rect x="0" y="0" width="26" height="20" fill="none" stroke="currentColor" stroke-width="1"/>
				<rect x="4" y="3" width="8" height="1" fill="currentColor"/>

				<rect x="2" y="3" width="1" height="9" fill="currentColor"/>

				<rect x="13" y="3" width="1" height="9" fill="currentColor"/>

				<rect x="23" y="3" width="1" height="9" fill="currentColor"/>

				<rect x="4" y="11" width="8" height="1" fill="currentColor"/>
				<rect x="4" y="5" width="8" height="1" fill="currentColor"/>
				<rect x="4" y="7" width="8" height="1" fill="currentColor"/>
				<rect x="4" y="9" width="8" height="1" fill="currentColor"/>

				<rect x="15" y="3" width="7" height="1" fill="currentColor"/>
				<rect x="15" y="11" width="7" height="1" fill="currentColor"/>
				<rect x="15" y="5" width="7" height="1" fill="currentColor"/>
				<rect x="15" y="7" width="7" height="1" fill="currentColor"/>
				<rect x="15" y="9" width="7" height="1" fill="currentColor"/>

				<rect x="2" y="15" width="22" height="3" fill="currentColor"/>
					</svg>
				`), div("Middle")));
const layoutContainer = div({ class: "prompt noSelection", style: "width: 300px; max-height:50vh; overflow :hidden scroll; margin: auto;text-align: center;background: var(--editor-background);border-radius: 15px;border: 4px solid var(--ui-widget-background);color: var(--primary-text);padding: 20px;display: flex;flex-direction: column;position: absolute;box-shadow: 5px 5px 20px 10px rgba(0,0,0,0.5);" }, div({ class: "promptTitle" }, h2({ class: "layoutExt", style: "text-align: inherit;" }, ""), h2({ class: "layoutTitle" }, "Layout")), _form, div({ style: "margin-top: 1em;" }, _okayButton), closePrompt);
const promptContainer = div({ class: "promptContainer", style: "display:none; backdrop-filter: saturate(1.5) blur(4px); width: 100%; height: 100%; position: fixed; z-index: 999; display: flex; justify-content: center; align-items: center;" });
promptContainer.style.display = "none"; 
document.body.appendChild(promptContainer);
promptContainer.appendChild(layoutContainer);

    const timelineBarProgress = div({ class: `timeline-bar-progress`, style: `overflow: hidden; width: 5%; height: 100%; z-index: 5;` });
    const timelineBar = div({ style: `overflow: hidden; height: 100%; margin: auto; background: var(--ui-widget-background);` }, timelineBarProgress);
    const timelineBarContainer = div({ style: `overflow: hidden; height: 4px; ` }, timelineBar);
    
    const piano = svg({ style: "pointer-events: none; display: block; margin: 0 auto;" });
const pianoContainer = div({ class: "piano", style: "grid-area: piano;" }, piano);
    document.body.appendChild(visualizationContainer);
    document.body.appendChild(pianoContainer);
    document.body.appendChild(timelineBarContainer);
     
    document.body.appendChild(div({ class: "control-center", id: "control-center", style: `flex-shrink: 0; height: 20vh; min-height: 22px; max-height: 70px; display: flex; align-items: center;` }, playButtonContainer, loopButton, volumeIcon, volumeSlider, zoomButton,zoomButton2, volumeBarContainerDiv, oscilloscope.canvas, titleText, layoutStuffs, editLink, copyLink, shareLink, fullscreenLink));
    function setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (error) {
        }
    }
    function getLocalStorage(key) {
        try {
            return localStorage.getItem(key);
        }
        catch (error) {
            return null;
        }
    }
    function removeFromUnorderedArray(array, index) {
        if (array.length < 1) {
            return;
        }
        if (index === array.length - 1) {
            array.pop();
        }
        else if (index >= 0 && index < array.length - 1) {
            const lastElement = array.pop();
            array[index] = lastElement;
        }
    }
    function loadSong(songString, reuseParams) {
        synth.setSong(songString);
        synth.snapToStart();
        const updatedSongString = synth.song.toBase64String();
if (location.href.startsWith("file:///")) {
	let fileFull = "file:///android_asset/WebView/index.html#" + updatedSongString
	editLink.onclick = () => {
  cleanMemoryBeforeNavigation(); 
};
	editLink.href = fileFull;
} else {
	editLink.onclick = () => {
  cleanMemoryBeforeNavigation();  
};
	editLink.href = "./" + (OFFLINE ? "index.html" : "") + "#" + updatedSongString;
}
    }
     
    function hashUpdatedExternally() {
        let myHash = location.hash;
        if (prevHash == myHash || myHash == "")
            return;
        prevHash = myHash;
        if (myHash.charAt(0) == "#") {
            myHash = myHash.substring(1);
        }
        fullscreenLink.href = location.href;
        for (const parameter of myHash.split(/&(?=[a-z]+=)/g)) {
            let equalsIndex = parameter.indexOf("=");
            if (equalsIndex != -1) {
                let paramName = parameter.substring(0, equalsIndex);
                let value = parameter.substring(equalsIndex + 1);
                switch (paramName) {
                    case "song":
                        loadSong(value);
                        if (synth.song) {
                            titleText.textContent = synth.song.title;
                        }
                        break;
                    case "loop":
                        synth.loopRepeatCount = (value != "1") ? 0 : -1;
                        renderLoopIcon();
                        break;
                }
            }
            else {
                loadSong(myHash);
            }
        }
        renderTimeline();
    }
    function onWindowResize() {
        renderTimeline();
    }
    let pauseIfAnotherPlayerStartsHandle = null;
    function pauseIfAnotherPlayerStarts() {
        if (!synth.playing) {
            clearInterval(pauseIfAnotherPlayerStartsHandle);
            return;
        }
        const storedPlayerId = getLocalStorage("playerId");
        if (storedPlayerId != null && storedPlayerId != id) {
            onTogglePlay();
            renderPlayhead();
            clearInterval(pauseIfAnotherPlayerStartsHandle);
        }
    }
    function animate() {
        if (synth.playing) {
            animationRequest = requestAnimationFrame(animate);
            renderPlayhead();
            volumeUpdate();
        }
        if (pauseButtonDisplayed != synth.playing) {
            renderPlayButton();
        }
    }
    function volumeUpdate() {
        if (synth.song == null) {
            outVolumeCap.setAttribute("x", "5%");
            outVolumeBar.setAttribute("width", "0%");
            return;
        }
        outVolumeHistoricTimer--;
        if (outVolumeHistoricTimer <= 0) {
            outVolumeHistoricCap -= 0.03;
        }
        if (synth.song.outVolumeCap > outVolumeHistoricCap) {
            outVolumeHistoricCap = synth.song.outVolumeCap;
            outVolumeHistoricTimer = 50;
        }
        animateVolume(synth.song.outVolumeCap, outVolumeHistoricCap);
        if (!synth.playing) {
            outVolumeCap.setAttribute("x", "5%");
            outVolumeBar.setAttribute("width", "0%");
        }
    }
    function animateVolume(useOutVolumeCap, historicOutCap) {
        outVolumeBar.setAttribute("width", "" + Math.min(144, useOutVolumeCap * 144));
        outVolumeCap.setAttribute("x", "" + (8 + Math.min(144, historicOutCap * 144)));
    }
    function onTogglePlay() {
        if (synth.song != null) {
            if (animationRequest != null)
            cancelAnimationFrame(animationRequest);
            animationRequest = null; 
            if (synth.playing) {
                synth.pause();  
                volumeUpdate();
            }
            else {
                synth.play();
                setLocalStorage("playerId", id);
                animate();
                clearInterval(pauseIfAnotherPlayerStartsHandle);
                pauseIfAnotherPlayerStartsHandle = setInterval(pauseIfAnotherPlayerStarts, 100);
            }
        }
        renderPlayButton();
    }
    function onExitButton() {
        promptContainer.style.display = "none";
    }
    function onLayoutPicked() {
	SongPlayerLayout.setLayout(_form.elements["spLayout"].value);
	promptContainer.style.display = "none";
	window.localStorage.setItem("spLayout", _form.elements["spLayout"].value);
	renderTimeline();
}
    function onToggleLoop() {
        if (synth.loopRepeatCount == -1) {
            synth.loopRepeatCount = 0;
        }
        else {
            synth.loopRepeatCount = -1;
        }
        renderLoopIcon();
    }
    function onVolumeChange() {
        setLocalStorage("volume", volumeSlider.value);
        setSynthVolume();
    }
    function onToggleZoom() {
        zoomEnabled = !zoomEnabled;
        renderZoomIcon();
        renderTimeline();
    }
    function onToggleZoom2() {
 zoomEnabled2 = !zoomEnabled2;
 renderZoomIcon();
 renderTimeline();
}
    function onTimelineMouseDown(event) {
        draggingPlayhead = true;
        onTimelineMouseMove(event);
    }
    function onTimelineMouseMove(event) {
        if (!draggingPlayhead)
            return;
        event.preventDefault();
        onTimelineCursorMove(event.clientX || event.pageX);
    }
    function onTimelineTouchDown(event) {
        draggingPlayhead = true;
        onTimelineTouchMove(event);
    }
    function onTimelineTouchMove(event) {
        onTimelineCursorMove(event.touches[0].clientX);
    }
    function onTimelineCursorMove(mouseX) {
        if (draggingPlayhead && synth.song != null) {
            const boundingRect = visualizationContainer.getBoundingClientRect();
            synth.playhead = synth.song.barCount * (mouseX - boundingRect.left) / (boundingRect.right - boundingRect.left);
            synth.computeLatestModValues();
            renderPlayhead();
        }
    }
    function onTimelineCursorUp() {
        draggingPlayhead = false;
    }
function setSynthVolume() {  
        let volume = Number(volumeSlider.value);
        volume = Math.round(volume*4/3)
        synth.volume = Math.min(1.0, Math.pow(volume / 50.0, 0.5)) * Math.pow(2.0, (volume - 75.0) / 25.0); 
} 
function renderPlayhead() {
 	const maxPer = 144;
 	if (synth.song != null) {
 		let pos = synth.playhead / synth.song.barCount;
 		timelineBarProgress.style.width = Math.round((maxPer * pos / maxPer) * 1000) / 10 + "%";
 		const usePiano = (_form.elements["spLayout"].value == "piano") || (window.localStorage.getItem("spLayout") == "piano");
 		const useMiddle = (_form.elements["spLayout"].value == "middle") || (window.localStorage.getItem("spLayout") == "middle");
 		const useVertical = (_form.elements["spLayout"].value == "vertical") || (window.localStorage.getItem("spLayout") == "vertical") || (_form.elements["spLayout"].value == "vertical-reversed") || (window.localStorage.getItem("spLayout") == "vertical-reversed");
 		if (usePiano) {
 			playhead.style.left = (timelineWidth * pos) + "px";
 			timelineContainer.style.left = "-" + (timelineWidth * pos) + "px";
 			timelineContainer.style.bottom = "0";
 			timelineContainer.style.top = "0";
 		}
 		else if (useMiddle) {
 			playhead.style.left = (timelineWidth * pos) + "px";
 			timelineContainer.style.left = "-" + (timelineWidth * pos) + "px";
 			timelineContainer.style.bottom = "0";
 			timelineContainer.style.top = "0";
 		}
 		else if (useVertical) {
 			const boundingRect = visualizationContainer.getBoundingClientRect();
 			const o = boundingRect.height / 2;
 			playhead.style.left = (timelineWidth * pos) + "px";
 			timelineContainer.style.bottom = "-" + (timelineWidth * pos) + "px";
 			timelineContainer.style.top = (timelineWidth * pos + o) + "px";
 		}
 		else {
 			playhead.style.left = (timelineWidth * pos) + "px";
 			timelineContainer.style.left = "0";
 			timelineContainer.style.bottom = "0";
 			timelineContainer.style.top = "0";
 			const boundingRect = visualizationContainer.getBoundingClientRect();
 			visualizationContainer.scrollLeft = pos * (timelineWidth - boundingRect.width);
 		}
 		if (notesFlashWhenPlayed) {
 			const playheadBar = Math.floor(synth.playhead);
 			const modPlayhead = synth.playhead - playheadBar;
 			const partsPerBar = synth.song.beatsPerBar * Config.partsPerBeat;
 			const noteFlashElementsForThisBar = noteFlashElementsPerBar[playheadBar];
 			if (noteFlashElementsForThisBar != null && playheadBar !== currentNoteFlashBar) {
 				for (var i = currentNoteFlashElements.length - 1; i >= 0; i--) {
 					var element = currentNoteFlashElements[i];
 					const outsideOfCurrentBar = Number(element.getAttribute("note-bar")) !== playheadBar;
 					const isInvisible = element.style.opacity === "0";
 					if (outsideOfCurrentBar && isInvisible) {
 						removeFromUnorderedArray(currentNoteFlashElements, i);
 					}
 				}
 				for (var i = 0; i < noteFlashElementsForThisBar.length; i++) {
 					var element = noteFlashElementsForThisBar[i];
 					currentNoteFlashElements.push(element);
 				}
 			}
 			const kc = piano.children.length;
 			for (let i = 0; i < kc; i++) {
 				const k = piano.children[i];
 				const kf = k.getAttribute("original-fill");
 				k.setAttribute("fill", kf);
 			}
 			if (currentNoteFlashElements != null) {
 				for (var i = 0; i < currentNoteFlashElements.length; i++) {
 					var element = currentNoteFlashElements[i];
 					const noteStart = Number(element.getAttribute("note-start")) / partsPerBar;
 					const noteEnd = Number(element.getAttribute("note-end")) / partsPerBar;
 					const noteBar = Number(element.getAttribute("note-bar"));
 					const p = Number(element.getAttribute("note-pitch"));
 					const isNoise = element.getAttribute("note-noise") === "true";
 					const k = piano.children[p];
 					const kf2 = element.getAttribute("note-color");
 					if ((modPlayhead >= noteStart) && (noteBar == playheadBar)) {
 						const dist = noteEnd - noteStart;
 						const opacity = (1 - (((modPlayhead - noteStart) - (dist / 2)) / (dist / 2)));
 						element.style.opacity = String(opacity);
 						if (!isNoise)
 							if (opacity > 0.05)
 								k === null || k === void 0 ? void 0 : k.setAttribute("fill", kf2);
 					}
 					else {
 						element.style.opacity = "0";
 					}
 				}
 			}
 			currentNoteFlashBar = playheadBar;
 		}
 	}
 }
function renderTimeline() {
    	timeline.innerHTML = "";
    	if (synth.song == null)
    		return;
    	const boundingRect = visualizationContainer.getBoundingClientRect();
    	let timelineHeight;
    	let windowOctaves;
    	let windowPitchCount;
    	const useVertical = (_form.elements["spLayout"].value == "vertical") || (window.localStorage.getItem("spLayout") == "vertical") || (_form.elements["spLayout"].value == "vertical-reversed") || (window.localStorage.getItem("spLayout") == "vertical-reversed");
if (zoomEnabled2) {
	timelineHeight = useVertical ? boundingRect.width : boundingRect.height;
	windowOctaves = Math.max(1, Math.min(Config.pitchOctaves, Math.round(timelineHeight / (12 * 2))));
	windowPitchCount = windowOctaves * 12 + 1;
	const semitoneHeight = (timelineHeight - 1) / windowPitchCount;
	const zoomFactorX = 6;
	const targetBeatWidth = Math.max(8, semitoneHeight * 4 * zoomFactorX);
	timelineWidth = Math.max(boundingRect.width, targetBeatWidth * synth.song.barCount * synth.song.beatsPerBar);
	
	if (useVertical) {
		timelineContainer.style.transform = `translateX(-${timelineWidth / 2}px) rotate(-90deg) translateX(${timelineWidth / 2}px) translateY(${timelineHeight / 2}px) scaleY(-1)`;
		pianoContainer.style.minHeight = "140px";
		if (isMobile) {
			pianoContainer.style.display = "none";
			pianoContainer.style.minHeight = "0px";
		}
		timelineContainer.style.left = "0px";
	} else {
		timelineContainer.style.transform = '';
		pianoContainer.style.minHeight = "0px";
	}
}else 
    	if (zoomEnabled) {
    		timelineHeight = useVertical ? boundingRect.width : boundingRect.height;
    		windowOctaves = Math.max(1, Math.min(Config.pitchOctaves, Math.round(timelineHeight / (12 * 2))));
    		windowPitchCount = windowOctaves * 12 + 1;
    		const semitoneHeight = (timelineHeight - 1) / windowPitchCount;
    		const targetBeatWidth = Math.max(8, semitoneHeight * 4);
    		timelineWidth = Math.max(boundingRect.width, targetBeatWidth * synth.song.barCount * synth.song.beatsPerBar);
    		if (useVertical) {
    			timelineContainer.style.transform = `translateX(-${timelineWidth / 2}px) rotate(-90deg) translateX(${timelineWidth / 2}px) translateY(${timelineHeight / 2}px) scaleY(-1)`;
    			pianoContainer.style.minHeight = "140px";
    			if (isMobile) {
    				pianoContainer.style.display = "none";
    				pianoContainer.style.minHeight = "0px";
    			}
    			timelineContainer.style.left = "0px";
    		}
    		else {
    			timelineContainer.style.transform = '';
    			pianoContainer.style.minHeight = "0px";
    		}
    	}
    	else {
    		timelineWidth = boundingRect.width;
    		const targetSemitoneHeight = Math.max(1, timelineWidth / (synth.song.barCount * synth.song.beatsPerBar) / 6.0);
    		timelineHeight = Math.min(boundingRect.height, targetSemitoneHeight * (Config.maxPitch + 1) + 1);
    		windowOctaves = Math.max(3, Math.min(Config.pitchOctaves, Math.round(timelineHeight / (12 * targetSemitoneHeight))));
    		windowPitchCount = windowOctaves * 12 + 1;
    		if (useVertical) {
    			timelineContainer.style.transform = `translateX(-${timelineWidth / 2}px) rotate(-90deg) translateX(${timelineWidth / 2}px) translateY(${timelineWidth / 2}px) scaleY(-1)`;
    			pianoContainer.style.height = "0";
    			pianoContainer.style.minHeight = "0";
    			if (isMobile) {
    				pianoContainer.style.display = "none";
    				pianoContainer.style.minHeight = "0px";
    			}
    			timelineContainer.style.left = "0px";
    		}
    		else {
    			pianoContainer.style.minHeight = "0px";
    			timelineContainer.style.transform = '';
    		}
    	}
    	timelineContainer.style.width = timelineWidth + "px";
    	timelineContainer.style.height = timelineHeight + "px";
    	timeline.style.width = timelineWidth + "px";
    	timeline.style.height = timelineHeight + "px";
    	const barWidth = timelineWidth / synth.song.barCount;
    	const partWidth = (barWidth / (synth.song.beatsPerBar * Config.partsPerBeat) );
    	const wavePitchHeight = (timelineHeight - 1) / windowPitchCount;
    	const drumPitchHeight = (timelineHeight - 1) / Config.drumCount;
    	for (let bar = 0; bar < synth.song.barCount + 1; bar++) {
    		const color = (bar == synth.song.loopStart || bar == synth.song.loopStart + synth.song.loopLength) ? ColorConfig.loopAccent : ColorConfig.uiWidgetBackground;
    		timeline.appendChild(rect({ x: bar * barWidth - 1, y: 0, width: 2, height: timelineHeight, fill: color }));
    	}
    	for (let octave = 0; octave <= windowOctaves; octave++) {
    		timeline.appendChild(rect({ x: 0, y: octave * 12 * wavePitchHeight, width: timelineWidth, height: wavePitchHeight + 1, fill: ColorConfig.tonic, opacity: 0.75 }));
    	} 
    	let noteFlashColor = "#ffffff";
    	let noteFlashColorSecondary = "#ffffff77";
    	if (notesFlashWhenPlayed) {
    		noteFlashColor = ColorConfig.getComputed("--note-flash") !== "" ? "var(--note-flash)" : "#ffffff";
    		noteFlashColorSecondary = ColorConfig.getComputed("--note-flash-secondary") !== "" ? "var(--note-flash-secondary)" : "#ffffff77";
    	}
    	if (notesFlashWhenPlayed) {
    		noteFlashElementsPerBar = [];
    		for (let bar = 0; bar < synth.song.barCount; bar++) {
    			noteFlashElementsPerBar.push([]);
    		}
    		currentNoteFlashBar = -1;
    	}
    	for (let channel = synth.song.channels.length - 1 - synth.song.modChannelCount; channel >= 0; channel--) {
    		const isNoise = synth.song.getChannelIsNoise(channel);
    		const pitchHeight = isNoise ? drumPitchHeight : wavePitchHeight;
    		const configuredOctaveScroll = synth.song.channels[channel].octave;
    		const newOctaveScroll = Math.max(0, Math.min(Config.pitchOctaves - windowOctaves, Math.ceil(configuredOctaveScroll - windowOctaves * 0.5)));
    		const offsetY = newOctaveScroll * pitchHeight * 12 + timelineHeight - pitchHeight * 0.5 - 0.5;
    		for (let bar = 0; bar < synth.song.barCount; bar++) {
    			const pattern = synth.song.getPattern(channel, bar);
    			if (pattern == null)
    				continue;
    			const offsetX = bar * barWidth;
    			for (let i = 0; i < pattern.notes.length; i++) {
    				const note = pattern.notes[i];
    				for (const pitch of note.pitches) {
    					const d = drawNote(pitch, note.start, note.pins, (pitchHeight + 1) / 2, offsetX, offsetY, partWidth, pitchHeight);
    					const noteElement = path({ d: d, fill: ColorConfig.getChannelColor(synth.song, channel).primaryChannel });
    					if (isNoise)
    						noteElement.style.opacity = String(0.6);
    					timeline.appendChild(noteElement);
    					if (notesFlashWhenPlayed) {
    						const dflash = drawNote(pitch, note.start, note.pins, (pitchHeight + 1) / 2, offsetX, offsetY, partWidth, pitchHeight);
    						const noteFlashElement = path({ d: dflash, fill: (isNoise ? noteFlashColorSecondary : noteFlashColor) });
    						noteFlashElement.style.opacity = "0";
    						noteFlashElement.setAttribute('note-start', String(note.start));
    						noteFlashElement.setAttribute('note-end', String(note.end));
    						noteFlashElement.setAttribute('note-pitch', String(pitch));
    						noteFlashElement.setAttribute('note-noise', String(isNoise));
    						noteFlashElement.setAttribute('note-bar', String(bar));
    						noteFlashElement.setAttribute('note-color', String(noteElement.getAttribute("fill")));
    						timeline.appendChild(noteFlashElement);
    						const noteFlashElementsForThisBar = noteFlashElementsPerBar[bar];
    						noteFlashElementsForThisBar.push(noteFlashElement);
    					}
    				}
    			}
    		}
    	} 
    	renderPlayhead();
    	const pianoContainerBoundingRect = pianoContainer.getBoundingClientRect();
    	renderPiano(piano, timelineHeight, pianoContainerBoundingRect.height, windowOctaves, synth.song);
    }
     function renderPiano(element, width, height, octaves, song) {
    	if (song == null)
    		return;
    	element.innerHTML = "";
    	element.style.width = width + "px";
    	element.style.height = height + "px";
    	const kc = octaves * 12 + 1;
    	const kw = width / kc;
    	const kh = height;
    	for (let i = 0; i < kc; i++) {
    		const pitchNameIndex = (i + Config.keys[song.key].basePitch) % Config.pitchesPerOctave;
    		const isWhiteKey = Config.keys[pitchNameIndex].isWhiteKey;
    		const color = isWhiteKey ? "white" : "black";
    		element.appendChild(rect({
    			x: i / kc * width,
    			y: 0,
    			width: kw,
    			height: kh,
    			stroke: "rgba(0, 0, 0, 0.5)",
    			"stroke-width": 2,
    			"original-fill": color,
    			fill: color,
    		}));
    	}
    }
    function drawNote(pitch, start, pins, radius, offsetX, offsetY, partWidth, pitchHeight) {
        let d = `M ${offsetX + partWidth * (start + pins[0].time)} ${offsetY - pitch * pitchHeight + radius * (pins[0].size / Config.noteSizeMax)} `;
        let NOTE_SHRINK = 0;  if(zoomEnabled2==true){NOTE_SHRINK=3}
        for (let i = 0; i < pins.length; i++) {
            const pin = pins[i];
            const isLastPin = (i === pins.length - 1);
            const x = offsetX + partWidth * (start + pin.time) - (isLastPin ? NOTE_SHRINK : 0);
            const y = offsetY - pitchHeight * (pitch + pin.interval);
            const expression = pin.size / Config.noteSizeMax;
            d += `L ${x} ${y - radius * expression} `;
        }
        for (let i = pins.length - 1; i >= 0; i--) {
            const pin = pins[i];
            const isLastPin = (i === pins.length - 1);
            const x = offsetX + partWidth * (start + pin.time) - (isLastPin ? NOTE_SHRINK : 0);
            const y = offsetY - pitchHeight * (pitch + pin.interval);
            const expression = pin.size / Config.noteSizeMax;
            d += `L ${x} ${y + radius * expression} `;
        }
        return d;
    }
    function renderPlayButton() {
        if (synth.playing) {
            playButton.classList.remove("playButton");
            playButton.classList.add("pauseButton");
            playButton.title = "Pause (Space)";
            playButton.textContent = "Pause";
        }
        else {
            playButton.classList.remove("pauseButton");
            playButton.classList.add("playButton");
            playButton.title = "Play (Space)";
            playButton.textContent = "Play";
        }
        pauseButtonDisplayed = synth.playing;
    }
    function renderLoopIcon() {
        loopIcon.setAttribute("fill", (synth.loopRepeatCount == -1) ? ColorConfig.linkAccent : ColorConfig.uiWidgetBackground);
    }
    function renderZoomIcon() {
zoomIcon.style.color = zoomEnabled ? ColorConfig.linkAccent : ColorConfig.uiWidgetBackground;
zoomIcon2.style.color = zoomEnabled2 ? ColorConfig.linkAccent : ColorConfig.uiWidgetBackground;
    }
    function onKeyPressed(event) {
        switch (event.keyCode) {
            case 70:
                synth.playhead = 0;
                synth.computeLatestModValues();
                renderPlayhead();
                event.preventDefault();
                break;
            case 32:
                onTogglePlay();
                synth.computeLatestModValues();
                event.preventDefault();
                break;
            case 219:
                synth.goToPrevBar();
                synth.computeLatestModValues();
                renderPlayhead();
                event.preventDefault();
                break;
            case 221:
                synth.goToNextBar();
                synth.computeLatestModValues();
                renderPlayhead();
                event.preventDefault();
                break;
            case 69:
            case 80:
                if (event.shiftKey) {
                    hashUpdatedExternally();
                    cleanMemoryBeforeNavigation()
                    location.href = "" + (OFFLINE ? "index.html" : "") + "#" + synth.song.toBase64String();
                    event.preventDefault();
                }
                break;
            case 90:
            case 187:
            case 61:
            case 171:
            case 189:
            case 173:
                onToggleZoom();
                break;
            case 76:
                onToggleLoop();
                break;
            case 83:
                if (event.ctrlKey) {
                    shortenUrl();
                    event.preventDefault();
                }
                break;
            case 67:
                onCopyClicked();
                break;
        }
    }
    function shortenUrl() {
        hashUpdatedExternally();
        let shortenerStrategy = "https://tinyurl.com/api-create.php?url=";
        const localShortenerStrategy = window.localStorage.getItem("shortenerStrategySelect");
        if (localShortenerStrategy == "isgd")
            shortenerStrategy = "https://is.gd/create.php?format=simple&url=";
        window.open(shortenerStrategy + encodeURIComponent(new URL("#" + synth.song.toBase64String(), location.href).href));
    }
    function onCopyClicked() {
        let nav;
        nav = navigator;
        if (nav.clipboard && nav.clipboard.writeText) {
            nav.clipboard.writeText(location.href).catch(() => {
                window.prompt("Copy to clipboard:", location.href);
            });
            return;
        }
        const textField = document.createElement("textarea");
        textField.textContent = location.href;
        document.body.appendChild(textField);
        textField.select();
        const succeeded = document.execCommand("copy");
        textField.remove();
        if (!succeeded)
            window.prompt("Copy this:", location.href);
    }
    function onShareClicked() {
        navigator.share({ url: location.href });
    }
    function onLayoutButton() {
	    promptContainer.style.display = "flex";
    }
    function updateSampleLoadingBar(_e) {
        const e = _e;
        const percent = (e.totalSamples === 0
            ? 0
            : Math.floor((e.samplesLoaded / e.totalSamples) * 100));
        sampleLoadingBarContainer.title = "Total Samples: " + String(e.totalSamples) + "; Loaded Samples: " + String(e.samplesLoaded) + "; ";
        sampleLoadingBar.style.width = `${percent}%`;
        if (e.totalSamples != 0) {
            sampleLoadingBarContainer.style.backgroundColor = "var(--indicator-secondary)";
        }
        else {
            sampleLoadingBarContainer.style.backgroundColor = "var(--empty-sample-bar, var(--indicator-secondary))";
        }
    }
    if (top !== self) {
        copyLink.style.display = "none";
        shareLink.style.display = "none";
    }
    else {
        fullscreenLink.style.display = "none";
        if (!("share" in navigator))
            shareLink.style.display = "none";
    }
    if (getLocalStorage("volume") != null) {
        volumeSlider.value = getLocalStorage("volume");
    }
    setSynthVolume(); 
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("keydown", onKeyPressed);
    timeline.addEventListener("mousedown", onTimelineMouseDown);
    window.addEventListener("mousemove", onTimelineMouseMove);
    window.addEventListener("mouseup", onTimelineCursorUp);
    timeline.addEventListener("touchstart", onTimelineTouchDown);
    timeline.addEventListener("touchmove", onTimelineTouchMove);
    timeline.addEventListener("touchend", onTimelineCursorUp);
    timeline.addEventListener("touchcancel", onTimelineCursorUp);
    
    layoutStuffs.addEventListener("click", onLayoutButton);
    closePrompt.addEventListener("click", onExitButton);
    _okayButton.addEventListener("click", onLayoutPicked);
    
    playButton.addEventListener("click", onTogglePlay);
    loopButton.addEventListener("click", onToggleLoop);
    volumeSlider.addEventListener("input", onVolumeChange);
    zoomButton.addEventListener("click", onToggleZoom);
    zoomButton2.addEventListener("click", onToggleZoom2);
    copyLink.addEventListener("click", onCopyClicked);
    shareLink.addEventListener("click", onShareClicked);
    window.addEventListener("hashchange", hashUpdatedExternally); 
    sampleLoadEvents.addEventListener("sampleloaded", updateSampleLoadingBar.bind(exports));
    hashUpdatedExternally();
    renderLoopIcon();
    renderZoomIcon();
    renderPlayButton();

    exports.Channel = Channel;
    exports.Config = Config;
    exports.Instrument = Instrument;
    exports.Note = Note;
    exports.Pattern = Pattern;
    exports.Synth = Synth; 

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;


 
})({});
}catch (error){
 alert(error)
}
}