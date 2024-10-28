import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CampusConnectAppBar from "../components/appbar/CampusConnectAppBar.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CampusConnectAppBar">
                <CampusConnectAppBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews