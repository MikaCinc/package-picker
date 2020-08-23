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
      '1 website landing page video per month',
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
  { label: "LinkedIn", value: "b3" },
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
  const [active, setActive] = useState(1);

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

    let filteredByCOption = packages.filter(({ c }) => {
      if (c.indexOf(current.c[0]) !== -1) return true;
      return false;
    })
    console.log(filteredByCOption);

    filteredByCOption.forEach(p => {
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


    let sorted = _.orderBy(filteredByCOption, ['counter', 'price'], ['desc', 'asc']);
    console.log(sorted);

    // let selectedPackage = sorted[0];
    let selectedPackage = packages[0];

    if (!selectedPackage) {
      return null;
    }

    return (
      <div className="selectedPackage">
        <h2>{selectedPackage.title}</h2>
        <div>{selectedPackage.includes.map((i, index) => {
          return <p key={index}>{i}</p>
        })}</div>
        <h3>{`$${selectedPackage.price}`}</h3>
        <button className="finalButton" onClick={() => { }}>Buy</button>
      </div>
    )
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const firstFormSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please type valid email before moving to the next step');
      return;
    }
    setActive(active + 1);
  }

  return (
    <div className="App">
      <Stepper
        steps={[
          { title: 'Info' },
          { title: 'Target audience' },
          { title: 'Platforms' },
          { title: 'Frequency' },
          { title: 'Style' },
          { title: 'Recording' },
          { title: 'Finish' }
        ]}
        activeStep={active}
        activeColor="#ffffff"
        activeTitleColor="#ffffff"
        circleFontColor="#000000"
        completeColor="#ffffff"
        completeTitleColor="#ffffff"
        defaultColor="#a6a6a6"
        completeBarColor="#ffffff"
        defaultOpacity="0.7"
      />
      <div className="stepContainer">
        {
          active === 0 && <form className="contentDiv" onSubmit={firstFormSubmit}>
            <button className="backButton" disabled>Back</button>
            <div className="contentDivInner">
              <div className="infoFieldContainer">
                <p>First name:</p>
                <input className="infoInput" placeholder="ex. Marko" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Last name:</p>
                <input className="infoInput" placeholder="ex. Vučković" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Email:</p>
                <input className="infoInput" placeholder="ex. marko@vuckovic.com" required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Phone:</p>
                <input className="infoInput" placeholder="ex. (063)554-455" type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
              </div>
            </div>
            <input className="nextButton" type="submit" value="Next" />
          </form>
        }
        {
          active === 1 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
            <MultiSelect
              options={optionsA}
              value={targetAudience}
              onChange={setTargetAudience}
              labelledBy={"Select"}
              className="multiSelect"
            />
            <button disabled={targetAudience.length <= 0} className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          </div>
        }
        {
          active === 2 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
            <MultiSelect
              options={optionsB}
              value={platforms}
              onChange={setPlatforms}
              labelledBy={"Select"}
              className="multiSelect"
            />
            <button disabled={platforms.length <= 0} className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          </div>
        }
        {
          active === 3 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
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
              className="multiSelect"
            />
            <button disabled={frequency.length <= 0} className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          </div>
        }
        {
          active === 4 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
            <div className="gifContainer">
              <img className={`gifChooser ${style[0] === 'd1' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d1']) }} />
              <img className={`gifChooser ${style[0] === 'd2' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d2']) }} />
              <img className={`gifChooser ${style[0] === 'd3' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d3']) }} />
              <img className={`gifChooser ${style[0] === 'd4' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d4']) }} />
              <img className={`gifChooser ${style[0] === 'd5' ? 'selectedGif' : ''}`} alt="" src="" onClick={() => { setStyle(['d5']) }} />
            </div>
            <button disabled={style.length <= 0} className="nextButton" onClick={() => { setActive(active + 1) }}>Next</button>
          </div>
        }
        {
          active === 5 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
            <MultiSelect
              options={optionsE}
              value={recording}
              onChange={setRecording}
              labelledBy={"Select"}
              className="multiSelect"
            />
            <button disabled={recording.length <= 0} className="nextButton" onClick={
              () => {
                setActive(active + 1);
              }
            }>Next</button>
          </div>
        }
        {
          active === 6 && <div className="finalContentDiv">
            <h1 className="finalTitle">Based on your answers we suggest the following package</h1>
            <h3 className="finalSubtitle">
              (Not sure if it’s the right choice? Check
            <span className="link">other packages</span>
            , or give us a
            <sppan className="link">call</sppan>
            !)
            </h3>
            {getPackage()}
          </div>
        }
      </div>
    </div>
  );
}

export default App;