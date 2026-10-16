# SnapShare: System Design & Scaling Plan

## 1. Assumptions & Daily Active Users (DAU)
*   **Total Registered Users:** 10,000,000
*   **Active Users:** 10% of total
*   **Daily Active Users (DAU):** 1,000,000 users

## 2. Capacity Estimations
*(Assuming 86,400 seconds in a day. Peak traffic is calculated as 5× the average.)*

*   **Uploads:**
    *   Total per day: 1,000,000 photos (1 per DAU)
    *   Average uploads per second: ~12 uploads/sec (1M / 86.4k)
    *   Peak uploads per second: ~60 uploads/sec (12 * 5)
*   **Feed Views:**
    *   Total per day: 50,000,000 views (50 per DAU)
    *   Average views per second: ~580 views/sec (50M / 86.4k)
    *   Peak views per second: ~2,900 views/sec (580 * 5)
*   **Storage (per year):**
    *   Storage per photo: 2 MB (original) + 50 KB (thumbnail) = 2.05 MB
    *   Storage per day: 1,000,000 * 2.05 MB = 2.05 TB / day
    *   Storage per year: 2.05 TB * 365 = **~748 TB / year**

## 3. Read-Heavy vs Write-Heavy
SnapShare is a **read-heavy** system. The ratio of reading to writing is roughly 50:1 (50 feed views for every 1 photo upload). This means our design must prioritize fast data retrieval by relying heavily on caching, Content Delivery Networks (CDNs), and database read-replicas so the system doesn't crash when users aggressively scroll their feeds.

## 4. Storing the Photos
Photos **should not** be stored in the database. Databases are optimized for structured data and fast searching, not for holding massive binary files (BLOBs). Storing 748 TB of images in a database would make it incredibly slow, expensive, and difficult to back up. 
Instead, photos should be stored in **Object Storage** (like Amazon S3), while the database only saves a small text link (URL) pointing to where the image file lives in the object storage.

## 5. Architecture Diagram
```text
       [ Users ]
           |
       (DNS / CDN) -----> [ CDN ] (Serves cached photos & thumbnails)
           |
           v
    [ Load Balancer ]
           |
    +------+------+
    |             |
[ App Srv ]   [ App Srv ]  <---> [ Cache (Redis) ] (Caches feed data)
    |             |
    +------+------+
           |
    +------+------------------------------------------+
    |                                                 |
[ Main DB ] (Writes) ---> [ Read Replica DB ]      [ Object Storage ] (Photos)
    |                                                 ^
    v                                                 |
[ Message Queue ]                                     |
    |                                                 |
    v                                                 |
[ Worker (Thumbnail Generator) ] ---------------------+