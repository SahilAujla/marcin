import { useContext, useState } from "react";
import { MainContext } from "../context/mainContext";
import Loader from '../src/components/Loader'



export default function Profile() {
    const { results } = useContext(MainContext);
    console.log("DFDASFADSFADSFDASF", results);
    const [loading, setLoading] = useState(false);

    console.log(":::::::::::::::::::::::::::::::::::::::::::", results)




    return (
        <>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-col-1 md:grid-cols-3 flex-col justify-around mt-8 ">

                    {/* {!results ? <Loader /> : results.map((item, index) => {} */}

                    {!results ? <Loader /> : results.map((result, index) => {

                        return (
                            <div key={index} className="bg-white rounded-md m-4 p-4 flex flex-col items-center">
                                <img src={result.image} className="w-64 p-4" />
                                <p>{result.name}</p>
                                <p>{result.description}</p>
                            </div>
                        )
                    })
                    }


                </div>
            </div>
            {
                results && results.length === 0 ? <p className="text-center text-3xl text-white ">You Don't Own any <span className='text-[#10fcc7]'>bao-bao</span> </p> : null
            }
        </>

    )
}
