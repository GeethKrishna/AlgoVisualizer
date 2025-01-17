import { MAX_SORTING_SPEED, MIN_SORTING_SPEED } from "../utils/constants";

export const Slider = (
    {
        min = MIN_SORTING_SPEED,
        max = MAX_SORTING_SPEED,
        step = 10,
        value,
        handleChange,
        isDisabled = false,
    }
    :
    {
        min?: number,
        max?: number,
        step?: number,
        value: number,
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        isDisabled: boolean,
    }
) => {
    return (
        <div
            className="flex gap-2 items-center justify-center"
        >
            <span className="text-center text-gray-300">Slow</span>
            <input 
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={isDisabled}
                className="w-full h-2 appearance-none cursor-pointer bg-gray-700 bg-sky"
            />
            <span className="text-center text-gray-300">Fast</span>
        </div>
    );
}