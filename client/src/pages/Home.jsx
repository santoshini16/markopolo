import React from 'react'
import styles from './Home.module.css'
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div className={styles.homepage}>
      <img src="/orbital.png" alt="orbital" className={styles.orbital} />
      <div className={styles.left}>
        <h1>SHOPTALK</h1>
        <h2>Supercharge your products</h2>
        <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aliquam distinctio asperiores molestias magnam, eaque natus, quam numquam cumque accusantium blanditiis at facere delectus. Mollitia pariatur voluptatibus magnam assumenda enim.</h3>
        <button>Upload your documents</button>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <div className={styles.bgContainer}>
            <div className={styles.bg}></div>
          </div>
          <img src="/bot.png" alt="" className={styles.bot} />
          <div className={styles.chat}>
            <img src="/bot.png" alt="" />
          <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human:We produce food for Mice',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Bot:We produce food for Hamsters',
                1000,
                'Human2:We produce food for Guinea Pigs',
                1000,
                'Bot:We produce food for Chinchillas',
                1000
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home