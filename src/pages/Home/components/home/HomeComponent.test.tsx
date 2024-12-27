import { describe, expect, it } from 'vitest'
import HomeComponent from './HomeComponent'
import { render } from '@testing-library/react';


describe('<HomeComponent />', () => {
    
    it('Go to Linkedin', () => {
        const user = {
            title: "-",
            linkedin: "https://www.linkedin.com/in/diegoyance",
            github: "-",
            email: "-"
        };

        const trans = {
            text: "",
            description: "",
            snackbard: {
                copy:""
            }
        }

        render(<HomeComponent
                user={user}
                trans={trans}
            />);
        
        const link1 = document.querySelector('a[href="https://www.linkedin.com/in/diegoyance"]');
        const validate = link1 != null;
        expect(validate).toBe(true);
    })
})