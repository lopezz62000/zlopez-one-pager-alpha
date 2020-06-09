import React, { Fragment } from 'react';
import { Heading, Divider } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';

type OnePagerVideoProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

export const OnePagerVideo = ({
  onePagerData,
  isLoading,
}: OnePagerVideoProps) => {
  // Hides video card when no link is given, added video frame when link is given
  if(onePagerData.pitchVideoLink != null) {
    var videoEmbedLink = "https://www.youtube.com/embed/"+onePagerData.pitchVideoLink.split('v=')[1].split('&t=')[0];
    if(onePagerData.pitchVideoLink.split('t=').length > 1) {
      videoEmbedLink += "?start="+onePagerData.pitchVideoLink.split('t=')[1].split('s')[0];
    }
    return (
      <Fragment>
      <ContentCard title='Pitch Video' isLoading={isLoading}>
        <Heading as='h2' size='md' marginRight='10px'>
          <a href={onePagerData.pitchVideoLink} target='_blank'>
            Link to Pitch Video
          </a>
          <iframe width="560" height="315" src={videoEmbedLink}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" >
          </iframe>
        </Heading>
      </ContentCard>
      <Divider width='50%' />
      </Fragment>
    );
  }
  else {
    return null;
  }
};
