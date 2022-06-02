import useWeb3 from '../hooks/useWeb3'
import counterContract from '../contracts/counter.json'
import { useCallback, useEffect, useState } from 'react';


const useCounter = (currentAccount)=>{
    const { contract } = useWeb3({
        contractABI: counterContract.abi,
        contractAddress: counterContract.address,
      });

      const [count, setCount ]=useState(0)
      const [loading, setLoading]=useState(false)

      const getCount = useCallback( async()=>{
          try {
              setLoading(true)
            const countData = await contract.methods.count().call()
            setCount(countData)
            setLoading(false)

          } catch (error) {
              console.error(error)
          }
      },[contract])

      const increment = async ()=>{
          try {
            setLoading(true)
              await contract.methods.increment().send({
                  from: currentAccount,
              })
              getCount()
          } catch (error) {}
      }
      const decrement = async ()=>{
        try {
            setLoading(true)
            await contract.methods.decrement().send({
                from: currentAccount,
            })
            getCount()
        } catch (error) {}
    }

      useEffect(()=>{
          if(contract && contract.methods){
              getCount()
          }
      },[contract, getCount])

      return {count, increment, decrement, loading}
}

export default useCounter