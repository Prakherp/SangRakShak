import React from 'react';

function formatResponse(response) {
    const sections = response.split(/(\\|\*)/);
    const formattedResponse = sections.map((section, index) => {
        if (section === '**') {
            return null; 
        } else if (section.startsWith('*') && section.endsWith('*')) {
            const boldText = section.slice(2, -2);
            return <b key={index}>{boldText}</b>;
        } else if (section === '*') {
            return <br key={index} />;
        } else if (section.trim() !== '') {
            if (section.startsWith('Sangrakshak :')) {
                const [prefix, ...rest] = section.split(':');
                return (
                    <p key={index}>
                        <b>{prefix}:</b>
                        {rest.join(':')}
                    </p>
                );
            }
            return <p key={index}>{section.trim()}</p>;
        } else {
            return null;
        }
    });

    return formattedResponse;
}

export default formatResponse;
