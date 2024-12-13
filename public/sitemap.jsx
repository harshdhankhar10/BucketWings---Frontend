import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sitemap = () => {
  const [sitemapData, setSitemapData] = useState([]);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/sitemap.xml`, {
          headers: { 'Content-Type': 'application/xml' },
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');
        const urlElements = xmlDoc.getElementsByTagName('url');

        const data = Array.from(urlElements).map((urlElement) => ({
          loc: urlElement.getElementsByTagName('loc')[0]?.textContent || '',
          lastmod: urlElement.getElementsByTagName('lastmod')[0]?.textContent || '',
          changefreq: urlElement.getElementsByTagName('changefreq')[0]?.textContent || '',
          priority: urlElement.getElementsByTagName('priority')[0]?.textContent || '',
        }));

        setSitemapData(data);
      } catch (error) {
        console.error('Error fetching sitemap', error);
      }
    };

    fetchSitemap();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
       <div className="bg-white shadow rounded-lg p-4 max-w-4xl mx-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2 text-left">URL</th>
              <th className="border border-gray-300 p-2 text-left">changefreq</th>
              <th className="border border-gray-300 p-2 text-left">priority</th>
            </tr>
          </thead>
          <tbody>
            {sitemapData.length > 0 ? (
              sitemapData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-blue-500">
                    <a href={data.loc} target="_blank" rel="noopener noreferrer">
                      {data.loc}
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">{data.changefreq || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{data.priority || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-4 text-center">
                  Loading sitemap data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </urlset>
    </div>
  );
};

export default Sitemap;
