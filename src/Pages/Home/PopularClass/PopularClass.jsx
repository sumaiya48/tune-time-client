import { useEffect, useState } from "react";
import ClassCard from "../../Shared/Classes/ClassCard";

const PopularClass = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/info')  // Use your server endpoint here
            .then(res => res.json())
            .then(data => {
                const popularClasses = data.filter(cls => cls.classCategory === 'Popular');
                setClasses(popularClasses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <ClassCard cls={classes}></ClassCard>
        </div>
    );
};

export default PopularClass;
