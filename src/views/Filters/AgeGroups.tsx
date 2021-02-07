import { ButtonGroup, Button } from "@/components/Buttons"

const AgeGroups = ({ onChange }) => {
  return (
    <div>
      <ButtonGroup onChange={onChange} type="grid">
        <Button>0 - 15</Button>
        <Button>15 - 30</Button>
        <Button>30 - 45</Button>
        <Button>45 - 60</Button>
        <Button>60 - 75</Button>
        <Button>75 - 90</Button>
        <Button>90+</Button>
      </ButtonGroup>
    </div>
  )
}

export default AgeGroups
