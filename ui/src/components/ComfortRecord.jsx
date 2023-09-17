const ComfortRecord = ({score}) => {
    return (
        <div className="flex flex-row justify-around py-10">
            <h3 className="w-fit h-fit inline-block text-[1.2rem] font-semibold">Level of Comfort</h3>
            <p  className="w-fit h-fit inline-block text-[1.2rem] font-semibold">----------------------------------------------------</p>
            <h3 className="w-fit h-fit inline-block text-md font-extrabold">{`${score ?? "100"}%`}</h3>
        </div>
    );
}

export default ComfortRecord