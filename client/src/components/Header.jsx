import React from 'react'

const Header = () => {
    return (
        <div>
            <h1 className="text-blue-400">Restaurant finder</h1>
            <table className="table-fixed bg-red-700">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Views</th>
                    </tr>
                </thead>
                <tbody className="bg-yellow-400">
                    <tr>
                    <td>Intro to CSS</td>
                    <td>Adam</td>
                    <td>858</td>
                    </tr>
                    <tr >
                    <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                    <td>Adam</td>
                    <td>112</td>
                    </tr>
                    <tr>
                    <td>Intro to JavaScript</td>
                    <td>Chris</td>
                    <td>1,280</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Header
