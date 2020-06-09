import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Box, Heading, Text, Divider, Flex, Image } from '@chakra-ui/core';

import { Header } from './Header';
import { getAllPublicOnePagerData, getAllPublicOnePagerTags } from '../data/dataService';
import { OnePagerPublicData } from '../model/model';

// Previously selected filter tag
var selectedTag = "No Filter";

/** Renders the home component. */
export const Home = () => {
  const [onePagers, setOnePagers]: [OnePagerPublicData[], any] = React.useState(
    []
  );

  // React hook to load data on first render
  React.useEffect(() => {
    getAllPublicOnePagerData().then((result) => {
      setOnePagers(result);
    });
  }, []);

  // Retrieve tags from data service
  var tags = getAllPublicOnePagerTags();

  // Retrieves previously selected filter tag upon reload
  if (typeof window !== 'undefined') { 
    selectedTag = localStorage.getItem("selectedTag" ) || "No Filter";
  }

  // Event handler for Filter Select box
  function handleFilterSelect(e) {
    localStorage.setItem("selectedTag", e.target.value);
    window.location.reload(false);
  }

  return (
    
    <Box>
      <Head>
        <title>One Pager Alpha</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />

      <Box d='flex' justifyContent='center'>
        <Box w='xl'>
          <Heading as='h1' size='xl'>
            Welcome to One Pager Alpha! edited by Zach Lopez
          </Heading>

          <Heading as='h2' size='md'>
            View active OnePagers
          </Heading>
          <select name="tagFilter" id="tagFilter" onChange={handleFilterSelect}>
            {(<option>{selectedTag}</option>)}
            {tags.map(tag => ((tag.includes(selectedTag) ? "" : (<option>{tag}</option>))))}
          </select>
          <Box h='10px'></Box>
          <Divider />
          <OnePagerLinks onePagers={onePagers} />
        </Box>
      </Box>
    </Box>
  );
};

type OnePagerLinksProps = {
  onePagers: OnePagerPublicData[];
};

const OnePagerLinks = ({ onePagers }: OnePagerLinksProps, selectedTag: string) => {
  // Code below has been replaced with filterOnePager function
  return (
    <>
      {onePagers.map((onePagerData: OnePagerPublicData) => filterOnePager(onePagerData))}
    </>
  );
};

// Filter function that only displays onePagerData if it follows filter criteria
function filterOnePager(onePagerData: OnePagerPublicData) {
  if(selectedTag == "No Filter" || onePagerData.industryTags.includes(selectedTag)) {
    return (
      <Flex align="center">
        <Flex align="center">
        <Image paddingRight="3" alignSelf="center" htmlHeight="45px" htmlWidth="45px" src={onePagerData.imageLink} fallbackSrc="https://www.pinclipart.com/picdir/big/44-444153_blank-shield-images-pictures-logo-circle-clip-art.png" />
        </Flex>
        <Flex align="center" key={onePagerData.companyName} marginBottom='10px'>
          <Box>
            <Link href='/[onePagerSlug]' as={`/${onePagerData.url}`}>
              <a>{onePagerData.companyName}</a>
            </Link>
            <Text margin='0'>{onePagerData.briefDescription}</Text>
          </Box>
        </Flex>
      </Flex>
    )
  }
  else return null;
}
