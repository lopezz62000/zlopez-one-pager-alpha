import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Flex, Divider, FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

import { OnePagerData } from '../model/model';
import { getOnePagerData } from '../data/dataService';
import { EMPTY_ONE_PAGER } from '../data/onepagers';
import { ContentCard } from './ContentCard';
import { Header } from './Header';
import { OnePagerOverview } from './OnePagerOverview';
import { OnePagerFounders } from './OnePagerFounders';
import { OnePagerFinances } from './OnePagerFinances';
import { OnePagerVideo } from './OnePagerVideo';

/** Renders a full one pager based on the onePagerUrl. */
export const OnePager = ({ onePagerUrl }: { onePagerUrl: string }) => {
  const [onePagerData, setOnePager]: [OnePagerData, any] = React.useState(
    EMPTY_ONE_PAGER
  );
  const [isLoading, setIsLoading]: [boolean, any] = React.useState(false);

  // Load data on first render.
  React.useEffect(() => {
    setIsLoading(true);
    getOnePagerData(onePagerUrl).then((result) => {
      setOnePager(result);
      setIsLoading(false);
    });
  }, []);

  var parameters = {
    'name': '',
    'emailFrom': '',
    'emailTo': '',
    'message': ''
  };

  function handleSubmit(e) {
    var founderEmails = onePagerData.founders[0].email;
    for (var i = 1; i < onePagerData.founders.length; i++) {
      founderEmails += ',' + onePagerData.founders[i].email;
    }
    parameters['emailTo'] = founderEmails;

    var url = 'https://script.google.com/macros/s/AKfycbyYnozSQFY8Gz1lvl4U4s0AGdNy4BE3RA39uO_rfXeUw-VcIcrm/exec';
    url += '?parameters='+encodeURIComponent(JSON.stringify(parameters));

    const https = require('https');

    https.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    alert('Thank you! You should be included in an email with one of the founders.');
  }

  function handleChange(value, id) {
    parameters[id] = value;
  }

  return (
    <Box bg='#f2f4f5'>
      <Head>
        <title>{isLoading ? onePagerUrl : onePagerData.companyName}</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Header />

      <OnePagerOverview onePagerData={onePagerData} isLoading={isLoading} />

      <Diveder50 />

      <OnePagerFounders onePagerData={onePagerData} isLoading={isLoading} />

      <Diveder50 />

      <OnePagerFinances onePagerData={onePagerData} isLoading={isLoading} />

      <Diveder50 />

      <OnePagerVideo onePagerData={onePagerData} isLoading={isLoading} />

      <Flex width="308px" pos="fixed" right="5" bottom="0">
      <ContentCard title="Contact Founders" isLoading={false}>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input onChange={event => handleChange(event.target.value, event.target.id)} width="250px" type="email" id="emailFrom"/>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input onChange={event => handleChange(event.target.value, event.target.id)} width="250px" id="name"/>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Input onChange={event => handleChange(event.target.value, event.target.id)} width="250px" height="150px" id="message"/>
          <Box h='3'></Box>
          <Button onClick={handleSubmit} variantColor="blue">Submit</Button>
        </FormControl>
      </ContentCard>
      </Flex>

      <ContentCard isLoading={false}>
        <Flex justifyContent='center'>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </Flex>
      </ContentCard>
      <Box h='20'></Box>
    </Box>
  );
};

const Diveder50 = () => <Divider width='50%' />;
