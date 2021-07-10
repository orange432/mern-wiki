import React from 'react'

const Editor = () => {
    const [slug,setSlug] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    return (
        <div className="editor">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <label className="label">Slug</label>
                        <input className="input" type="text" />
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        </div>
    )
}

export default Editor
