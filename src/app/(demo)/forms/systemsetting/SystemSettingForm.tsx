"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {  Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react'

export function SystemSettingForm() {

    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        smtpUrl: '',
        smtpPort: '',
        smtpId: '',
        smtpPassword: '',
    });

    useEffect(() => {
        // 서버 조회 후 샛팅
        setFormData({
            smtpUrl: '192.123.123.123',
            smtpPort: '123',
            smtpId: 'test',
            smtpPassword: 'test',
        })   
    }, []);

    // 입력 필드 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast({
            variant: "destructive",
            title: "SystemSettingForm 입력값.",
            description: JSON.stringify(formData),
        });


        // try {
        //     // POST 요청 보내기
        //     const response = await fetch('/api/submitForm', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });

        //     if (response.ok) {
        //         const result = await response.json();
        //         alert(result.message); // 성공 메시지 표시
        //         console.log('Server response:', result);
        //     } else {
        //         throw new Error('Form submission failed');
        //     }
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        //     alert('Form submission failed. Please try again.');
        // }
    };


    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>SMTP 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-4 p-4 rounded-lg">
                    <Label htmlFor="smtpUrl" className="w-20 text-right">
                        SMTP URL :
                    </Label>
                    <Input
                        id="smtpUrl"
                        placeholder="smtp 주소를 입력하세요"
                        value={formData.smtpUrl}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="smtpPort" className="w-20 text-right">
                        SMTP Port :
                    </Label>
                    <Input
                        id="smtpPort"
                        placeholder="성을 입력하세요"
                        value={formData.smtpPort}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="smtpId" className="w-20 text-right">
                        SMTP ID :
                    </Label>
                    <Input
                        id="smtpId"
                        placeholder="SMTP ID를 입력하세요"
                        value={formData.smtpId}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                {/* 전화번호 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="smtpPassword" className="w-20 text-right">
                        전화번호:
                    </Label>
                    <Input
                        id="smtpPassword"
                        placeholder="SMTP 비밀번호를 입력하세요"
                        value={formData.smtpPassword}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>저장</Button>
            </CardFooter>
        </Card>
    );
}
