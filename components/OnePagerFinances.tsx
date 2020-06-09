import React from 'react';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import { CircularProgress, CircularProgressLabel, Text, Box, Flex, Heading } from "@chakra-ui/core";

type OnePagerFinancesProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

/** Renders the Finances card. */
export const OnePagerFinances = ({
  onePagerData,
  isLoading,
}: OnePagerFinancesProps) => {
  // Format a number to include a dollar sign. 
  // Uses builtin toLocaleString for Number class instead of parsing string
  const formatFinanceNumber = (financeNumber: number) => {
    return `$${(Number(financeNumber)).toLocaleString()}`;
  };

  // Calculates percent progress based on funds raised and goal
  var progressPercent = Math.floor((onePagerData.fundsRaisedInStage/onePagerData.fundraisingStageGoal)*100);

  // Added circular progress bar and included fundraising details
  return (
    <ContentCard title='Finances' isLoading={isLoading}>
      <Heading as='h1' size='lg' marginRight='10px'>
        Funding Stage: {onePagerData.fundraisingStage}
      </Heading>
      <Flex align='center'>
        <Box>
          <SubHeading>
            Funds Raised: {formatFinanceNumber(onePagerData.fundsRaisedInStage)}
          </SubHeading>
          <SubHeading>
            Funding Goal: {formatFinanceNumber(onePagerData.fundraisingStageGoal)}
          </SubHeading>
        </Box>
        <Flex paddingLeft="5" align="center">
          <CircularProgress vertical-align='baseline' value={progressPercent} color="blue" size="85px">
            <CircularProgressLabel>{progressPercent}%</CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Flex>
      <SubHeading>
        Fundraising Details:
      </SubHeading>
      <Text fontSize='sm' marginTop='5px'>
        {onePagerData.fundraisingDetails}
      </Text>
    </ContentCard>
  );
};

/** Renders smaller heading. */
const SubHeading = ({ children }) => (
  <Heading as='h2' size='md' marginRight='10px'>
    {children}
  </Heading>
);
