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
		background: ${ColorConfig.editorBackground}; 
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
    resizeOscilloscope();
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
document.body.classList.add("playerBackground")
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
	} else
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
	const partWidth = (barWidth / (synth.song.beatsPerBar * Config.partsPerBeat));
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