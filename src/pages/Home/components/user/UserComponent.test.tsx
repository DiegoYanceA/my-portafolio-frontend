import { describe, expect, it } from 'vitest'
import UserComponent from './UserComponent'
import { render } from '@testing-library/react';
import { UserLiteral } from '../../../../types';


describe('<UserComponent />', () => {

    it('Get hackaton pdf', () => {


        const user: UserLiteral = {
            text: "",
            description: "",
            hackaton: "./pdf/hackathon-diego.pdf",
            bachelor: ""
        }

        render(<UserComponent
            trans={user}
        />);

        const link1 = document.querySelector('a[href="./pdf/hackathon-diego.pdf"]');
        const validate = link1 != null;
        expect(validate).toBe(true);
    })
})