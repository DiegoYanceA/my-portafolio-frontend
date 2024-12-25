import { describe, expect, it } from 'vitest'
import ContactComponent from './ContactComponent'
import { render } from '@testing-library/react';


describe('<ContactComponent />', () => {
    
    it('Close Navegator', () => {
        const user = {
            title: "-",
            linkedin: "linkedin",
            github: "-",
            email: "diego.yance.arqque@gmail.com"
        };

        const trans = {
            text: "",
            description: "",
            snackbard: {
                copy:""
            }
        }

        render(<ContactComponent
                user={user}
                trans={trans}
            />);
        
        const link1 = document.querySelector('a[href="mailto:diego.yance.arqque@gmail.com"]');
        const validate = link1 != null;
        expect(validate).toBe(true);
    })
})