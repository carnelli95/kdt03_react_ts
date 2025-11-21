interface TailCardProps {
  title: string,
  imageUrl: string,
  location: string,
  traffic: string,
}

export default function TailCard({ title, imageUrl, location,  traffic} : TailCardProps) {
  
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
