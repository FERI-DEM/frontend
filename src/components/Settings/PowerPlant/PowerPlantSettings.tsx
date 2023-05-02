import CardBasic from "@/components/Cards/CardBasic";
import { useState } from "react";
import { PowerPlant } from "@/types/power-plant.type";

interface Props {
    PowerPlants: PowerPlant[];
}

const PowerPlantSettings = ({PowerPlants}: Props) => {
    return (
        <div className='flex flex-row flex-wrap'>
            <CardBasic title='Elektrarne' buttonTitle='Dodaj elektrarno'>
                {PowerPlants.map((powerPlant) => (
                    <div key={powerPlant._id} className='flex flex-row justify-between'>
                        <div className='flex flex-col'>
                            <p className='text-sm font-semibold'>{powerPlant.displayName}</p>
                        </div>
                    </div>
                ))}
            </CardBasic>
        </div>
    );
};

export default PowerPlantSettings;