export default function TailButton({ caption, bcolor, handleClick }) {
    const colorB = {
        'blue': 'bg-blue-600',
        'orange': 'bg-orange-600',
        'lime': 'bg-lime-600',
    }

    const colorBHover = {
        'blue': 'hover:bg-blue-800',
        'orange': 'hover:bg-orange-800',
        'lime': 'hover:bg-lime-800',
    }

    return (
        <button className={`inline-flex px-5 py-3
                       rounded-md
                       mx-2
                       justify-center items-center
                       text-white font-bold
                       ${colorB[bcolor]}
                       ${colorBHover[bcolor]}`}
            onClick={handleClick}>
            {caption}
        </button>
    )
}
