import React, { useState } from 'react';
import './App.css';

import Stepper from 'react-stepper-horizontal';
import MultiSelect from "react-multi-select-component";
import _ from 'lodash';

const packages = [
  {
    title: 'Business Leader',
    price: 1699,
    includes: [
      '5-10 videos a week customized for every requested social media platform',
      '2 website landing page videos per month',
      'Maximum of 3 Ad videos per month',
      'Unlimited revisions per video',
      'Open communication channel',
    ],
    a: ['a3', 'a4', 'a5'],
    b: ['b1', 'b2', 'b3', 'b5', 'b8'],
    c: ['c5', 'c6', 'c7'],
    d: ['d2', 'd5'],
    e: ['e1', 'e2', 'e3']
  },
  {
    title: 'Social Media Star',
    price: 1399,
    includes: [
      '4-7 videos a week customized for every requested social media platforms',
      '1 website landing page videos per month',
      'Maximum of 2 Ad videos per month',
      'Unlimited revisions per video',
      'Open communication channel',
    ],
    a: ['a1', 'a2'],
    b: ['b1', 'b2', 'b4', 'b5', 'b7'],
    c: ['c4', 'c5', 'c6', 'c7', 'c8'],
    d: ['d1', 'd4'],
    e: ['e1', 'e2']
  },
  {
    title: 'Podcaster',
    price: 1199,
    includes: [
      '1-3 videos a week customized for every requested social media platform',
      'Maximum of 1 Ad video per month',
      'Limited to 4 revisions per video',
      'Open communication channel',
    ],
    a: ['a1', 'a3', 'a4', 'a5'],
    b: ['b1', 'b2', 'b6'],
    c: ['c1', 'c2', 'c3'],
    d: ['d1', 'd3'],
    e: ['e1', 'e2']
  },
  {
    title: 'Beginner Leader',
    price: 999,
    includes: [
      '1-2 videos a week customized for every requested social media platform',
      'Limited to 2 revisions per video',
      'Open communication channel',
    ],
    a: ['a1', 'a2', 'a3', 'a4', 'a5'],
    b: ['b2', 'b3', 'b4', 'b5', 'b7'],
    c: ['c1', 'c2'],
    d: ['d1', 'd4'],
    e: ['e1']
  },
]

const optionsA = [
  { label: "13-17", value: "a1" },
  { label: "18-20", value: "a2" },
  { label: "21-29", value: "a3" },
  { label: "30-40", value: "a4" },
  { label: "40+", value: "a5" },
];

const optionsB = [
  { label: "YouTube", value: "b1" },
  { label: "Instagram", value: "b2" },
  { label: "LInkedIn", value: "b3" },
  { label: "TikTok", value: "b4" },
  { label: "Twitter", value: "b5" },
  { label: "Podcasting Platforms", value: "b6" },
  { label: "Snapchat", value: "b7" },
  { label: "Website", value: "b8" },
];

const optionsC = [
  { label: "1/week", value: "c1" },
  { label: "2/week", value: "c2" },
  { label: "3/week", value: "c3" },
  { label: "4/week", value: "c4" },
  { label: "5/week", value: "c5" },
  { label: "6/week", value: "c6" },
  { label: "Every day", value: "c7" },
];

const optionsE = [
  { label: "Smartphone", value: "e1" },
  { label: "Semi-professional camera", value: "e2" },
  { label: "Professional camera", value: "e3" },
];

const App = () => {
  const [active, setActive] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [targetAudience, setTargetAudience] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([]);
  const [recording, setRecording] = useState([]);

  const getPackage = () => {
    const current = {
      a: [...targetAudience.map(item => item.value)],
      b: [...platforms.map(item => item.value)],
      c: [...frequency.map(item => item.value)],
      d: [...style],
      e: [...recording.map(item => item.value)]
    };

    packages.forEach(p => {
      let counter = 0;
      Object.keys(current).forEach(key => {
        current[key].forEach(letterAndNumber => {
          if (p[key].indexOf(letterAndNumber) !== -1) {
            counter++;
          }
        })
      })
      p.counter = counter;
    });


    let sorted = _.sortBy(packages, ['counter', 'price'])
    console.log(sorted)

    let selectedPackage = sorted[sorted.length - 1];

    return (
      <div className="selectedPackage">
        <h2>{selectedPackage.title}</h2>
        <div>{selectedPackage.includes.map((i, index) => {
          return <p key={index}>{i}</p>
        })}</div>
        <h3>{selectedPackage.price}</h3>
      </div>
    )
  }

  return (
    <div className="App">
      <Stepper steps={[
        { title: 'Info' },
        { title: 'Target audience' },
        { title: 'Platforms' },
        { title: 'Frequency' },
        { title: 'Style' },
        { title: 'Recording' },
        { title: 'Finish' }
      ]} activeStep={active} />
      {
        active === 0 && <div>
          <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
          <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />

          <button className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
        </div>
      }
      {
        active === 1 && <div>
          <MultiSelect
            options={optionsA}
            value={targetAudience}
            onChange={setTargetAudience}
            labelledBy={"Select"}
          />
          <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
          {
            targetAudience.length > 0 && <button className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          }
        </div>
      }
      {
        active === 2 && <div>
          <MultiSelect
            options={optionsB}
            value={platforms}
            onChange={setPlatforms}
            labelledBy={"Select"}
          />
          <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
          {
            platforms.length > 0 && <button className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          }
        </div>
      }
      {
        active === 3 && <div>
          <MultiSelect
            options={optionsC}
            value={frequency}
            onChange={(data) => {
              if (!data || !data.length) {
                setFrequency([]);
                return;
              }

              if (data.length === 2) {
                setFrequency([data[1]]);
                return;
              }

              setFrequency([data[0]])
            }}
            labelledBy={"Select"}
            hasSelectAll={false}
          />
          <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
          {
            frequency.length > 0 && <button className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          }
        </div>
      }
      {
        active === 4 && <div>
          <div>
            <img className={`gifChooser ${style[0] === 'd1' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d1']) }} />
            <img className={`gifChooser ${style[0] === 'd2' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d2']) }} />
            <img className={`gifChooser ${style[0] === 'd3' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d3']) }} />
            <img className={`gifChooser ${style[0] === 'd4' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d4']) }} />
            <img className={`gifChooser ${style[0] === 'd5' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d5']) }} />
          </div>
          <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
          {
            style.length > 0 && <button className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          }
        </div>
      }
      {
        active === 5 && <div>
          <MultiSelect
            options={optionsE}
            value={recording}
            onChange={setRecording}
            labelledBy={"Select"}
          />
          <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
          {
            recording.length > 0 && <button className="nextButton" onClick={
              () => {
                setActive(active + 1);
              }
            }>Next</button>
          }
        </div>
      }
      {
        active === 6 && <div>
          <h1>Based on your answers we suggest the following package</h1>
          <h3>(Not sure if it’s the write choice? Check other packages, or give us a call!)</h3>
          {getPackage()}
        </div>
      }
    </div>
  );
}

export default App;