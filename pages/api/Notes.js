const Notes = 
[
        {
            "Id": "1",
            "Type": "text",
            "className": "aqua",
            "Top": 0,
            "Left": 0,
            "PosX": 0,
            "PosY": 0,
            "TextContent": "Test 1"
        },
        {
            "Id": "2",
            "Type": "text",
            "className": "yellow",
            "Top": 0,
            "Left": 210,
            "PosX": 0,
            "PosY": 0,
            "TextContent": "Test 2"
        },
]

export default function handler(req, res) {
    res.status(200).json(Notes);
}
