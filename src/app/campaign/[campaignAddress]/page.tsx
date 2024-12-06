'use client';
import { client } from '@/app/client';
import { useParams } from 'next/navigation';
import React from 'react'
import { baseSepolia } from 'thirdweb/chains';
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { useReadContract } from 'thirdweb/react';
import { parse } from 'path';

function page() {

  const { campaignAddress } = useParams();

  console.log("campaignAddress", campaignAddress);

  const contract= getContract({
    client : client,
    chain : baseSepolia,
    address : campaignAddress as string,
  })

  const { data: name, isLoading: isLoadingName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data:description, isLoading: isLoadingDescription } = useReadContract({
    contract: contract,
    method: "function description() view returns (string)", 
    params: [], 
  });

  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    contract: contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  // const name of tge function give it alias and then set as isLoading 

  //  then just call the contract, function name and params if they have any
  const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
    contract: contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  })

  const deadlineDate= new Date(parseInt(deadline?.toString() as string) * 1000);

  const hasDeadlinePassed= deadlineDate < new Date();
  return (
    <>
    <div>{ campaignAddress }</div>
    <div> { name }</div>
    <div> {  description }</div>
    <div> { balance }  </div>
    </>
  )
}

export default page