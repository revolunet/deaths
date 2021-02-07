import { ButtonGroup, Button } from "@/components/Buttons"

const Genders = ({ onChange }) => (
  <div>
    <ButtonGroup onChange={onChange} type="grid">
      <Button ariaLabel="female">female</Button>
      <Button ariaLabel="male">male</Button>
    </ButtonGroup>
  </div>
)

export default Genders
