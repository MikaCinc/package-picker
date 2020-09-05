import React, { useState, useEffect } from 'react';
import './App.css';

import Stepper from 'react-stepper-horizontal';
import MultiSelect from "react-multi-select-component";
import _ from 'lodash';

import packages from './packages';

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


const labels = [
  'Based on the answers you provide us, we will generate a custom tailored plan just for you! Let us know more about you and your brand.',
  'How old is your target audience? (Age groups)',
  'Where do you want to serve content? (Select all that apply)',
  'How frequently would you like to post videos across all platforms?',
  "Which content style best resonates with the style you’re looking for?",
  'What will you be using to record your content?'
];

const App = () => {
  const [active, setActive] = useState(0);
  // const [packages, setPackages] = useState([]);

  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [targetAudience, setTargetAudience] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [style, setStyle] = useState([{ value: '', label: '' }]);
  const [recording, setRecording] = useState([]);

  /* useEffect(() => {
    fetch('http://infrnomedia.com/packages.json', {
      // mode: 'cors',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }, []); */

  const getPackage = () => {
    const current = {
      a: [...targetAudience.map(item => item.value)],
      b: [...platforms.map(item => item.value)],
      c: [...frequency.map(item => item.value)],
      d: [...style.map(item => item.value)],
      e: [...recording.map(item => item.value)]
    };

    let filteredByCOption = packages.filter(({ c }) => {
      if (c.indexOf(current.c[0]) !== -1) return true;
      return false;
    })
    // console.log(filteredByCOption);

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
    // console.log(sorted);

    let selectedPackage = sorted[0];
    // @todo delete after testing // let selectedPackage = packages[0];

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

    fetch('https://infrnomedia.com/packagepicker.php', {
      method: 'post',
      // mode: 'no-cors',
      // headers: new Headers({
      //   'Content-Type': 'application/json',
      // }),
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone
      })
    }).then((response) => {
      return response.json();
    }).then(({ id }) => {

      // console.log(id)

      if (!id) {
        console.log("error, didn't get ID");
        return;
      }

      setUserID(id);

    }).catch((error) => {
      console.log(error);
    });

    setActive(active + 1);
  }

  const updateUser = () => {
    fetch('https://infrnomedia.com/packagepicker.php', {
      method: 'post',
      // mode: 'no-cors',
      // headers: new Headers({
      //   'Content-Type': 'application/json',
      // }),
      body: JSON.stringify({
        id: userID,
        firstName,
        lastName,
        email,
        phone,
        targetAudience,
        platforms,
        frequency,
        style,
        recording
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
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
        defaultBorderColor="#a6a6a6"
        completeBorderColor="#ffffff"
        activeBorderColor="#00ff00"
        defaultBorderWidth={40}
        size={28}
      />
      <div className="stepContainer">
        <h3 className="stepLabel">{labels[active]}</h3>
        {
          active === 0 && <form className="contentDiv" onSubmit={firstFormSubmit}>
            <button className="backButton" disabled>Back</button>
            <div className="contentDivInner">
              <div className="infoFieldContainer">
                <p>First name:</p>
                <input className="infoInput" placeholder="ex. Peter" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Last name:</p>
                <input className="infoInput" placeholder="ex. Parker" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Email:</p>
                <input className="infoInput" placeholder="ex. peter@parker.com" required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="infoFieldContainer">
                <p>Phone:</p>
                <input className="infoInput" placeholder="ex. +1(415)5552671" type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
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
            <button disabled={targetAudience.length <= 0} className="nextButton" onClick={() => {
              setActive(active + 1);
              updateUser();
            }}>Next</button>
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
            <button disabled={platforms.length <= 0} className="nextButton" onClick={() => {
              setActive(active + 1);
              updateUser();
            }}>Next</button>
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
            <button disabled={frequency.length <= 0} className="nextButton" onClick={() => {
              setActive(active + 1);
              updateUser();
            }}>Next</button>
          </div>
        }
        {
          active === 4 && <div className="contentDiv">
            <button className="backButton" onClick={() => { setActive(active - 1) }}>Back</button>
            <div className="gifContainer">
              <div className="gifInnerContainer">
                <img className={`gifChooser ${style[0].value === 'd1' ? 'selectedGif' : ''}`}
                  alt=""
                  src={'https://media.giphy.com/media/lPXADFGvpQn68OeyFs/giphy-downsized.gif'}
                  onClick={() => { setStyle([{ label: 'Tony Robbins', value: 'd1' }]) }} />
                <p className="gifTitle">Tony Robbins</p>
              </div>
              <div className="gifInnerContainer">
                <img className={`gifChooser ${style[0].value === 'd2' ? 'selectedGif' : ''}`}
                  alt=""
                  src={'https://media.giphy.com/media/clohjFAo60iBlbcc7f/giphy-downsized.gif'}
                  onClick={() => { setStyle([{ label: 'Gary Vee', value: 'd2' }]) }} />
                <p className="gifTitle">Gary Vee</p>
              </div>
              <div className="gifInnerContainer">
                <img className={`gifChooser ${style[0].value === 'd3' ? 'selectedGif' : ''}`}
                  alt=""
                  src={'https://media.giphy.com/media/VIDVfz1sipCyyywQvB/giphy-downsized.gif'}
                  onClick={() => { setStyle([{ label: 'Peter Voogd', value: 'd3' }]) }} />
                <p className="gifTitle">Peter Voogd</p>
              </div>
              <div className="gifInnerContainer">
                <img className={`gifChooser ${style[0].value === 'd4' ? 'selectedGif' : ''}`}
                  alt=""
                  src={'https://media.giphy.com/media/W02FsttvBToErpFFTM/giphy.gif'}
                  onClick={() => { setStyle([{ label: 'Brene Brown', value: 'd4' }]) }} />
                <p className="gifTitle">Brene Brown</p>
              </div>
              <div className="gifInnerContainer">
                <img className={`gifChooser ${style[0].value === 'd5' ? 'selectedGif' : ''}`}
                  alt=""
                  src={'https://media.giphy.com/media/gHQjlU2zFlxkI1dfIM/giphy-downsized.gif'}
                  onClick={() => { setStyle([{ label: 'Ryan Serhan', value: 'd5' }]) }} />
                <p className="gifTitle">Ryan Serhan</p>
              </div>
            </div>
            <button disabled={style.length <= 0} className="nextButton" onClick={() => {
              setActive(active + 1);
              updateUser();
            }}>Next</button>
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
                updateUser();
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
            <span className="link">call</span>
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