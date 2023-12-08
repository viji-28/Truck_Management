import React from 'react'
import { Paper, Button } from '@mui/material'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styled from 'styled-components';
import Services from './Services';
import FeedbackForm from './Feedback';


const LINK = styled.div`
height:100vh;
`;

const Home = () => {



  return (
    <div>
      <div style={{ height: '100vh' }}>
        <Carousel showThumbs={false} showStatus={false} autoPlay={true}>
          <LINK>
            <img src="https://veritablevegetable.com/wp-content/uploads/2020/07/Truck_Marin_Fleet.png" />
          </LINK>
          <LINK>
            <img src="https://wallpaperaccess.com/full/6141778.jpg" />
          </LINK>
          <LINK>
            <img src="https://www.geotab.com/CMS-Media-production/Blog/NA/_2020/April/productivity-webinar/FleetOptimization_GettyImages-1212404028-Hero@2x.jpg" />
          </LINK>
        </Carousel>
      </div>
      <div style={{ padding: '5% 0% 3% 40%', fontSize: '2rem' }}>
        <span ><b >Our Services</b></span>
      </div>
      <Services />
      <div>
        <FeedbackForm />
      </div>
    </div>
  )
}

export default Home;