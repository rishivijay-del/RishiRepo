import { LightningElement, track } from 'lwc';

export default class SharePointUploader extends LightningElement {
    @track fileName = '';
    @track file;
    @track statusMessage = '';
    @track uploading = false;

    // 🔴 Replace these with your real values
    ACCESS_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlB6U3QxN0d6Y2VkcUpBRXEwOG1nano1TXV6RVZNYWU4bVcwMGxZcFI5MlEiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDNhMTBhNi01ZDdlLTQ0OTEtOWUyOC0wMTkxODQzODhlZWMvIiwiaWF0IjoxNzU1NzkzNzk2LCJuYmYiOjE3NTU3OTM3OTYsImV4cCI6MTc1NTc5NzY5NiwiYWlvIjoiazJSZ1lEQzgrKzkxd0k5RkZ5ZHUzTGdwZEpuVlR3QT0iLCJhcHBfZGlzcGxheW5hbWUiOiJJTk5fSU5OX0VuZ2dfU2FsZXNmb3JjZVNoYXJlcG9pbnRfMDgwNzIwMjUiLCJhcHBpZCI6IjUwODgwYzY1LTVmMWQtNDNlZi1hZjJjLTAyODJiNzk1Y2IyMyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ0M2ExMGE2LTVkN2UtNDQ5MS05ZTI4LTAxOTE4NDM4OGVlYy8iLCJpZHR5cCI6ImFwcCIsIm9pZCI6IjNkYTY0Njg2LWRmOTktNGQ1My05NTYxLTEyY2M1ZTRiMDJkYyIsInJoIjoiMS5BU3NBcGhBNlJINWRrVVNlS0FHUmhEaU83QU1BQUFBQUFBQUF3QUFBQUFBQUFBRENBQUFyQUEuIiwicm9sZXMiOlsiU2l0ZXMuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiIzZGE2NDY4Ni1kZjk5LTRkNTMtOTU2MS0xMmNjNWU0YjAyZGMiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiI0NDNhMTBhNi01ZDdlLTQ0OTEtOWUyOC0wMTkxODQzODhlZWMiLCJ1dGkiOiJxQnU5ZVZ1OVpFaWFaYkdRNE53QUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX2Z0ZCI6IlJvU1B2RDZ2T2hkd28wQXR5aFZIcEJCXy1GeXIwVEJNUE50Z1JKZDZfZmdCYW1Gd1lXNWxZWE4wTFdSemJYTSIsInhtc19pZHJlbCI6IjcgMzAiLCJ4bXNfcmQiOiIwLjQyTGxZQkppMUJZUzRXQVhFb2hpand6Tm1IN052VTFxNV85dVZ1N1ZRRkZPSVFHeE1feU5feXZpSGFkZHZ4bFd0SzRsQnlqS0lTVEF6QUFCQjZBMEFBIiwieG1zX3RjZHQiOjE3MDY2MTg1ODZ9.LYevHXtT_-WTyMk-OWr7bg8RqmJ7lOcHggRkiNTQk_AwK6y6YyleCfe7D3OMYe5qUk8zhhaNVCyyghOoKXbiiLnaSM0LB1Jzp17-NvXf-boykf4ZJrK6lDk8oIL4NtfamFn9nb1KBFG0HsRU5YtD-RuC2B0WUsoe4gUOf9Dl8GJjH42LwGTp_tbSFiwLmcXZzJ-y-O9ZnqaUdifCWYU3UPuLqwGtp6Fb4zGfnX4zYmNlIZUSJTf72DHI_fB-kWWeUVe9aNHLehV3_bUZ8DXYSSqR3C9nrD7TfdqgIawOIVf10iYVzaqcRI5q3SRBsQ4Hro5ZNhYvg31_HDpvxfuyEg';
    SITE_ID = '42a9d91e-6a65-4f33-8ea4-9ef47f3d2543,1a6db602-d924-4a72-89fa-acfc0c4b75ed';
    DRIVE_ID = 'b!HtmpQmVqM0-OpJ70fz0lQwK2bRok2XJKifqs_AxLde37X4xolijnQb0_3DtQaNm9';

    handleFileChange(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            this.fileName = this.file.name;
        }
    }

    async handleUpload() {
        if (!this.file) {
            this.statusMessage = 'Please choose a file first.';
            return;
        }

        this.uploading = true;
        this.statusMessage = 'Creating upload session...';

        try {
            // 1️⃣ Create upload session
            const sessionUrl = `https://graph.microsoft.com/v1.0/sites/${this.SITE_ID}/drives/${this.DRIVE_ID}/root:/${this.fileName}:/createUploadSession`;

            const sessionResponse = await fetch(sessionUrl, {
    method: 'POST',
    headers: {
        'Authorization': this.ACCESS_TOKEN,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        item: {
            "@microsoft.graph.conflictBehavior": "replace",
            "name": this.fileName
        }
    })
});

            if (!sessionResponse.ok) {
                throw new Error(`Failed to create upload session: ${sessionResponse.statusText}`);
            }

            const sessionData = await sessionResponse.json();
            const uploadUrl = sessionData.uploadUrl;

            // 2️⃣ Upload file in chunks
            const chunkSize = 3276800; // 3.2 MB per chunk (safe size)
            let start = 0;
            let end = chunkSize;
            const fileSize = this.file.size;

            while (start < fileSize) {
                const blob = this.file.slice(start, end);
                const chunkResponse = await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: {
                        'Authorization': this.ACCESS_TOKEN,
                        'Content-Range': `bytes ${start}-${end - 1}/${fileSize}`
                    },
                    body: blob
                });

                if (!chunkResponse.ok && chunkResponse.status !== 201 && chunkResponse.status !== 200) {
                    throw new Error(`Chunk upload failed: ${chunkResponse.statusText}`);
                }

                start = end;
                end = start + chunkSize;
                if (end > fileSize) {
                    end = fileSize;
                }

                this.statusMessage = `Uploaded ${Math.min(start, fileSize)} of ${fileSize} bytes...`;
            }

            this.statusMessage = '✅ File uploaded successfully!';
        } catch (error) {
            this.statusMessage = `❌ Error: ${error.message}`;
            console.error(error);
        } finally {
            this.uploading = false;
        }
    }
}