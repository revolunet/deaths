import { ButtonGroup, Button } from "@/components/Buttons"

const Genders = ({ onChange }) => (
  <div>
    <ButtonGroup onChange={onChange} type="grid">
      <Button ariaLabel="male">male</Button>
      <Button ariaLabel="female">female</Button>
    </ButtonGroup>
  </div>
)

export default Genders
