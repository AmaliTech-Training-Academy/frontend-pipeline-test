import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "@/lib/env";
import { RolesEmun } from "../enums/roles";
import { SuccessTypes } from "../types/response";

const API_URL = API_BASE_URL;
export const handlers = [
  http.get(`${API_URL}/costs/summary-metrics?asOfDate=2025-07-23`, async () => {
    return HttpResponse.json(
      {
        status: SuccessTypes.Success,
        message: "cost metrics retrieved",
        data: {
          metrics: [
            {
              title: "Total Spend",
              value: "$1,637,425.9",
              trend: { value: "+2%", isPositive: true },
            },
            {
              title: "Monthly Projection",
              value: "$272,904.317",
              trend: { value: "-5%", isPositive: false },
            },
            {
              title: "Potential Savings",
              value: "$14,840",
              trend: { value: "+3%", isPositive: true },
            },
            {
              title: "Active Alerts",
              value: "6",
              trend: { value: "+2%", isPositive: true },
            },
            {
              title: "Total Resources",
              value: "31,596",
              trend: { value: "+2%", isPositive: true },
            },
            {
              title: "Active Regions",
              value: "10",
              trend: { value: "+3%", isPositive: true },
            },
            {
              title: "AWS Accounts",
              value: "8",
              trend: { value: "+2%", isPositive: true },
            },
            {
              title: "Efficiency Score",
              value: "78%",
              trend: { value: "-3%", isPositive: false },
            },
          ],
        },
      },
      { status: 200 }
    );
  }),
  http.get(`${API_URL}/costs/daily-region-costs`, async () => {
    return HttpResponse.json(
      {
        status: SuccessTypes.Success,
        message: `costs by regions retrieved`,
        data: {
          regions: [
            { region: "ap-south-1", totalCost: 135000 },
            { region: "ap-southeast-1", totalCost: 170000 },
            { region: "eu-central-1", totalCost: 75000 },
            { region: "sa-east-1", totalCost: 65000 },
            { region: "euu-west-1", totalCost: 110000 },
          ],
        },
      },
      { status: 200 }
    );
  }),
  http.get(`${API_URL}/costs/top-services`, async () => {
    return HttpResponse.json(
      {
        status: SuccessTypes.Success,
        message: `resources retrieved`,
        data: {
          topFiveServicesReport: {
            grandTotal: 586664.66,
            services: [
              { service: "EC2", totalCost: 292988.35 },
              { service: "RDS", totalCost: 155263 },
              { service: "Lambda", totalCost: 29186.62 },
              { service: "DynamoDB", totalCost: 6409.28 },
              { service: "ElastiCache", totalCost: 102817.41 },
            ],
          },
        },
      },
      { status: 200 }
    );
  }),
  http.get(`${API_URL}/costs/cost-trend`, async () => {
    return HttpResponse.json(
      {
        status: SuccessTypes.Success,
        message: "cost trend data retrieved",
        data: {
          costTrend: [
            { date: "2025-07-23", totalCost: 12000 },
            { date: "2025-07-28", totalCost: 9000 },
            { date: "2025-08-02", totalCost: 11000 },
            { date: "2025-08-07", totalCost: 14000 },
            { date: "2025-08-12", totalCost: 13000 },
            { date: "2025-08-18", totalCost: 10000 },
            { date: "2025-08-20", totalCost: 7000 },
          ],
        },
      },
      { status: 200 }
    );
  }),
  http.get(
    `${API_URL}/costs/daily-environment-costs?date=2025-09-08`,
    async () => {
      return HttpResponse.json({
        status: SuccessTypes.Success,
        message: "cost by environment data retrieved",
        data: [
          {
            date: "2025-09-08",
            environments: [
              {
                environment: "Development",
                totalCost: 285219.98,
                percentage: 17.1,
              },
              {
                environment: "Testing",
                totalCost: 280500.83,
                percentage: 16.9,
              },
              {
                environment: "Production",
                totalCost: 278638.66,
                percentage: 16.7,
              },
              {
                environment: "Demo",
                totalCost: 276334.21,
                percentage: 16.6,
              },
              {
                environment: "Staging",
                totalCost: 272460.14,
                percentage: 16.4,
              },
              {
                environment: "QA",
                totalCost: 270814.99,
                percentage: 16.3,
              },
            ],
          },
        ],
      });
    }
  ),
  http.get(`${API_URL}/costs/anomalies`, async () => {
    return HttpResponse.json(
      {
        status: SuccessTypes.Success,
        message: "cost anomalies retrieved",
        data: {
          items: [
            {
              id: "1",
              service: "EC2",
              account: "123456789",
              impact: "High",
              change: "50%",
              cost: 100,
              detected: "2025-07-23",
              status: "Investigating",
            },
            {
              id: "2",
              service: "EC2",
              account: "123456789",
              impact: "Low",
              change: "50%",
              cost: 100,
              detected: "2025-07-23",
              status: "Resolved",
            },
            {
              id: "3",
              service: "EC2",
              account: "123456789",
              impact: "Low",
              change: "50%",
              cost: 100,
              detected: "2025-07-23",
              status: "Resolved",
            },
          ],
          pagination: {
            page: 0,
            size: 3,
            totalElements: 9,
            totalPages: 3,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      { status: 200 }
    );
  }),
  http.get(`${API_URL}/uers/me`, async () => {
    return HttpResponse.json({
      success: true,
      message: "User details fetched successfully",
      data: {
        user: {
          id: "1",
          username: "Patrick",
          fullName: "Patrick Smith",
          email: "patrick@gmail.com",
          role: RolesEmun.FinanceManager,
          profilePicture: null,
        },
      },
    });
  }),
];
