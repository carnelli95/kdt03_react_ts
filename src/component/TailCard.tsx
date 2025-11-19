import React from 'react';



export default function TailCard({ title, imageUrl, location, searchKeyword, traffic, day }) {
    // let tags = '';
    // if (searchKeyword.includes(',')) {
    //     tags= searchKeyword.split(',')
    //     tags = tags.map(kw => <span key={kw} 
    //     className="bg-green-100 rounded-sm p-2 inline-flex mx-0.5 text-sm">
    //                           {kw}
    //                       </span>)
    // }
    // else tags = searchKeyword;
    
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg w-full h-46 object-cover" src={imageUrl} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-blue-300">
            {location}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{traffic}</p>
      </div>
    </div>
  );
}
