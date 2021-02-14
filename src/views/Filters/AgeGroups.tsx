import { ButtonGroup, Button } from "@/components/Buttons"
import Slider from "@material-ui/core/Slider"

const marks = [
  { value: 0, label: "0" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
  { value: 60, label: "60" },
  { value: 70, label: "70" },
  { value: 80, label: "80" },
  { value: 90, label: "90" },
  { value: 100, label: "100" },
  { value: 110, label: "110+" },
]

const AgeGroups = ({ onChange }) => {
  return (
    <Slider
      step={10}
      max={110}
      marks={marks}
      className="slider"
      onChange={onChange}
      defaultValue={[0, 110]}
      // valueLabelDisplay="auto"
      // aria-labelledby="range-slider"
      // getAriaValueText={valuetext}
    />
    // <div>
    //   <ButtonGroup onChange={onChange} type="grid">
    //     <Button>0 - 9</Button>
    //     <Button>10 - 19</Button>
    //     <Button>20 - 29</Button>
    //     <Button>30 - 39</Button>
    //     <Button>40 - 49</Button>
    //     <Button>50 - 59</Button>
    //     <Button>60 - 69</Button>
    //     <Button>70 - 79</Button>
    //     <Button>80 - 89</Button>
    //     <Button>90 - 99</Button>
    //     <Button>100+</Button>
    //   </ButtonGroup>
    // </div>
  )
}

export default AgeGroups
