

const Title = ({heading,subHeading}) => {
    return (
        <div className="text-center  flex items-center flex-col">
            <div className="  w-1/4 border-b-2">
                <h2 className="font-bold uppercase text-xl">{heading}</h2>
            </div>
            <div >
                <p className="p-2 uppercase border-b-2">{subHeading}</p>
            </div>
        </div>
    );
};

export default Title;