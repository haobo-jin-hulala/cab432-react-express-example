import React, { useEffect, useState } from 'react'
import { Alert, Input, Button, Layout, Typography, Modal, List, Divider, Statistic } from 'antd';
import "./Home.css"
import WordCountCloud from "./WordCountCloud"
import { set } from 'lodash';

const { Header, Content, } = Layout;
const { Search } = Input;
const { Title } = Typography;



const Home = () => {
  let local = window.location.host
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('please click ok to get the tweets and wait twenty seconds');
  const [tag, setTag] = useState();
  const [isDeleteTag, setisDeleteTag] = useState(false)
  const [tweets, setTweets] = useState([])
  const [sentiment, setSentiment,] = useState(false)
  const [isSentiment, setIsSantiment] = useState(false)
  const [isPoWordCloud, setIsPoWordCloud] = useState(false)
  const [isNaWordCloud, setIsNeWordCloud] = useState(false)
  const [loading, setLoading] = useState(false);

  const [positiveTweets, setPositiveTweets] = useState([])
  const [negativeTweets, setNegativeTweets] = useState([])
  const [emotionlessTweets, setEmotionlessTweet] = useState([])

  const [positiveWcData, setPositiveWcData] = useState(null)
  const [negativeWcData, setNegativeWcData] = useState(null)

  //button disable
  const [disable, setDisable] = useState(false)

  const [tweetsNum, setTweetsNum] = useState(0)

  const getTweets = () => {
    fetch(`http://${local}/twitter/getTweets/${tag}`)
      .then(res => res.json())
      .then(res => {
        console.log(res.map(res => res.text))
        setTweetsNum(res.length)

        setTweets(res.map(res => res.text))
      })
  }
  useEffect(() => {

    if (tag !== undefined) {

      const interval = setInterval(() => {
        console.log("1.2.3.4.5")
        getTweets()
      }, 4000)
      return () => clearInterval(interval)
    }

  }, [tag])

  const onSearch = (value) => {
    if (value) {
      setTag(value)
      console.log(value)
      fetch(`http://${local}/twitter/add/${value}`)


      //setIsGetTweets(true)
      setisDeleteTag(true)
      setSentiment(false)
      setDisable(true)
      setIsSantiment(false)

    } else {
      console.log("please input the keyword")
    }

  }



  /*   const getTweets = () => {
      setIsGetTweets(false)
      setSentiment(true)
  
      setIsPoWordCloud(false)
      setIsNeWordCloud(false)
    } */
  const deleteTag = () => {
    fetch(`http://${local}/twitter/delete`)
    setSentiment(true)
    setisDeleteTag(false)
  }
  const sentimentAnalysis = () => {
    fetch(`http://${local}/sen/${tag}`).then(res => res.json())
      .then(res => {
        let positiveT = []
        let negativeT = []
        let emotionlessT = []
        res.map(res => {
          if (res.sentiment === "positive") {
            positiveT.push(res.text)
          } else if (res.sentiment === "negative") {
            negativeT.push(res.text)
          } else {
            emotionlessT.push(res.text)
          }
        })
        setSentiment(false)
        setPositiveTweets(positiveT)
        setNegativeTweets(negativeT)
        setEmotionlessTweet(emotionlessT)
        setDisable(false)


      })
    setIsSantiment(true)
  }
  const getPositiveWC = () => {
    fetch(`http://${local}/Count/positive/${tag}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setPositiveWcData(res)
        setIsPoWordCloud(true)
      })
  }
  const getNegativeWC = () => {
    fetch(`http://${local}/Count/negative/${tag}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setNegativeWcData(res)
        setIsNeWordCloud(true)

      })
  }

  /*   const showModal = () => {
      setOpen(true);
      let secondsToGo = 15
  
  
      const timer = setInterval(() => {
        secondsToGo -= 1;
        setModalText(`please click ok to get the tweets and wait ${secondsToGo} seconds`)
      }, 1000);
  
      setTimeout(() => {
        fetch(`http://${local}/twitter/delete`)
        setOpen(false);
        //setConfirmLoading(false);
        clearInterval(timer);
        setIsGetTweets(true)
        setIsPoWordCloud(false)
        setIsNeWordCloud(false)
      }, 15000);
    }; */

  /*  const handleOk = () => {
     fetch(`http://${local}/twitter/add/${tag}`)
     .then(res => {
       console.log(res)
     })
     setModalText('please click ok to get the tweets and wait twenty seconds');
    
     setConfirmLoading(true);
     setTimeout(() => {
       fetch(`http://${local}/twitter/delete`)
       setOpen(false);
       setConfirmLoading(false);
     
       setIsGetTweets(true)
       setIsPoWordCloud(false)
       setIsNeWordCloud(false)
     }, 20000);
   };
  */

  /*   const handleCancel = () => {
     fetch(`http://${local}/twitter/delete`)
     setOpen(false);
     setIsGetTweets(false)
     setIsPoWordCloud(false)
     setIsNeWordCloud(false)
   }; */


  /*  const countDown = () => {
     let secondsToGo = 20;
   
     const modal = Modal.success({
       title:  `Please wait  ${secondsToGo} second to get tweets.`,
       content: `This modal will be destroyed after ${secondsToGo} second.`,
       footer:null
 
       
     });
  
   
     const timer = setInterval(() => {
       secondsToGo -= 1;
       modal.update({
         content: `This modal will be destroyed after ${secondsToGo} second.`,
       });
     }, 1000);
   
     setTimeout(() => {
       fetch(`http://${local}/twitter/delete`)
       clearInterval(timer);
   
       setIsGetTweets(true)
       setIsPoWordCloud(false)
       setIsNeWordCloud(false)
       modal.destroy();
   
     }, secondsToGo * 1000);
   }; */


  return (
    <div>
      <Layout>
        <Header>
          Header!!!!
        </Header>

        {/* search area */}
        <Content>
          <div className='searchArea'>
            <Title>Please input the filtered keyword to search tweets</Title>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              disabled={disable}

            />
            {/*   <Modal

              open={open}
              footer={null}


            >
              {modalText}

            </Modal> */}




            {isDeleteTag === false ? <div></div> : <Button type="primary" onClick={deleteTag} >delete tag</Button>}

            {sentiment === false ? <div></div> : <Button type="primary" onClick={sentimentAnalysis} >sentiment Analysis</Button>}

          </div>

        </Content>

        {disable === false ? <div></div> : <Alert message="Please wait twitters coming......" type="success" />}

        {disable === false ? <div></div> : <Statistic title="Tweets count:" value={tweetsNum} />}





        {/* tweets area */}
        <Content>
          {isSentiment === false ? <List
            size="large"

            header={<div>the related tweets: {`${tag === undefined ? " " : tag}`} </div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={tweets}
            renderItem={item => <List.Item>{item}</List.Item>}
          /> :
            <div>
              <Divider orientation="left">Positive</Divider>
              <Button type="primary" onClick={getPositiveWC} >get Positive Word Count Cloud</Button>
              {isPoWordCloud === false ? <List
                size="small"
                bordered
                dataSource={positiveTweets}
                renderItem={item => <List.Item>{item}</List.Item>}
              /> : <WordCountCloud data={positiveWcData} />
              }



              <Divider orientation="left">Negative</Divider>
              <Button type="primary" onClick={getNegativeWC} >get Negative Word Count Cloud</Button>
              {isNaWordCloud === false ? <List
                size="small"
                bordered
                dataSource={negativeTweets}
                renderItem={item => <List.Item>{item}</List.Item>}
              /> :
                <WordCountCloud data={negativeWcData} />
              }
              <Divider orientation="left">Emotionless</Divider>
              <List
                size="small"
                bordered
                dataSource={emotionlessTweets}
                renderItem={item => <List.Item>{item}</List.Item>}
              />


            </div>




          }


        </Content>




      </Layout>

    </div>
  )
}

export default Home