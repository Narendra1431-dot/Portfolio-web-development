<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Messages - Admin Panel</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            padding: 2rem;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            color: #2c3e50;
            margin-bottom: 2rem;
        }

        .table-wrapper {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background-color: #3498db;
            color: white;
        }

        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #ecf0f1;
        }

        tr:hover {
            background-color: #f8f9fa;
        }

        .message-preview {
            max-width: 300px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: bold;
        }

        .status.new {
            background-color: #d4edda;
            color: #155724;
        }

        .status.read {
            background-color: #d1ecf1;
            color: #0c5460;
        }

        .status.archived {
            background-color: #e2e3e5;
            color: #383d41;
        }

        .timestamp {
            color: #95a5a6;
            font-size: 0.9rem;
        }

        .no-data {
            text-align: center;
            padding: 2rem;
            color: #95a5a6;
        }

        .info-box {
            background-color: #e7f3ff;
            border-left: 4px solid #3498db;
            padding: 1rem;
            margin-bottom: 2rem;
            border-radius: 4px;
        }

        .info-box p {
            color: #0c5460;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📨 Contact Messages</h1>
        
        <div class="info-box">
            <p><strong>Note:</strong> This is a simple admin view. In production, add authentication before accessing this page.</p>
        </div>

        <div class="table-wrapper">
            <?php
            // Include config
            require_once 'php/config.php';

            // Fetch all contacts
            $sql = "SELECT id, name, email, phone, subject, message, status, created_at FROM contacts ORDER BY created_at DESC";
            $result = $conn->query($sql);

            if (!$result) {
                echo "<p class='no-data'>Error retrieving messages: " . $conn->error . "</p>";
                exit;
            }

            if ($result->num_rows > 0) {
                echo "<table>";
                echo "<thead>";
                echo "<tr>";
                echo "<th>Name</th>";
                echo "<th>Email</th>";
                echo "<th>Subject</th>";
                echo "<th>Message</th>";
                echo "<th>Phone</th>";
                echo "<th>Status</th>";
                echo "<th>Received</th>";
                echo "</tr>";
                echo "</thead>";
                echo "<tbody>";

                while ($row = $result->fetch_assoc()) {
                    $status = strtolower($row['status']);
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                    echo "<td><a href='mailto:" . htmlspecialchars($row['email']) . "'>" . htmlspecialchars($row['email']) . "</a></td>";
                    echo "<td>" . htmlspecialchars($row['subject']) . "</td>";
                    echo "<td><div class='message-preview' title='" . htmlspecialchars($row['message']) . "'>" . htmlspecialchars($row['message']) . "</div></td>";
                    echo "<td>" . htmlspecialchars($row['phone'] ?? 'N/A') . "</td>";
                    echo "<td><span class='status " . $status . "'>" . ucfirst($status) . "</span></td>";
                    echo "<td><span class='timestamp'>" . date('M d, Y H:i', strtotime($row['created_at'])) . "</span></td>";
                    echo "</tr>";
                }

                echo "</tbody>";
                echo "</table>";
            } else {
                echo "<p class='no-data'>No contact messages yet.</p>";
            }

            $conn->close();
            ?>
        </div>
    </div>
</body>
</html>
