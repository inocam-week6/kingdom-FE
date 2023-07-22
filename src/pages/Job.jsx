import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useRoter } from '../hooks/commen';
import { useDispatch, useSelector } from 'react-redux';
import { getJobsData, selectJobsDate } from '../redux/modules/morkServer/morkJobsSlice';

export function Job() {
  const { navigate } = useRoter();
  const dispatch = useDispatch()
  const jobDatas = useSelector(selectJobsDate)
  useEffect(()=>{
    async function getJobInfo(){
      try{
        const res = await axios.get(`/api/job`)
        dispatch(getJobsData(res.data.info))
      }
      catch(error){
        console.log("데이터를 불러오지 못함")
      }
    }
    getJobInfo()
  },[])

  return (
      <div>JobDatas
        {
          jobDatas && jobDatas.map((item)=>(
            <section key={item.id}>
              {item.title}
              <button onClick={()=>{navigate(`/job/${item.id}`)}}>Detail</button>
            </section>
          ))
        }
        <button onClick={()=>{navigate('/')}}>Home</button>
      </div>
  )
}

