import { useEffect, useState } from "react";
import InsCard from "./InsCard";

const PopularInstructor = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/info')  // Update this URL to match your server's URL
            .then(res => res.json())
            .then(data => {
                const popularClasses = data.filter(cls => cls.classCategory === 'Popular');
                setClasses(popularClasses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <InsCard cls={classes}></InsCard>
        </div>
    );
};

export default PopularInstructor;
