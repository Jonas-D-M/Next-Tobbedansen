import TextInput from '@/components/inputs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Inschrijvingen`,
};

const formItems = [
  {
    type: 'text',
    name: 'entry.1590447953',
    placeholder: 'Voornaam',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.609469685',
    placeholder: 'Naam',
    required: true,
  },
  {
    type: 'email',
    name: 'entry.1256978498',
    placeholder: 'E-mail',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.1052038244',
    placeholder: 'Gemeente',
    required: true,
  },
  {
    type: 'number',
    name: 'entry.1647528450',
    placeholder: 'Postcode',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.1364363486',
    placeholder: 'Straat & nr',
    required: true,
  },
  {
    type: 'number',
    name: 'entry.1319474406',
    placeholder: 'Telefoonnummer',
    maxLength: 10,
    required: true,
  },
  {
    type: 'date',
    name: 'entry.438875400',
    placeholder: 'Geboortedatum',
    required: true,
    readOnly: true,
  },
  {
    type: 'text',
    name: 'entry.1621228601',
    placeholder: 'Geboorteplaats',
    required: true,
  },
];

const Page = () => {
  // const [entryCount, setEntryCount] = useState(1);
  return (
    <section className='o-row o-row--xl'>
      <div className='o-container u-max-width-xl'>
        <article className='o-section o-section--xl'>
          <div className='o-layout'>
            <div className='o-layout__item u-1-of-2-bp3'>
              <h2 className='c-lead c-lead--head'>Inschrijvingen</h2>
            </div>
            <div className='o-layout__item u-1-of-2-bp3'>
              <form
                action='https://docs.google.com/forms/d/e/1FAIpQLSfTsfhlNtihs1ksb4VaKDfJrW3sC6coOjpmbv6nJb6dnIKXmA/formResponse'
                method='POST'>
                <legend>Deelnemer 1</legend>
                {formItems.map((props, index) => {
                  return <TextInput key={`entry-1-${index}`} {...props} />;
                })}

                <div id='extra'></div>
                <button type='button' id='btnAdd'>
                  Deelnemer toevoegen
                </button>
                <button type='button' id='btnRemove'>
                  Deelnemer verwijderen
                </button>
                <legend>Tobbe info</legend>
                <input
                  type='text'
                  className='textbox-300'
                  name='entry.1437388782'
                  placeholder='Naam tobbe'
                  required
                />
                <input
                  type='text'
                  className='textbox-300'
                  name='entry.1534265697'
                  placeholder='Vereniging (optioneel)'
                />

                <textarea
                  className='textbox-300'
                  name='entry.1076910900'
                  cols={30}
                  rows={10}
                  placeholder='Muziek aanvraag (optioneel)'></textarea>
                <input type='checkbox' id='reglement' required />
                <label
                  className='c-lead c-lead-sm checkbox-full'
                  htmlFor='reglement'>
                  Ik heb
                  <u>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href='assets/Reglement.pdf'>
                      het reglement
                    </a>
                  </u>
                  gelezen en ga hier mee akkoord bij inschrijving.
                </label>
                <br />
                <button type='submit' id='btnInschrijven'>
                  Schrijf me in
                </button>
              </form>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Page;
